export const dynamic = "force-dynamic";

export async function POST(request) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return Response.json({ success: false, error: "DB가 연결되지 않았습니다." }, { status: 500 });
  }
  try {
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
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["LPUSH", "results", JSON.stringify(entry)]),
      cache: "no-store",
    });
    const json = await res.json();
    if (json.error) {
      return Response.json({ success: false, error: "DB 오류: " + json.error }, { status: 500 });
    }
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
