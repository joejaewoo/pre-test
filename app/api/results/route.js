export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return Response.json({ success: false, error: "DB가 연결되지 않았습니다 (환경변수 없음)." });
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["LRANGE", "results", 0, -1]),
      cache: "no-store",
    });
    const json = await res.json();
    if (json.error) {
      return Response.json({ success: false, error: "DB 오류: " + json.error });
    }
    const results = (json.result || []).map((item) => {
      try { return JSON.parse(item); } catch { return item; }
    });
    return Response.json({ success: true, data: results, count: results.length });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}
