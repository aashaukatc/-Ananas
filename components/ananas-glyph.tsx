export function AnanasGlyph({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Ananas pineapple bot mark">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 19 15 7m13 11-1-13m9 13 6-12m-1 16 10-8" stroke="#48D17A" strokeWidth="3" />
        <path d="M17 26c0-7 6-11 15-11s15 4 15 11v14c0 10-6 17-15 17S17 50 17 40V26Z" stroke="#FFC857" strokeWidth="2.5" />
        <path d="m21 30 22 18M20 42l17 14M43 30 21 19M44 41 29 56" stroke="#FFC857" strokeWidth="1.5" opacity=".45" />
        <rect x="20" y="31" width="24" height="8" rx="3" stroke="#C8FF3D" strokeWidth="2.5" />
        <path d="M29 35h6" stroke="#C8FF3D" strokeWidth="2" />
      </g>
    </svg>
  );
}
