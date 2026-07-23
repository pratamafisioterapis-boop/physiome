import React from 'react';

// Physiome brand mark: teal "P" with a navy vertebral spine.
// Inline SVG so it inherits crispness at any size and needs no network fetch.
export const PhysiomeMark = ({ className = 'w-8 h-8', title = 'Physiome' }) => (
  <svg viewBox="0 0 512 512" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#2BB3A3" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round">
      <path d="M190 118 L190 396" />
      <path d="M190 118 C300 118 360 170 360 240 C360 312 298 350 208 350" />
    </g>
    <g fill="#1E2A44" className="dark:fill-white">
      <circle cx="232" cy="150" r="10" />
      <circle cx="245" cy="188" r="12" />
      <circle cx="257" cy="228" r="14" />
      <circle cx="268" cy="270" r="16" />
    </g>
  </svg>
);

// Full lockup: mark + wordmark. `size` scales both.
const Logo = ({ className = '', showText = true, size = 'md' }) => {
  const markSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <PhysiomeMark className={markSize} />
      {showText && (
        <span className={`font-bold tracking-tight text-foreground ${textSize}`}>Physiome</span>
      )}
    </div>
  );
};

export default Logo;
