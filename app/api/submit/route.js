import { kv } from "@vercel/kv";

export async function POST(request) {
  try {
    const data = await request.json();

    // ID 생성 (타임스탬프 기반)
    const id = Date.now().toString();
    const entry = {
      id,
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

    // KV에 저장: 리스트 앞에 추가 (최신순)
    await kv.lpush("results", JSON.stringify(entry));

    return Response.json({ success: true });
  } catch (err) {
    console.error("Submit error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
