// Transactional billing email via Resend.
//
// Email is the primary reminder channel, not web push. Push only reaches users
// who granted notification permission on an installed PWA, which is a minority
// for a billing audience -- and "runs without owner intervention" only holds if
// customers actually see the reminder.
//
// Optional: with RESEND_API_KEY unset, sends are skipped and logged rather than
// throwing, so a missing key never breaks a payment webhook.

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const FROM = Deno.env.get("BILLING_EMAIL_FROM") || "Physiome <billing@physiome.app>";

export const mailerConfigured = Boolean(RESEND_API_KEY);

export type Email = { subject: string; html: string; text: string };

export async function sendBillingEmail(to: string[], email: Email): Promise<boolean> {
  const recipients = to.filter(Boolean);
  if (recipients.length === 0) return false;

  if (!mailerConfigured) {
    console.warn("RESEND_API_KEY not configured; skipping email:", email.subject, recipients);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: recipients,
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
    });

    if (!res.ok) {
      console.error("resend send failed", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (e) {
    console.error("resend send error", e);
    return false;
  }
}

const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

const tanggal = (iso: string) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

function layout(heading: string, bodyHtml: string, cta?: { label: string; url: string }): string {
  return `<!doctype html>
<html lang="id"><body style="margin:0;padding:24px;background:#f6f7f9;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827">
  <table role="presentation" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb">
    <tr><td style="padding:28px">
      <p style="margin:0 0 18px;font-size:18px;font-weight:700;color:#2BB3A3">Physiome</p>
      <h1 style="margin:0 0 14px;font-size:19px;line-height:1.35">${heading}</h1>
      ${bodyHtml}
      ${cta ? `<p style="margin:26px 0 0"><a href="${cta.url}" style="display:inline-block;background:#2BB3A3;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:8px;font-weight:600;font-size:14px">${cta.label}</a></p>` : ""}
      <p style="margin:26px 0 0;font-size:12px;color:#6b7280">Email ini dikirim otomatis oleh sistem langganan Physiome.</p>
    </td></tr>
  </table>
</body></html>`;
}

export function receiptEmail(input: {
  name: string | null;
  orderId: string;
  planCode: string;
  grossAmount: number;
  periodEnd: string;
  appBaseUrl: string;
}): Email {
  const sapaan = input.name ? `Halo ${input.name},` : "Halo,";
  const heading = "Pembayaran Anda sudah kami terima";

  const text = [
    sapaan,
    "",
    `Pembayaran sebesar ${rupiah(input.grossAmount)} untuk paket ${input.planCode} telah diterima.`,
    `Langganan Anda aktif sampai ${tanggal(input.periodEnd)}.`,
    "",
    `Nomor pesanan: ${input.orderId}`,
    `Kelola langganan: ${input.appBaseUrl}/billing`,
  ].join("\n");

  const html = layout(
    heading,
    `<p style="margin:0 0 12px;font-size:14px;line-height:1.6">${sapaan}</p>
     <p style="margin:0 0 12px;font-size:14px;line-height:1.6">
       Pembayaran sebesar <strong>${rupiah(input.grossAmount)}</strong> untuk paket
       <strong>${input.planCode}</strong> telah diterima.
     </p>
     <p style="margin:0 0 12px;font-size:14px;line-height:1.6">
       Langganan Anda aktif sampai <strong>${tanggal(input.periodEnd)}</strong>.
     </p>
     <p style="margin:0;font-size:13px;color:#6b7280">Nomor pesanan: ${input.orderId}</p>`,
    { label: "Lihat langganan", url: `${input.appBaseUrl}/billing` },
  );

  return { subject: "Pembayaran Physiome diterima", html, text };
}

/** Rungs of the reminder ladder, in escalation order. */
export type ReminderStage = "h7" | "h3" | "h1" | "expired" | "grace_end";

export function reminderEmail(input: {
  stage: ReminderStage;
  name: string | null;
  planCode: string | null;
  periodEnd: string;
  graceUntil: string;
  daysUntilLockout: number;
  appBaseUrl: string;
}): Email {
  const sapaan = input.name ? `Halo ${input.name},` : "Halo,";
  const renewUrl = input.planCode
    ? `${input.appBaseUrl}/billing/checkout?plan=${encodeURIComponent(input.planCode)}`
    : `${input.appBaseUrl}/pricing`;

  const copy: Record<ReminderStage, { subject: string; heading: string; body: string }> = {
    h7: {
      subject: "Langganan Physiome berakhir dalam 7 hari",
      heading: "Langganan Anda berakhir dalam 7 hari",
      body: `Langganan Physiome Anda berakhir pada ${tanggal(input.periodEnd)}. Perpanjang sekarang agar layanan berjalan tanpa jeda.`,
    },
    h3: {
      subject: "Langganan Physiome berakhir dalam 3 hari",
      heading: "Langganan Anda berakhir dalam 3 hari",
      body: `Langganan Physiome Anda berakhir pada ${tanggal(input.periodEnd)}. Pembayaran QRIS hanya butuh beberapa detik.`,
    },
    h1: {
      subject: "Langganan Physiome berakhir besok",
      heading: "Langganan Anda berakhir besok",
      body: `Langganan Physiome Anda berakhir pada ${tanggal(input.periodEnd)}.`,
    },
    expired: {
      subject: "Langganan Physiome sudah jatuh tempo",
      heading: "Langganan Anda sudah jatuh tempo",
      body: `Kami belum menerima pembayaran Anda. Akun masih berfungsi penuh sampai ${tanggal(input.graceUntil)}, setelah itu beralih ke mode baca-saja. Data Anda tetap aman dan tidak dihapus.`,
    },
    grace_end: {
      subject: "Akun Physiome akan beralih ke mode baca-saja",
      heading: `${input.daysUntilLockout} hari lagi sebelum akun beralih ke mode baca-saja`,
      body: `Mulai ${tanggal(input.graceUntil)}, akun Anda hanya bisa membaca data dan tidak bisa menambah atau mengubah. Perpanjang sekarang untuk membukanya kembali seketika.`,
    },
  };

  const { subject, heading, body } = copy[input.stage];

  const text = [sapaan, "", body, "", `Perpanjang: ${renewUrl}`].join("\n");
  const html = layout(
    heading,
    `<p style="margin:0 0 12px;font-size:14px;line-height:1.6">${sapaan}</p>
     <p style="margin:0;font-size:14px;line-height:1.6">${body}</p>`,
    { label: "Perpanjang sekarang", url: renewUrl },
  );

  return { subject, html, text };
}
