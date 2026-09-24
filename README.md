# 즐거움의힘 온라인 Pre-Test

적응형 영어 레벨 테스트 — 학생의 실력에 따라 문제 난이도가 자동 조절됩니다.

## 주요 기능

- **적응형 테스트**: 학년 기반 시작 + 정답/오답에 따라 난이도 자동 조절
- **4단계 배정**: Set A(Beginner) ~ Set D(Advanced)
- **Google Sheets 자동 기록**: 결과가 실시간으로 시트에 저장
- **관리자 대시보드**: `/admin`에서 전체 결과 조회 및 필터링

## 배포 방법

### 1. GitHub에 올리기

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/de-pretest.git
git push -u origin main
```

### 2. Vercel에 배포

1. [vercel.com](https://vercel.com)에 GitHub 계정으로 로그인
2. "New Project" → GitHub 레포지토리 선택
3. Environment Variables 에 아래 추가:
   - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` = (아래 3단계에서 얻는 URL)
4. Deploy 클릭

### 3. Google Sheets 연동

1. [Google Sheets](https://sheets.google.com)에서 새 스프레드시트 생성
2. 시트 이름을 **"결과"** 로 변경
3. A1 행에 헤더 입력:
   ```
   타임스탬프 | 이름 | 학교 | 학년 | 학부모연락처 | Set | 점수 | 정답수 | 총문제 | 정확도(%) | 소요시간(초) | 시작레벨 | 최고레벨 | 최종레벨
   ```
4. **확장프로그램 > Apps Script** 클릭
5. `google-apps-script/Code.gs` 파일의 내용을 붙여넣기
6. **배포 > 새 배포 > 유형: 웹 앱**
   - "다음 사용자 권한으로 실행": **나**
   - "액세스 권한이 있는 사용자": **모든 사용자**
7. 배포 URL을 복사하여 Vercel의 환경 변수에 설정
8. Vercel에서 재배포 (Settings > Redeploy)

## 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 학생 정보 입력 (이름, 학교, 학년) |
| `/test` | 적응형 테스트 (25문제) |
| `/result` | 결과 확인 (Set 배정, 영역별 분석) |
| `/admin` | 관리자 결과 조회 대시보드 |

## 적응형 알고리즘

- 학년에 따라 시작 난이도 설정 (초1→Lv1, 초5→Lv3, 중2→Lv5)
- 정답 → 난이도 +1 / 오답 → 난이도 -1
- 종합 점수 = 정답평균레벨(40%) + 최종도달레벨(40%) + 정확도(20%)
- Set A: 점수 < 2.5 / Set B: < 4.0 / Set C: < 5.5 / Set D: ≥ 5.5

## 로컬 개발

```bash
npm install
cp .env.local.example .env.local
# .env.local 에 Google Script URL 입력
npm run dev
```

http://localhost:3000 에서 확인
