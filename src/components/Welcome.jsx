import React from "react";
import "../Style/scrollingHighlight.css";

const ScrollingHighlight = () => {
  const repeatedText = Array(20).fill("WELCOME TO THE FUTURE");

  return (
    <div className="relative w-full h-48 bg-black overflow-hidden flex flex-col justify-center items-center gap-3">
      {/* First Line - Right to Left */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-scroll-rtl whitespace-nowrap">
          {repeatedText.map((text, index) => (
            <span
              key={`rtl-${index}`}
              className="text-2xl font-bold mx-6 text-yellow-300 sparkle"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Second Line - Left to Right */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-scroll-ltr whitespace-nowrap">
          {repeatedText.map((text, index) => (
            <span
              key={`ltr-${index}`}
              className="text-2xl font-bold mx-6 text-yellow-300 sparkle"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Third Line - Right to Left */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-scroll-rtl whitespace-nowrap">
          {repeatedText.map((text, index) => (
            <span
              key={`rtl2-${index}`}
              className="text-2xl font-bold mx-6 text-yellow-300 sparkle"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingHighlight;
