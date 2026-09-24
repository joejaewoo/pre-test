"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const GRADES = [
  "초1", "초2", "초3",
  "초4", "초5", "초6",
];

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    school: "",
    grade: "",
    parentPhone: "",
  });

  const isValid = form.name && form.grade;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    // 세션 스토리지에 학생 정보 저장
    sessionStorage.setItem("studentInfo", JSON.stringify(form));
    router.push("/test");
  }

  return (
    <div className="page">
      <div className="header">
        <div className="header__logo">Delightful Experiences</div>
        <h1 className="header__title">Level Test</h1>
        <p className="header__sub">즐거움의힘 어학원 온라인 레벨 테스트</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card card--elevated">
          <div className="form-group">
            <label>학생 이름 *</label>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>학교</label>
              <input
                type="text"
                placeholder="예: 서울초등학교"
                value={form.school}
                onChange={(e) => setForm({ ...form, school: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>학부모 연락처</label>
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={form.parentPhone}
                onChange={(e) =>
                  setForm({ ...form, parentPhone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>학년 *</label>
            <div className="grade-grid">
              {GRADES.map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`grade-btn ${form.grade === g ? "grade-btn--selected" : ""}`}
                  onClick={() => setForm({ ...form, grade: g })}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn--primary" disabled={!isValid}>
          테스트 시작하기
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "var(--gray-400)",
            marginTop: 12,
          }}
        >
          약 15~20분 소요 · 총 40문제
        </p>
      </form>
    </div>
  );
}
