import { useState, useEffect } from "react";
import { Card, Checkbox, FormControlLabel } from "@mui/material";
import { Heart, Smile } from "lucide-react";

export default function SixDaysRequest() {
  const [response, setResponse] = useState(null);
  const [checked, setChecked] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, { id: Date.now(), left: Math.random() * 100 }]);
      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 4000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    setPosition({
      top: Math.random() * 100 - 50,
      left: Math.random() * 100 - 50,
    });
  };

  const handleCheck = async (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    const newResponse = isChecked ? "Yes, you adorable fool! ❤️" : null;
    setResponse(newResponse);
    
    await fetch("https://your-backend-url.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: newResponse }),
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-300 to-red-500 relative overflow-hidden p-4 sm:p-8">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-red-600 text-lg sm:text-2xl"
          style={{
            left: `${heart.left}%`,
            bottom: "-20px",
            animation: "floatUp 4s ease-in-out forwards",
          }}
        >
          ❤️
        </div>
      ))}
      <Card 
        sx={{
          padding: 3,
          maxWidth: { xs: "100%", sm: 400, md: 500 },
          textAlign: "center",
          boxShadow: 3,
          borderRadius: 3,
          bgcolor: "white",
          border: "2px solid #F06292",
        }}
      >
        <h2 className="text-lg sm:text-2xl font-semibold mb-4 text-pink-600">Can I get these 6 days of yours? 💖</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">I promise it'll be magical! ✨</p>
        <div className="flex flex-col space-y-4 relative">
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheck} />}
            label={<span className="text-sm sm:text-lg text-pink-500">Yes, you adorable fool! <Smile className="inline" /></span>}
          />
          <FormControlLabel
            className="absolute cursor-pointer"
            style={{ transform: `translate(${position.left}px, ${position.top}px)`, transition: "0.05s ease-out" }}
            onMouseEnter={handleMouseEnter}
            control={<Checkbox />}
            label={<span className="text-sm sm:text-lg text-gray-500">No, but try harder! <Heart className="inline text-red-500" /></span>}
          />
        </div>
        {response && <p className="mt-4 font-medium text-pink-700">Response: {response}</p>}
        <p className="mt-6 text-sm sm:text-base text-gray-600">Either way, you're amazing! 💕</p>
      </Card>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
