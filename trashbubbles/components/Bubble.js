import { motion } from 'framer-motion';

export default function Bubble({ coin }) {
  const gain = parseFloat(coin.priceChange.h24);
  const color = gain >= 0 ? 'bg-green-500' : 'bg-red-500';

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-32 h-32 rounded-full flex flex-col justify-center items-center text-center ${color} text-white shadow-lg`}
    >
      <span className="text-sm font-bold">{coin.baseToken.symbol}</span>
      <span className="text-xs">{gain.toFixed(2)}%</span>
    </motion.div>
  );
}