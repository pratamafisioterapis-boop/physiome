// Web Push delivery, shared by the "api" function (chat notifications) and
// "subscription-cron" (billing reminders).
//
// Lifted verbatim from the chat implementation that used to live inline in
// api/index.ts, so chat behaviour is unchanged.

import webpush from "npm:web-push@3.6.7";
import type { SupabaseClient } from "npm:@supabase/supabase-js@2";

const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY") || "";
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY") || "";
const VAPID_CONTACT_EMAIL = Deno.env.get("VAPID_CONTACT_EMAIL") || "mailto:support@physiome.app";

// Optional: with no keys configured, pushes are skipped silently rather than
// erroring. Chat still works via polling, and billing reminders still go out
// by email.
export const pushConfigured = Boolean(VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY);

if (pushConfigured) {
  webpush.setVapidDetails(VAPID_CONTACT_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

export async function sendWebPush(
  admin: SupabaseClient,
  userIds: string[],
  payload: Record<string, unknown>,
): Promise<void> {
  if (!pushConfigured || userIds.length === 0) return;

  const { data: subs } = await admin.from("push_subscriptions").select("*").in("user_id", userIds);
  if (!subs?.length) return;

  await Promise.all(
    subs.map(async (sub: Record<string, any>) => {
      const subscription = { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } };
      try {
        await webpush.sendNotification(subscription, JSON.stringify(payload));
      } catch (e: any) {
        // 404/410 mean the browser dropped the subscription; prune it so the
        // table does not accumulate dead endpoints.
        if (e?.statusCode === 404 || e?.statusCode === 410) {
          await admin.from("push_subscriptions").delete().eq("id", sub.id);
        } else {
          console.error("push send error", e?.message || e);
        }
      }
    }),
  );
}
