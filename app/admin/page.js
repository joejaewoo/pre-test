"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  async function loadResults() {
    setLoading(true);
    setError(null);

    const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!url) {
      setError("Google Script URL이 설정되지 않았습니다.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${url}?action=getResults`);
      const json = await res.json();
      if (json.success) {
        setResults(json.data.reverse()); // 최신순
      } else {
        setError(json.error || "데이터를 불러오지 못했습니다.");
      }
    } catch (e) {
      setError("서버에 연결할 수 없습니다: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResults();
  }, []);

  const filtered =
    filter === "all"
      ? results
      : results.filter((r) => r["Set"] === `Set ${filter}`);

  const setCounts = {
    A: results.filter((r) => r["Set"] === "Set A").length,
    B: results.filter((r) => r["Set"] === "Set B").length,
    C: results.filter((r) => r["Set"] === "Set C").length,
    D: results.filter((r) => r["Set"] === "Set D").length,
  };

  return (
    <div className="page" style={{ maxWidth: 960 }}>
      <div className="header">
        <div className="header__logo">Delightful Experiences</div>
        <h1 className="header__title">관리자 대시보드</h1>
        <p className="header__sub">Pre-Test 결과 조회</p>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {["A", "B", "C", "D"].map((s) => (
          <div
            key={s}
            className="card text-center"
            style={{ padding: 14, cursor: "pointer" }}
            onClick={() => setFilter(filter === s ? "all" : s)}
          >
            <div
              className={`set-tag set-tag--${s.toLowerCase()}`}
              style={{ fontSize: 14, padding: "4px 12px", marginBottom: 6 }}
            >
              Set {s}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{setCounts[s]}</div>
            <div style={{ fontSize: 11, color: "var(--gray-400)" }}>명</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: "auto" }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div className="spinner" />
            <p style={{ marginTop: 8, fontSize: 13, color: "var(--gray-500)" }}>
              불러오는 중...
            </p>
          </div>
        ) : error ? (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "var(--danger)",
              fontSize: 14,
            }}
          >
            {error}
            <br />
            <button
              className="btn btn--sm btn--outline mt-16"
              onClick={loadResults}
            >
              다시 시도
            </button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>이름</th>
                <th>학년</th>
                <th>Set</th>
                <th>점수</th>
                <th>정답</th>
                <th>정확도</th>
                <th>소요시간</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: 40, color: "var(--gray-400)" }}>
                    {filter === "all" ? "아직 결과가 없습니다." : `Set ${filter} 결과가 없습니다.`}
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => {
                  const setLetter = (r["Set"] || "").replace("Set ", "").toLowerCase();
                  const ts = r["타임스탬프"];
                  const date = ts
                    ? new Date(ts).toLocaleDateString("ko-KR", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-";
                  return (
                    <tr key={i}>
                      <td style={{ fontSize: 12, color: "var(--gray-500)" }}>{date}</td>
                      <td style={{ fontWeight: 600 }}>{r["이름"]}</td>
                      <td>{r["학년"]}</td>
                      <td>
                        <span className={`set-tag set-tag--${setLetter}`}>
                          {r["Set"]}
                        </span>
                      </td>
                      <td>{r["점수"]}</td>
                      <td>
                        {r["정답수"]}/{r["총문제"]}
                      </td>
                      <td>{r["정확도(%)"]}%</td>
                      <td style={{ fontSize: 12, color: "var(--gray-500)" }}>
                        {r["소요시간(초)"]}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Refresh & Filter Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
          fontSize: 13,
          color: "var(--gray-400)",
        }}
      >
        <span>
          {filter !== "all" ? (
            <button
              style={{
                background: "none",
                border: "none",
                color: "var(--primary)",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "inherit",
              }}
              onClick={() => setFilter("all")}
            >
              필터 해제
            </button>
          ) : (
            `총 ${results.length}명`
          )}
        </span>
        <button
          className="btn btn--sm btn--outline"
          onClick={loadResults}
          disabled={loading}
        >
          새로고침
        </button>
      </div>
    </div>
  );
}
