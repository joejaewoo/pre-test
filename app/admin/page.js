"use client";

import { useState, useEffect, useCallback } from "react";

const ADMIN_PW = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "7905";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sortBy, setSortBy] = useState("date"); // date, name, score, accuracy

  // 비밀번호 확인
  function handleLogin(e) {
    e.preventDefault();
    if (pw === ADMIN_PW) {
      setAuthed(true);
      setPwError(false);
      sessionStorage.setItem("adminAuth", "true");
    } else {
      setPwError(true);
    }
  }

  // 세션 복원
  useEffect(() => {
    if (sessionStorage.getItem("adminAuth") === "true") {
      setAuthed(true);
    }
  }, []);

  // 데이터 로드 (JSONP 방식 — CORS 문제 우회)
  const loadResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!url) {
      setError("Google Script URL이 설정되지 않았습니다.\nVercel 환경변수에 NEXT_PUBLIC_GOOGLE_SCRIPT_URL을 추가하세요.");
      setLoading(false);
      return;
    }

    try {
      // JSONP로 CORS 우회
      const data = await new Promise((resolve, reject) => {
        const callbackName = "_gsCb" + Date.now();
        const timeout = setTimeout(() => {
          cleanup();
          reject(new Error("응답 시간 초과 (10초)"));
        }, 10000);

        function cleanup() {
          clearTimeout(timeout);
          delete window[callbackName];
          const el = document.getElementById(callbackName);
          if (el) el.remove();
        }

        window[callbackName] = function (response) {
          cleanup();
          resolve(response);
        };

        const script = document.createElement("script");
        script.id = callbackName;
        script.src = `${url}?action=getResults&callback=${callbackName}`;
        script.onerror = () => {
          cleanup();
          reject(new Error("스크립트 로드 실패. Google Script URL을 확인하세요."));
        };
        document.body.appendChild(script);
      });

      if (data.success) {
        setResults(data.data.reverse());
      } else {
        setError(data.error || "데이터를 불러오지 못했습니다.");
      }
    } catch (e) {
      setError("서버에 연결할 수 없습니다: " + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadResults();
  }, [authed, loadResults]);

  // 비밀번호 화면
  if (!authed) {
    return (
      <div className="page" style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--gray-900)" }}>
              관리자 로그인
            </h1>
            <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>
              비밀번호를 입력하세요
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="card card--elevated" style={{ padding: 24 }}>
              <input
                type="password"
                placeholder="비밀번호"
                value={pw}
                onChange={(e) => { setPw(e.target.value); setPwError(false); }}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: `1.5px solid ${pwError ? "var(--danger)" : "var(--gray-200)"}`,
                  borderRadius: 8,
                  fontSize: 15,
                  fontFamily: "inherit",
                  outline: "none",
                  textAlign: "center",
                  letterSpacing: 4,
                }}
                autoFocus
              />
              {pwError && (
                <p style={{ color: "var(--danger)", fontSize: 13, textAlign: "center", marginTop: 8 }}>
                  비밀번호가 올바르지 않습니다
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn--primary"
              style={{ width: "100%", marginTop: 12 }}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 필터링 & 정렬
  let filtered = results;
  if (filter !== "all") {
    filtered = filtered.filter((r) => r["Set"] === `Set ${filter}`);
  }
  if (gradeFilter !== "all") {
    filtered = filtered.filter((r) => r["학년"] === gradeFilter);
  }
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (r) =>
        (r["이름"] || "").toLowerCase().includes(q) ||
        (r["학교"] || "").toLowerCase().includes(q) ||
        (r["학부모연락처"] || "").includes(q)
    );
  }

  // 정렬
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return (a["이름"] || "").localeCompare(b["이름"] || "");
      case "score":
        return (Number(b["점수"]) || 0) - (Number(a["점수"]) || 0);
      case "accuracy":
        return (Number(b["정확도(%)"]) || 0) - (Number(a["정확도(%)"]) || 0);
      default: // date — 이미 최신순
        return 0;
    }
  });

  const setCounts = {
    A: results.filter((r) => r["Set"] === "Set A").length,
    B: results.filter((r) => r["Set"] === "Set B").length,
    C: results.filter((r) => r["Set"] === "Set C").length,
    D: results.filter((r) => r["Set"] === "Set D").length,
  };

  const grades = [...new Set(results.map((r) => r["학년"]).filter(Boolean))].sort();

  return (
    <div className="page" style={{ maxWidth: 960 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div>
          <div className="header__logo" style={{ fontSize: 12 }}>Delightful Experiences</div>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>관리자 대시보드</h1>
        </div>
        <button
          className="btn btn--sm btn--outline"
          onClick={() => {
            sessionStorage.removeItem("adminAuth");
            setAuthed(false);
            setPw("");
          }}
        >
          로그아웃
        </button>
      </div>
      <p style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 20 }}>
        총 {results.length}명 응시 · 마지막 업데이트:{" "}
        {results.length > 0
          ? new Date(results[0]["타임스탬프"]).toLocaleDateString("ko-KR")
          : "-"}
      </p>

      {/* Set 통계 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { key: "A", label: "Beginner", color: "var(--set-a)", bg: "var(--set-a-bg)" },
          { key: "B", label: "Elementary", color: "var(--set-b)", bg: "var(--set-b-bg)" },
          { key: "C", label: "Intermediate", color: "var(--set-c)", bg: "var(--set-c-bg)" },
          { key: "D", label: "Advanced", color: "var(--set-d)", bg: "var(--set-d-bg)" },
        ].map((s) => (
          <div
            key={s.key}
            className="card"
            style={{
              padding: 16,
              cursor: "pointer",
              textAlign: "center",
              border: filter === s.key ? `2px solid ${s.color}` : "2px solid transparent",
              background: filter === s.key ? s.bg : "#fff",
              transition: "all 0.15s",
            }}
            onClick={() => setFilter(filter === s.key ? "all" : s.key)}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: s.color, letterSpacing: "0.05em", marginBottom: 4 }}>
              Set {s.key}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{setCounts[s.key]}</div>
            <div style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* 검색 & 필터 바 */}
      <div className="card" style={{ padding: "12px 16px", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {/* 검색 */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <input
              type="text"
              placeholder="이름, 학교, 연락처 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1.5px solid var(--gray-200)",
                borderRadius: 8,
                fontSize: 14,
                fontFamily: "inherit",
                outline: "none",
              }}
            />
          </div>
          {/* 학년 필터 */}
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1.5px solid var(--gray-200)",
              borderRadius: 8,
              fontSize: 14,
              fontFamily: "inherit",
              outline: "none",
              background: "#fff",
            }}
          >
            <option value="all">전체 학년</option>
            {grades.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {/* 정렬 */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1.5px solid var(--gray-200)",
              borderRadius: 8,
              fontSize: 14,
              fontFamily: "inherit",
              outline: "none",
              background: "#fff",
            }}
          >
            <option value="date">최신순</option>
            <option value="name">이름순</option>
            <option value="score">점수순</option>
            <option value="accuracy">정확도순</option>
          </select>
          {/* 새로고침 */}
          <button className="btn btn--sm btn--outline" onClick={loadResults} disabled={loading}>
            새로고침
          </button>
        </div>
      </div>

      {/* 결과 테이블 */}
      <div className="card" style={{ padding: 0, overflow: "auto" }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div className="spinner" />
            <p style={{ marginTop: 8, fontSize: 13, color: "var(--gray-500)" }}>불러오는 중...</p>
          </div>
        ) : error ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--danger)", fontSize: 14 }}>
            {error}
            <br />
            <button className="btn btn--sm btn--outline mt-16" onClick={loadResults}>
              다시 시도
            </button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>날짜</th>
                <th>이름</th>
                <th>학교</th>
                <th>학년</th>
                <th>Set</th>
                <th>점수</th>
                <th>정확도</th>
                <th>소요시간</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: 40, color: "var(--gray-400)" }}>
                    {results.length === 0 ? "아직 결과가 없습니다." : "검색 결과가 없습니다."}
                  </td>
                </tr>
              ) : (
                sorted.map((r, i) => {
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
                    <tr
                      key={i}
                      onClick={() => setSelectedStudent(r)}
                      style={{ cursor: "pointer", transition: "background 0.1s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gray-50)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ fontSize: 12, color: "var(--gray-400)" }}>{i + 1}</td>
                      <td style={{ fontSize: 12, color: "var(--gray-500)", whiteSpace: "nowrap" }}>{date}</td>
                      <td style={{ fontWeight: 600 }}>{r["이름"]}</td>
                      <td style={{ fontSize: 13, color: "var(--gray-600)" }}>{r["학교"] || "-"}</td>
                      <td>{r["학년"]}</td>
                      <td>
                        <span className={`set-tag set-tag--${setLetter}`}>{r["Set"]}</span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{r["점수"]}</td>
                      <td>{r["정확도(%)"]}%</td>
                      <td style={{ fontSize: 12, color: "var(--gray-500)", whiteSpace: "nowrap" }}>
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

      {/* 필터 정보 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontSize: 13, color: "var(--gray-400)" }}>
        <span>
          {filter !== "all" || gradeFilter !== "all" || search ? (
            <button
              style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}
              onClick={() => { setFilter("all"); setGradeFilter("all"); setSearch(""); }}
            >
              필터 초기화
            </button>
          ) : null}
          {" "}
          {sorted.length}명 표시 {sorted.length !== results.length ? `(전체 ${results.length}명)` : ""}
        </span>
      </div>

      {/* 학생 상세 팝업 */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

/**
 * 학생 상세 정보 팝업
 */
function StudentDetailModal({ student, onClose }) {
  const r = student;
  const setLetter = (r["Set"] || "").replace("Set ", "");
  const setColor = {
    A: "var(--set-a)",
    B: "var(--set-b)",
    C: "var(--set-c)",
    D: "var(--set-d)",
  }[setLetter] || "var(--gray-500)";
  const setBg = {
    A: "var(--set-a-bg)",
    B: "var(--set-b-bg)",
    C: "var(--set-c-bg)",
    D: "var(--set-d-bg)",
  }[setLetter] || "var(--gray-100)";
  const setLabel = {
    A: "Beginner",
    B: "Elementary",
    C: "Intermediate",
    D: "Advanced",
  }[setLetter] || "";

  const ts = r["타임스탬프"];
  const dateStr = ts
    ? new Date(ts).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 Set 배지 */}
        <div
          style={{
            background: setBg,
            padding: "24px 24px 20px",
            borderRadius: "16px 16px 0 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: setColor,
              color: "#fff",
              fontSize: 24,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            {setLetter}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: setColor }}>
            Set {setLetter} · {setLabel}
          </div>
          <div style={{ fontSize: 13, color: "var(--gray-500)", marginTop: 4 }}>
            종합 점수 {r["점수"]}점
          </div>
        </div>

        {/* 학생 정보 */}
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "var(--gray-800)" }}>
              학생 정보
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
              <InfoItem label="이름" value={r["이름"]} />
              <InfoItem label="학년" value={r["학년"]} />
              <InfoItem label="학교" value={r["학교"] || "-"} />
              <InfoItem label="학부모 연락처" value={r["학부모연락처"] || "-"} />
              <InfoItem label="응시일" value={dateStr} span={2} />
            </div>
          </div>

          {/* 테스트 결과 */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "var(--gray-800)" }}>
              테스트 결과
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              <StatBox label="정답" value={`${r["정답수"]}/${r["총문제"]}`} />
              <StatBox label="정확도" value={`${r["정확도(%)"]}%`} />
              <StatBox label="소요시간" value={r["소요시간(초)"]} />
            </div>
          </div>

          {/* 레벨 분석 */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "var(--gray-800)" }}>
              레벨 분석
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              <StatBox label="시작 레벨" value={`Lv.${r["시작레벨"]}`} />
              <StatBox label="최고 도달" value={`Lv.${r["최고레벨"]}`} />
              <StatBox label="최종 레벨" value={`Lv.${r["최종레벨"]}`} />
            </div>
            {/* 레벨 시각화 바 */}
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3, 4, 5, 6, 7].map((lv) => {
                  const startLv = Number(r["시작레벨"]) || 1;
                  const maxLv = Number(r["최고레벨"]) || 1;
                  const finalLv = Math.round(Number(r["최종레벨"]) || 1);
                  let bg = "var(--gray-200)";
                  if (lv <= maxLv) bg = "var(--primary-light)";
                  if (lv <= finalLv) bg = "var(--primary)";
                  return (
                    <div
                      key={lv}
                      style={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        background: bg,
                        position: "relative",
                      }}
                    >
                      {lv === startLv && (
                        <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "var(--gray-400)" }}>
                          시작
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: "var(--gray-400)" }}>
                <span>Lv.1</span>
                <span>Lv.7</span>
              </div>
            </div>
          </div>

          {/* 닫기 */}
          <button
            className="btn btn--outline"
            style={{ width: "100%", marginTop: 8 }}
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, span }) {
  return (
    <div style={{ gridColumn: span === 2 ? "1 / -1" : undefined }}>
      <div style={{ fontSize: 11, color: "var(--gray-400)", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--gray-800)" }}>{value}</div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "12px 8px",
        background: "var(--gray-50)",
        borderRadius: 8,
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--gray-900)" }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--gray-500)", marginTop: 2 }}>{label}</div>
    </div>
  );
}
