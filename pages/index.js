import Head from 'next/head';
import Bubble from '../components/Bubble';

export default function Home({ coins }) {
  return (
    <>
      <Head>
        <title>TrashBubbles</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
        <h1 className="text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
          🚀 TrashBubbles
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {coins.map((coin, index) => (
            <Bubble key={index} coin={coin} />
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('https://api.dexscreener.com/latest/dex/pairs');
    const data = await res.json();
    const topCoins = data.pairs
      .filter(p => p.baseToken?.symbol && p.priceChange && p.volume?.h24)
      .sort((a, b) => b.volume.h24 - a.volume.h24)
      .slice(0, 30);
    return { props: { coins: topCoins } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { coins: [] } };
  }
}