/**
 * 즐거움의힘 Pre-Test — Google Apps Script
 *
 * ▸ 설정 방법:
 * 1. Google Sheets에서 새 스프레드시트 생성
 * 2. 시트 이름을 "결과" 로 변경
 * 3. A1 행에 헤더 입력:
 *    타임스탬프 | 이름 | 학교 | 학년 | 학부모연락처 | Set | 점수 | 정답수 | 총문제 | 정확도 | 소요시간 | 시작레벨 | 최고레벨 | 최종레벨
 * 4. 확장프로그램 > Apps Script 에서 이 코드를 붙여넣기
 * 5. 배포 > 새 배포 > 웹 앱
 *    - "다음 사용자 권한으로 실행": 나
 *    - "액세스 권한이 있는 사용자": 모든 사용자
 * 6. 배포 URL을 .env.local의 NEXT_PUBLIC_GOOGLE_SCRIPT_URL에 설정
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.action === "submit") {
      return submitResult(data.data);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: "Unknown action" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var action = e.parameter.action;

  if (action === "getResults") {
    return getResults();
  }

  return ContentService.createTextOutput(
    JSON.stringify({ success: false, error: "Unknown action" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 결과 저장
 */
function submitResult(d) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("결과");

  if (!sheet) {
    sheet = ss.insertSheet("결과");
    sheet.appendRow([
      "타임스탬프", "이름", "학교", "학년", "학부모연락처",
      "Set", "점수", "정답수", "총문제", "정확도(%)",
      "소요시간(초)", "시작레벨", "최고레벨", "최종레벨"
    ]);
  }

  var duration = d.duration || 0;
  var durationStr = Math.floor(duration / 60) + "분 " + (duration % 60) + "초";

  sheet.appendRow([
    d.timestamp || new Date().toISOString(),
    d.studentName || "",
    d.school || "",
    d.grade || "",
    d.parentPhone || "",
    "Set " + (d.set || "?"),
    d.score || 0,
    d.correctCount || 0,
    d.totalQuestions || 0,
    d.accuracy || 0,
    durationStr,
    d.startLevel || 0,
    d.maxLevel || 0,
    d.finalLevel || 0,
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 결과 조회 (관리자용)
 */
function getResults() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("결과");

  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, data: [] })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var rows = [];

  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j];
    }
    rows.push(row);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ success: true, data: rows })
  ).setMimeType(ContentService.MimeType.JSON);
}
