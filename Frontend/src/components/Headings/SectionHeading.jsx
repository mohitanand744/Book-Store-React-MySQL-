import React from "react";

/**
 * SectionHeading - A modern yet classic heading component for section titles.
 * Features a serif font for a classic feel and gradient lines for a modern touch.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The heading text
 * @param {string} [props.className] - Additional classes for the container
 * @param {string} [props.subtitle] - Optional subtitle below the heading
 */
const SectionHeading = ({ children, className = "", subtitle, align = "center" }) => {
  const isLeft = align === "left";

  return (
    <div className={`relative container w-full flex flex-col ${isLeft ? "items-start" : "items-center justify-center"} py-6 group ${className}`}>
      <div className={`flex items-center w-full ${isLeft ? "" : "px-4"} overflow-hidden`}>
        {/* Left Decorative Line */}
        {!isLeft ? (
          <div className="relative flex-1 h-[1px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tan to-sepia transition-transform duration-700 ease-out group-hover:translate-x-0 -translate-x-full"></div>
            <div className="absolute inset-0 bg-sepia/20"></div>
          </div>
        ) : (
          <div className="w-12 h-[2px] bg-gradient-to-r from-tan to-sepia rounded-full mr-4"></div>
        )}

        {/* Heading Text */}
        <div className={`${isLeft ? "pr-10" : "px-4 md:px-10"} shrink-0`}>
          <h2 className={`relative text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffee via-sepia to-coffee tracking-tight ${isLeft ? "text-left" : "text-center"} leading-tight`}>
            {children}
            {/* Subtle floating dot for a classic touch */}
            <span className={`absolute -top-1 ${isLeft ? "-right-4" : "-right-2 md:-right-4"} w-1.5 h-1.5 bg-tan rounded-full animate-pulse shadow-[0_0_8px_rgba(211,189,157,0.8)]`}></span>
          </h2>
        </div>

        {/* Right Decorative Line */}
        <div className="relative flex-1 h-[1px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-tan to-sepia transition-transform duration-700 ease-out group-hover:translate-x-0 translate-x-full"></div>
          <div className="absolute inset-0 bg-sepia/20"></div>
        </div>
      </div>

      {/* Subtitle / Ornament */}
      {subtitle ? (
        <p className={`mt-1 text-sm md:text-base text-sepia font-light tracking-[0.2em] uppercase italic ${isLeft ? "ml-16" : ""}`}>
          {subtitle}
        </p>
      ) : (
        <div className={`mt-4 flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500 ${isLeft ? "ml-16" : ""}`}>
          <div className="w-8 h-[1px] bg-sepia"></div>
          <div className="w-2 h-2 border border-sepia rotate-45"></div>
          <div className="w-8 h-[1px] bg-sepia"></div>
        </div>
      )}
    </div>
  );
};

export default SectionHeading;


