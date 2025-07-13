import { motion } from 'framer-motion';

export default function Bubble({ coin }) {
  const gain = parseFloat(coin.priceChange.h24 || 0);
  const volume = parseFloat(coin.volume.h24 || 0);
  const bubbleSize = Math.min(200, 60 + Math.log10(volume + 1) * 20);
  const color = gain >= 0 ? 'bg-green-500' : 'bg-red-500';

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full flex flex-col justify-center items-center text-center ${color} text-white shadow-2xl border border-white/10`}
      style={{ width: bubbleSize, height: bubbleSize }}
    >
      <span className="text-sm font-bold">{coin.baseToken.symbol}</span>
      <span className="text-xs">{gain.toFixed(2)}%</span>
      <span className="text-[10px] opacity-75">${Math.round(volume).toLocaleString()}</span>
    </motion.div>
  );
}