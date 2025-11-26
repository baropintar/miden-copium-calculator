import crypto from "crypto";

function hashToInt(str, max) {
  const hash = crypto.createHash("sha256").update(str).digest("hex");
  const int = parseInt(hash.slice(0, 8), 16); 
  return int % max;
}

export async function POST(req) {
  try {
    const { handleRaw } = await req.json();
    const handle = handleRaw.replace("@", "").toLowerCase();

    const seed = handle + "_miden_copium";

    const gMidenFreq = hashToInt(seed + "_gmiden", 100);

    const copium = Math.min(100, Math.floor(gMidenFreq * 1.1));

    const ogProb = Math.floor((100 - copium) * 0.7 + hashToInt(seed+"_og", 30));

    const enjoyer = Math.floor((copium + ogProb) / 2);

    const rngBlessingList = [
      "Your zk aura is glowing today.",
      "RNG blesses you with +3 rollup luck.",
      "Proof generation speed +25%.",
      "Copium resistance increased.",
      "You are chosen by the zk gods (temporarily).",
      "Today is not your day. Try again tomorrow.",
      "Your gMiden energy is unstable but promising."
    ];

    const rngBlessing = rngBlessingList[hashToInt(seed+"_rng", rngBlessingList.length)];

    return Response.json({
      handle,
      copium,
      ogProb,
      enjoyer,
      gMidenFreq,
      rngBlessing
    });
  } catch (err) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
