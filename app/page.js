"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [handle, setHandle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Compiling zkVM...",
    "Generating proof...",
    "Compressing execution trace...",
    "Verifying recursive proof...",
    "Finalizing output hash...",
  ];

  // animasi step berubah otomatis
  useEffect(() => {
    if (!loading) return;
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) =>
        prev + 1 < steps.length ? prev + 1 : prev
      );
    }, 700);

    return () => clearInterval(interval);
  }, [loading]);

  async function calculate() {
    setResult(null);
    setLoading(true);

    const res = await fetch("/api/copium", {
      method: "POST",
      body: JSON.stringify({ handleRaw: handle }),
    });

    const data = await res.json();

    // delay biar animasi keliatan
    setTimeout(() => {
      setResult(data);
      setLoading(false);
    }, 1400);
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative text-white"
      style={{
        backgroundImage: "url('/midenn.jfif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay gelap */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-orange-400 drop-shadow-lg">
          Miden Copium Calculator
        </h1>

        <input
          className="text-black p-3 rounded-lg w-72 shadow-lg outline-none"
          placeholder="@handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />

        <button
          onClick={calculate}
          className="mt-4 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition shadow-orange-900/40 shadow-lg"
        >
          Calculate Copium
        </button>

        {/* 🔥 LOADING ANIMASI ZK-PROOF */}
        {loading && (
          <div
            className="
              mt-8 p-5 rounded-xl w-80 
              bg-black/40 border border-orange-500/30 backdrop-blur-lg 
              shadow-[0_0_15px_rgba(255,140,0,0.4)]
              text-sm font-mono tracking-wide
            "
          >
            <p className="text-orange-300 mb-3">zk-Proof Engine:</p>

            <p className="text-orange-200 animate-pulse">
              {steps[loadingStep]}
            </p>

            {/* dots animasi */}
            <div className="flex gap-1 mt-3">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></span>
              <span
                className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></span>
              <span
                className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></span>
            </div>
          </div>
        )}

        {result && (
          <div
            className="
              mt-8 p-6 rounded-2xl w-80 space-y-2 
              bg-white/10 backdrop-blur-xl shadow-xl border border-white/10
            "
          >
            <p><b>Handle:</b> @{result.handle}</p>
            <p><b>Copium Level:</b> {result.copium}%</p>
            <p><b>OG Probability:</b> {result.ogProb}%</p>
            <p><b>zkVM Enjoyer Rating:</b> {result.enjoyer}%</p>
            <p><b>gMiden Frequency Score:</b> {result.gMidenFreq}</p>
            <p className="pt-2 italic text-orange-300">
              {result.rngBlessing}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
