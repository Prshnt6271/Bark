import React from "react";

const ScrollingHighlight = () => {
  return (
    <div className="relative w-full h-48 bg-herocolor overflow-hidden flex flex-col justify-center items-center gap-4">
      {/* First Line: Right to Left */}
      <div className="w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-right-to-left">
          {Array(10)
            .fill("WELCOME TO THE FUTURE")
            .map((text, index) => (
              <span
                key={index}
                className={`text-2xl font-bold mx-4 ${
                  index === 4 ? "text-yellow-300" : "text-yellow-300 opacity-90"
                }`}
              >
                {text}
              </span>
            ))}
        </div>
      </div>

      {/* Second Line: Left to Right */}
      <div className="w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-left-to-right">
          {Array(10)
            .fill("WELCOME TO THE FUTURE")
            .map((text, index) => (
              <span
                key={index}
                className={`text-2xl font-bold mx-4 ${
                  index === 4 ? "text-yellow-300" : "text-yellow-300 opacity-90"
                }`}
              >
                {text}
              </span>
            ))}
        </div>
      </div>

      {/* Third Line: Right to Left */}
      <div className="w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-right-to-left">
          {Array(10)
            .fill("WELCOME TO THE FUTURE")
            .map((text, index) => (
              <span
                key={index}
                className={`text-2xl font-bold mx-4 ${
                  index === 4 ? "text-yellow-300" : "text-yellow-300 opacity-90"
                }`}
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
