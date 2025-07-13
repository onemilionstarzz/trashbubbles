import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "https://api.dexscreener.com/latest/dex/pairs";

export default function TrashBubbles() {
  const [coins, setCoins] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.pairs && Array.isArray(response.data.pairs)) {
          const topCoins = response.data.pairs
            .filter((coin) => coin.baseToken?.symbol && coin.volume24h)
            .sort((a, b) => b.volume24h - a.volume24h)
            .slice(0, 30);
          setCoins(topCoins);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const getBubbleSize = (volume) => {
    const minSize = 70;
    const maxSize = 200;
    const clamped = Math.min(volume, 1_000_000);
    return minSize + (clamped / 1_000_000) * (maxSize - minSize);
  };

  const getRandomPosition = () => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    return { x, y };
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 overflow-hidden relative"
    >
      <h1 className="text-6xl font-extrabold text-center mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        💩 TrashBubbles
      </h1>
      <div className="absolute inset-0">
        {coins.map((coin) => {
          const { x, y } = getRandomPosition();
          const size = getBubbleSize(coin.volume24h);
          return (
            <motion.div
              key={coin.pairAddress}
              className="absolute rounded-full bg-white/10 text-center shadow-2xl backdrop-blur-md border border-white/20 overflow-hidden hover:scale-110 transition duration-300"
              style={{
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col justify-center items-center w-full h-full px-2">
                <span className="text-sm font-bold truncate">
                  {coin.baseToken.symbol}
                </span>
                <span className="text-xs opacity-60 truncate">
                  {coin.chainId || "-"}
                </span>
                <span className="text-xs mt-1 text-green-400">
                  ${parseFloat(coin.priceUsd || 0).toFixed(4)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}