import React from 'react';

// Physiome brand mark — the real logo, shown as a rounded tile so it reads
// cleanly on both light and dark surfaces. Sourced from the uploaded logo
// (rendered into /icons/icon-192.png), not a redrawn copy.
export const PhysiomeMark = ({ className = 'w-8 h-8' }) => (
  <img
    src="/icons/mark-512.png"
    alt="Physiome"
    className={`${className} object-contain shrink-0`}
  />
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
