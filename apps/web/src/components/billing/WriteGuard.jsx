import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useEntitlement } from '@/hooks/useEntitlement.js';

/**
 * Menonaktifkan aksi tulis saat langganan tidak aktif, dengan penjelasan.
 *
 * Murni lapisan pengalaman. Server tetap membalas 402 apa pun yang terjadi,
 * jadi tombol yang belum dibungkus komponen ini adalah celah UX, bukan celah
 * keamanan — rollout bertahap aman.
 *
 * Dipakai sebagai pembungkus:
 *   <WriteGuard><Button onClick={...}>Tambah Pasien</Button></WriteGuard>
 */
const WriteGuard = ({ children, message }) => {
  const { canWrite } = useEntitlement();

  if (canWrite) return children;

  const label = message || 'Langganan tidak aktif. Perpanjang untuk menambah atau mengubah data.';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Elemen yang dinonaktifkan tidak memancarkan event pointer, jadi
              tooltip perlu pembungkus sendiri agar tetap bisa muncul. */}
          <span className="inline-block cursor-not-allowed">
            <div className="pointer-events-none opacity-50">{children}</div>
          </span>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WriteGuard;
