import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReferralSection() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="bg-[#221912] text-white p-6 rounded-lg text-center mx-auto">
      <h2 className="text-xl font-bold">
        Refer a Friend & Earn 5,000 Credit towards your next marketing campaign.
      </h2>
      <p className="text-sm mt-2">
        Transform Your Business with Beebark - The Future of Architectural Networking & Marketing!
      </p>

      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-2 w-full">
          <input
            type="email"
            placeholder="Enter email address"
            className="px-4 py-2 w-64 rounded-lg text-gray-800 focus:outline-none"
          />
          <button className="bg-white text-yellow-500 font-semibold px-4 py-2 rounded-lg flex items-center gap-1">
            Invite →
          </button>
        </div>

        <button
          onClick={handleRegisterClick}
          className="mt-3 mr-20 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-all"
        >
          Register Now
        </button>

        <div className="mt-2 mr-20 text-sm text-yellow-400">
          🎉 Offer ends in <span className="font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
}
