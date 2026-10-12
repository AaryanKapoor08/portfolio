import { cn } from '@/lib/utils';

/**
 * A Fortnite supply drop: blue crate with yellow straps hanging from a
 * balloon. Pure SVG; sways via the .fn-drop animation.
 */
export default function SupplyDrop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 124" aria-hidden className={cn('fn-drop drop-shadow-[0_8px_10px_rgba(4,8,40,0.45)]', className)}>
      <ellipse cx="40" cy="28" rx="24" ry="26" fill="#38c8ff" stroke="#0b1240" strokeWidth="2" />
      <ellipse cx="31" cy="18" rx="7" ry="9" fill="#ffffff" opacity="0.55" />
      <path d="M36 53 L40 58 L44 53 Z" fill="#38c8ff" stroke="#0b1240" strokeWidth="1.5" />
      <path d="M40 58 L18 80 M40 58 L62 80 M40 58 L40 80" stroke="#ffffff" strokeWidth="1.6" opacity="0.9" />
      <rect x="12" y="78" width="56" height="9" rx="2" fill="#4f8dff" stroke="#0b1240" strokeWidth="2" />
      <rect x="15" y="86" width="50" height="34" rx="2" fill="#2459d8" stroke="#0b1240" strokeWidth="2" />
      <rect x="23" y="78" width="6" height="42" fill="#ffe14d" stroke="#0b1240" strokeWidth="1.5" />
      <rect x="51" y="78" width="6" height="42" fill="#ffe14d" stroke="#0b1240" strokeWidth="1.5" />
      <path d="M40 92 L42.6 98 L49 98.4 L44 102.4 L45.8 108.6 L40 105 L34.2 108.6 L36 102.4 L31 98.4 L37.4 98 Z" fill="#ffe14d" stroke="#0b1240" strokeWidth="1.2" />
    </svg>
  );
}
