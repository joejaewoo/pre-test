// 진단용: https://pre-test-rose.vercel.app/api/debug 로 접속하면 DB 상태 확인
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const out = {
    hasUrl: !!url,
    hasToken: !!token,
    urlPreview: url ? url.slice(0, 30) + "..." : null,
  };
  if (!url || !token) return Response.json(out);

  async function redis(...args) {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(args),
      cache: "no-store",
    });
    return { status: res.status, body: await res.text() };
  }

  try {
    out.ping = await redis("PING");
    out.listLength = await redis("LLEN", "results");
  } catch (e) {
    out.error = e.message;
  }
  return Response.json(out);
}
