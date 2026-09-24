import { questions, shuffleArray } from "./questions";

/**
 * 학년 → 시작 난이도 매핑 (초1~초6 전용)
 */
export function getStartLevel(grade) {
  const map = {
    "초1": 1,
    "초2": 2,
    "초3": 3,
    "초4": 4,
    "초5": 5,
    "초6": 5,
  };
  return map[grade] || 3;
}

/**
 * 윈도우 기반 난이도 조절
 * - 최근 3문제 중 2개 이상 정답 → 레벨 업
 * - 최근 3문제 중 2개 이상 오답 → 레벨 다운
 * - 그 외 유지
 * - 처음 2문제: 둘 다 같아야 변경
 */
export function shouldLevelChange(answers) {
  const len = answers.length;
  if (len < 2) return 0;
  if (len === 2) {
    if (answers[len - 1].correct && answers[len - 2].correct) return 1;
    if (!answers[len - 1].correct && !answers[len - 2].correct) return -1;
    return 0;
  }
  const last3 = answers.slice(-3);
  const correctCount = last3.filter((a) => a.correct).length;
  if (correctCount >= 2) return 1;
  if (last3.filter((a) => !a.correct).length >= 2) return -1;
  return 0;
}

/**
 * 적응형 테스트 엔진
 *
 * - 현재 난이도에서 문제를 출제
 * - 윈도우 기반 난이도 조절 (신뢰도 향상)
 * - 총 40문제 출제
 * - 같은 문제 중복 출제 안 함
 */
export function createTestSession(grade) {
  const startLevel = getStartLevel(grade);
  const totalQuestions = 40;

  // 각 레벨별로 문제를 섞어서 준비
  const pools = {};
  for (let lv = 1; lv <= 7; lv++) {
    pools[lv] = shuffleArray(questions.filter((q) => q.level === lv));
  }

  // 각 풀에서 사용한 인덱스 추적
  const poolIndex = {};
  for (let lv = 1; lv <= 7; lv++) {
    poolIndex[lv] = 0;
  }

  return {
    grade,
    startLevel,
    currentLevel: startLevel,
    totalQuestions,
    questionIndex: 0,
    answers: [], // { questionId, level, correct, selectedAnswer }
    usedIds: new Set(),
    pools,
    poolIndex,
  };
}

/**
 * 다음 문제 가져오기
 */
export function getNextQuestion(session) {
  if (session.questionIndex >= session.totalQuestions) {
    return null; // 테스트 완료
  }

  let level = session.currentLevel;
  let question = null;

  // 현재 레벨에서 아직 안 쓴 문제 찾기
  // 없으면 인접 레벨에서 찾기
  for (let offset = 0; offset <= 6; offset++) {
    for (const dir of [0, 1, -1]) {
      const tryLevel = level + dir * offset;
      if (tryLevel < 1 || tryLevel > 7) continue;

      const pool = session.pools[tryLevel];
      const idx = session.poolIndex[tryLevel];

      if (idx < pool.length && !session.usedIds.has(pool[idx].id)) {
        question = pool[idx];
        session.poolIndex[tryLevel]++;
        break;
      }
    }
    if (question) break;
  }

  if (!question) {
    // 모든 문제를 소진한 경우 (거의 없음)
    return null;
  }

  session.usedIds.add(question.id);
  return question;
}

/**
 * 답변 기록 및 난이도 조절 (윈도우 기반)
 */
export function recordAnswer(session, questionId, selectedAnswer, correct) {
  session.answers.push({
    questionId,
    level: session.currentLevel,
    selectedAnswer,
    correct,
  });

  // 윈도우 기반 난이도 조절
  const change = shouldLevelChange(session.answers);
  if (change === 1) {
    session.currentLevel = Math.min(7, session.currentLevel + 1);
  } else if (change === -1) {
    session.currentLevel = Math.max(1, session.currentLevel - 1);
  }

  session.questionIndex++;
}

/**
 * 결과 계산
 * Set A: 가장 기초 (score < 2.5)
 * Set B: 초급 (score < 4.0)
 * Set C: 중급 (score < 5.5)
 * Set D: 고급 (score >= 5.5)
 */
export function calculateResult(session) {
  const answers = session.answers;
  const total = answers.length;
  const correctCount = answers.filter((a) => a.correct).length;
  const accuracy = total > 0 ? correctCount / total : 0;

  // 정답 문제들의 평균 레벨
  const correctAnswers = answers.filter((a) => a.correct);
  const avgCorrectLevel =
    correctAnswers.length > 0
      ? correctAnswers.reduce((sum, a) => sum + a.level, 0) /
        correctAnswers.length
      : 1;

  // 최고 도달 레벨
  const maxLevel = Math.max(...answers.map((a) => a.level), 1);

  // 최종 도달 레벨 (마지막 5문제의 평균)
  const lastFive = answers.slice(-5);
  const finalLevel =
    lastFive.reduce((sum, a) => sum + a.level, 0) / lastFive.length;

  // 종합 점수 = (정답 평균 레벨 * 0.4) + (최종 도달 레벨 * 0.4) + (정확도 * 7 * 0.2)
  const score =
    avgCorrectLevel * 0.4 + finalLevel * 0.4 + accuracy * 7 * 0.2;

  // Set 판정
  let set;
  if (score < 2.5) set = "A";
  else if (score < 4.0) set = "B";
  else if (score < 5.5) set = "C";
  else set = "D";

  // 영역별 분석
  const byCategory = {};
  answers.forEach((a) => {
    const q = questions.find((qq) => qq.id === a.questionId);
    if (!q) return;
    if (!byCategory[q.category]) {
      byCategory[q.category] = { total: 0, correct: 0 };
    }
    byCategory[q.category].total++;
    if (a.correct) byCategory[q.category].correct++;
  });

  return {
    set,
    score: Math.round(score * 10) / 10,
    totalQuestions: total,
    correctCount,
    accuracy: Math.round(accuracy * 100),
    avgCorrectLevel: Math.round(avgCorrectLevel * 10) / 10,
    maxLevel,
    finalLevel: Math.round(finalLevel * 10) / 10,
    byCategory,
    startLevel: session.startLevel,
    grade: session.grade,
  };
}

/**
 * Set 설명
 */
export const SET_INFO = {
  A: {
    name: "Set A",
    label: "Beginner",
    description: "알파벳, 기초 단어, 파닉스 중심의 기초 과정",
    color: "a",
  },
  B: {
    name: "Set B",
    label: "Elementary",
    description: "기초 문법과 기본 문장 구조",
    color: "b",
  },
  C: {
    name: "Set C",
    label: "Intermediate",
    description: "문장 변환, 독해, 기본 작문",
    color: "c",
  },
  D: {
    name: "Set D",
    label: "Advanced",
    description: "심화 문법과 고급 독해",
    color: "d",
  },
};
