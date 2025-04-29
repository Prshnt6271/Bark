import React, { useEffect, useState } from "react";
import clsx from "clsx";

const logoPattern = [
  "   WWW   ",
  "  WWWWWW  ",
  " WWWWWWWWW ",
  "WWWWWWWWWWWW",
  "WWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWW",
  "YYYYYYYYYYWWWWWWWWW",
  "YYYYYYYYYYYYWWWWWW",
  "YYYYYYYYYYYYYYWWWW",
  "YYYYYYYYYYYYYYWWW",
  "YYYYYYYYYYYYYYWWW",
  " YYYYYYYYYYYYYYYW",
  "  YYYYYYYYYYYYYY",
  "   YYYYYYYYYYYYYY",
  "    YYYYYYYYYYYYYY",
  "     YYYYYYYYYYYYYY",
  "      YYYYYYYYYYYYYY",
  "       YYYYYYYYYYYYYY",
  "        YYYYYYYYYYYYYY",
  "         YYYYYYYYYYYYYY",
  "          YYYYYYYYYYYYYY",
  "           YYYYYYYYYYYYYY",
];

const getColor = (cell) => {
  if (cell === "W") return "bg-white";
  if (cell === "Y") return "bg-yellow-400";
  return "bg-transparent";
};

const HexagonGrid = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Flatten all hex cells into an array with randomized positions
    const scatter = [];
    logoPattern.forEach((row, rowIndex) => {
      row.split("").forEach((cell, colIndex) => {
        if (cell !== " ") {
          scatter.push({
            rowIndex,
            colIndex,
            cell,
            key: `${rowIndex}-${colIndex}`,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            delay: Math.random() * 1000,
          });
        }
      });
    });

    setParticles(scatter);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2e221b]">
      <div className="relative">
        {particles.map(({ key, rowIndex, colIndex, cell, x, y, delay }) => (
          <div
            key={key}
            className={clsx(
              "absolute w-4 h-4 m-0.5 transition-all duration-700 ease-out",
              getColor(cell)
            )}
            style={{
              top: rowIndex * 18,
              left: colIndex * 18 + (rowIndex % 2 === 0 ? 0 : 9),
              transform: `translate(${x}px, ${y}px)`,
              clipPath:
                "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              animation: `gather 1s ${delay}ms forwards`,
            }}
          />
        ))}
        <style>
          {`
            @keyframes gather {
              to {
                transform: translate(0px, 0px);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default HexagonGrid;
