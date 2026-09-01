import React from 'react';

interface AdSlotProps {
  slotId?: string;
  adClient?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
  label?: string;
}

export function AdSlot({
  slotId = 'test-slot-1234',
  adClient = 'ca-pub-0000000000000000',
  format = 'auto',
  className = '',
  label = 'Anuncio Contextual',
}: AdSlotProps) {
  return (
    <aside
      className={`my-6 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100/60 p-4 text-center transition-all ${className}`}
      aria-label="Publicidad"
    >
      <div className="flex flex-col items-center justify-center py-3 text-slate-400">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          {label} · Publicidad
        </span>
        <p className="mt-1 text-[11px] text-slate-400 font-mono">
          [ Espacio Google AdSense · Slot: {slotId} ]
        </p>
      </div>

      <ins
        className="adsbygoogle hidden"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
