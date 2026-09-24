const UPSTASH_URL = process.env.KV_REST_API_URL;
const UPSTASH_TOKEN = process.env.KV_REST_API_TOKEN;

async function redis(...args) {
  const res = await fetch(`${UPSTASH_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  return res.json();
}

export async function POST(request) {
  try {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
      return Response.json(
        { success: false, error: "DB가 연결되지 않았습니다." },
        { status: 500 }
      );
    }

    const data = await request.json();

    const entry = {
      id: Date.now().toString(),
      timestamp: data.timestamp || new Date().toISOString(),
      studentName: data.studentName || "",
      school: data.school || "",
      grade: data.grade || "",
      parentPhone: data.parentPhone || "",
      set: data.set || "?",
      score: data.score || 0,
      correctCount: data.correctCount || 0,
      totalQuestions: data.totalQuestions || 0,
      accuracy: data.accuracy || 0,
      duration: data.duration || 0,
      startLevel: data.startLevel || 0,
      maxLevel: data.maxLevel || 0,
      finalLevel: data.finalLevel || 0,
    };

    await redis("LPUSH", "results", JSON.stringify(entry));

    return Response.json({ success: true });
  } catch (err) {
    console.error("Submit error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
