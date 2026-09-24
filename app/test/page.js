"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CATEGORY_LABELS } from "../../lib/questions";
import {
  createTestSession,
  getNextQuestion,
  recordAnswer,
  calculateResult,
} from "../../lib/adaptive";

export default function TestPage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedbackLock, setFeedbackLock] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  // 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  // 세션 초기화
  useEffect(() => {
    const infoStr = sessionStorage.getItem("studentInfo");
    if (!infoStr) {
      router.push("/");
      return;
    }
    const info = JSON.parse(infoStr);
    const sess = createTestSession(info.grade);
    setSession(sess);
    const q = getNextQuestion(sess);
    setCurrentQuestion(q);
  }, [router]);

  const handleSelect = useCallback(
    (idx) => {
      if (feedbackLock || !currentQuestion) return;

      setSelected(idx);
      setFeedbackLock(true);

      const correct = idx === currentQuestion.answer;

      // 600ms 후 다음 문제로 (정답/오답 표시 없이)
      setTimeout(() => {
        recordAnswer(session, currentQuestion.id, idx, correct);

        if (session.questionIndex >= session.totalQuestions) {
          // 테스트 완료
          const result = calculateResult(session);
          const info = JSON.parse(sessionStorage.getItem("studentInfo") || "{}");
          const fullResult = {
            ...result,
            studentName: info.name,
            school: info.school,
            grade: info.grade,
            parentPhone: info.parentPhone,
            timestamp: new Date().toISOString(),
            duration: Math.floor((Date.now() - startTime) / 1000),
          };
          sessionStorage.setItem("testResult", JSON.stringify(fullResult));

          // Google Sheets에 전송 (비동기)
          submitToSheets(fullResult);

          router.push("/result");
          return;
        }

        const nextQ = getNextQuestion(session);
        setCurrentQuestion(nextQ);
        setSelected(null);
        setFeedbackLock(false);
      }, 600);
    },
    [session, currentQuestion, feedbackLock, router, startTime]
  );

  if (!session || !currentQuestion) {
    return (
      <div className="page" style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="spinner" />
      </div>
    );
  }

  const progress = (session.questionIndex / session.totalQuestions) * 100;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const catLabel = CATEGORY_LABELS[currentQuestion.category] || currentQuestion.category;

  return (
    <div className="page">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div className="header__logo" style={{ fontSize: 12 }}>
          Delightful Experiences
        </div>
        <div className="timer">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>

      {/* Progress */}
      <div className="progress-wrap">
        <div className="progress-info">
          <span>
            {session.questionIndex + 1} / {session.totalQuestions}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="card card--elevated flex-1">
        <div className="question-number">
          Q{session.questionIndex + 1}
          <span style={{ marginLeft: 8, fontSize: 11, color: "var(--gray-400)" }}>
            {catLabel}
          </span>
        </div>

        {/* Picture (emoji) for visual questions */}
        {currentQuestion.picture && (
          <div style={{ fontSize: 64, textAlign: "center", margin: "12px 0" }}>
            {currentQuestion.picture}
          </div>
        )}

        <div className="question-text">{currentQuestion.question}</div>

        {currentQuestion.sub && (
          <div className="question-sub">{currentQuestion.sub}</div>
        )}

        {currentQuestion.context && (
          <div className="question-context">{currentQuestion.context}</div>
        )}

        {/* Multiple Choice Options — no correct/wrong feedback */}
        <div className="options">
          {currentQuestion.options.map((opt, idx) => {
            let cls = "option";
            if (idx === selected) cls += " option--selected";

            return (
              <button
                key={idx}
                className={cls}
                onClick={() => handleSelect(idx)}
                disabled={feedbackLock}
                style={{ border: "1.5px solid", textAlign: "left" }}
              >
                <span className="option__marker">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="option__text">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * 결과 저장 (API)
 */
async function submitToSheets(result) {
  try {
    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result), keepalive: true,
    });
  } catch (e) {
    console.warn("결과 전송 실패:", e);
  }
}
