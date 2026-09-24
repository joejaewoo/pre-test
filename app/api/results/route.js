import { kv } from "@vercel/kv";

export async function GET() {
  try {
    // KV에서 전체 결과 가져오기 (최신순)
    const raw = await kv.lrange("results", 0, -1);

    const results = raw.map((item) => {
      if (typeof item === "string") {
        try { return JSON.parse(item); } catch { return item; }
      }
      return item;
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

// 캐시 안 함 (항상 최신 데이터)
export const dynamic = "force-dynamic";
