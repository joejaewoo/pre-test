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

export async function GET() {
  try {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
      return Response.json(
        { success: false, error: "DB가 연결되지 않았습니다." },
        { status: 500 }
      );
    }

    const res = await redis("LRANGE", "results", 0, -1);
    const raw = res.result || [];

    const results = raw.map((item) => {
      try { return JSON.parse(item); } catch { return item; }
    });

    return Response.json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (err) {
    console.error("Results error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
