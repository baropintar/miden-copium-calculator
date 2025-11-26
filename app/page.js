"use client";
import { useState } from "react";

export default function Home() {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 🔒 deterministic hash → hasil stabil per handle
  function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0; // force 32bit
    }
    return Math.abs(h);
  }

  const checkCopium = async () => {
    setLoading(true);
    setResult(null);

    // Fetch avatar
    const cleanHandle = handle.replace("@", "");
    const pfpRes = await fetch(`/api/pfp/${cleanHandle}`);
    const { avatar } = await pfpRes.json();

    // ⭐ Stable score
    const seed = hashString(cleanHandle);
    const random = (n, offset) => (seed + offset) % n;

    const copium = random(100, 1);
    const ogProb = random(80, 2);
    const zkEnjoyer = random(90, 3);
    const rngBless = random(100, 4);

    setResult({
      avatar,
      copium,
      ogProb,
      zkEnjoyer,
      rngBless,
    });

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/midenn.jfif')` }}
    >
      <div className="bg-black/60 text-white p-6 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-orange-500 text-center mb-4">
          Miden Copium Calculator
        </h1>

        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="@yourhandle"
          className="w-full p-3 rounded-xl text-black mb-4"
        />

        <button
          onClick={checkCopium}
          className="w-full p-3 bg-orange-500 rounded-xl font-bold"
        >
          Check Copium
        </button>

        {loading && (
          <div className="mt-6 text-center">
            <div className="animate-pulse text-orange-400 text-lg">
              Verifying zk-proof…
            </div>
            <div className="mt-2 animate-spin text-3xl">◍</div>
          </div>
        )}

        {result && (
          <div className="mt-6 text-center">
            <img
              src={result.avatar}
              alt="PFP"
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-orange-500"
            />

            <div className="space-y-2 text-lg">
              <p>🔥 Copium Level: <b>{result.copium}%</b></p>
              <p>🟧 OG Probability: <b>{result.ogProb}%</b></p>
              <p>⚙️ zkVM Enjoyer Rating: <b>{result.zkEnjoyer}%</b></p>
              <p>🎲 RNG Blessing Today: <b>{result.rngBless}%</b></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
