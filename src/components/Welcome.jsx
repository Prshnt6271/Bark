import React, { useEffect, useState } from "react";

const ScrollingHighlight = () => {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const targetDate = new Date("2025-12-31T23:59:59.999");

  const calculateTimeLeft = () => {
    const now = new Date();
    const total = targetDate - now;

    if (total <= 0) {
      return {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    }

    const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000;
    const months = Math.floor(total / millisecondsInMonth);
    const remaining = total % millisecondsInMonth;

    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining / (60 * 60 * 1000)) % 24);
    const minutes = Math.floor((remaining / (60 * 1000)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);
    const milliseconds = Math.floor(remaining % 1000);

    return { months, days, hours, minutes, seconds, milliseconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center font-[Montserrat] flex-col"
      style={{
        backgroundImage: `url("/assets/t3.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center top -500px",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Timer Display shifted upward */}
      <div className="relative z-10 text-white text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] font-extrabold text-center flex flex-wrap justify-center gap-6 px-6 mt-[-60px]">
        {[
          { label: "Months", value: timeLeft.months },
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
          { label: "Milliseconds", value: timeLeft.milliseconds },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-blue-800/90 px-8 py-6 rounded-2xl shadow-2xl text-center min-w-[140px]"
          >
            <div className="text-white">
              {String(item.value).padStart(item.label === "Milliseconds" ? 3 : 2, "0")}
            </div>
            <div className="text-sm md:text-lg mt-1 font-medium opacity-85 tracking-wide">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Right-aligned text below timer */}
      <div className="relative z-10 mt-10 w-full px-6">
        <h2 className="text-white text-right text-xl sm:text-2xl md:text-6xl font-semibold">
          To Exprience Our SaaS Services
        </h2>
      </div>
    </div>
  );
};

export default ScrollingHighlight;
