"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    const str = sessionStorage.getItem("testResult");
    if (!str) {
      router.push("/");
      return;
    }
    setHasResult(true);
  }, [router]);

  if (!hasResult) {
    return (
      <div className="page" style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="header">
        <div className="header__logo">Delightful Experiences</div>
      </div>

      <div style={{ textAlign: "center", margin: "40px 0 20px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          테스트 완료!
        </h1>
        <p style={{ fontSize: 15, color: "var(--gray-500)" }}>
          수고하셨습니다
        </p>
      </div>

      <div
        className="card card--elevated"
        style={{ textAlign: "center", padding: "32px 24px" }}
      >
        <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}>
          테스트 결과가 <strong>즐거움의힘</strong>에 자동으로 전달되었습니다.
        </p>
        <p style={{ fontSize: 13, color: "var(--gray-500)" }}>
          방문 상담 시 결과를 바탕으로 맞춤 학습 안내를 드리겠습니다.
          <br />
          감사합니다!
        </p>
      </div>

      <div className="mt-16">
        <button
          className="btn btn--outline"
          style={{ width: "100%" }}
          onClick={() => {
            sessionStorage.clear();
            router.push("/");
          }}
        >
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}
