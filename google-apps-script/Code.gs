/**
 * 즐거움의힘 Pre-Test — Google Apps Script
 *
 * ▸ 설정 방법:
 * 1. Google Sheets에서 새 스프레드시트 생성
 * 2. 시트 이름을 "결과" 로 변경 (자동 생성됨)
 * 3. 확장프로그램 > Apps Script 에서 이 코드를 붙여넣기
 * 4. 배포 > 새 배포 > 웹 앱
 *    - "다음 사용자 권한으로 실행": 나
 *    - "액세스 권한이 있는 사용자": 모든 사용자
 * 5. 배포 URL을 Vercel 환경변수 NEXT_PUBLIC_GOOGLE_SCRIPT_URL에 설정
 *
 * ⚠️ 코드를 수정한 후에는 반드시 "새 배포"로 다시 배포해야 반영됩니다.
 *    (기존 배포 URL은 이전 코드를 실행합니다)
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.action === "submit") {
      return submitResult(data.data);
    }

    return jsonResponse({ success: false, error: "Unknown action" });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function doGet(e) {
  var action = (e.parameter && e.parameter.action) || "";
  var callback = (e.parameter && e.parameter.callback) || "";

  if (action === "getResults") {
    var result = getResultsData();
    // JSONP 지원 (CORS 우회)
    if (callback) {
      return ContentService.createTextOutput(
        callback + "(" + JSON.stringify(result) + ")"
      ).setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return jsonResponse(result);
  }

  // 기본: 상태 확인용
  if (action === "ping") {
    return jsonResponse({ success: true, message: "connected" });
  }

  return jsonResponse({ success: false, error: "Unknown action. Use ?action=getResults" });
}

/**
 * JSON 응답 생성 헬퍼
 */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
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

  return jsonResponse({ success: true });
}

/**
 * 결과 데이터 가져오기
 */
function getResultsData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("결과");

  if (!sheet) {
    return { success: true, data: [], count: 0 };
  }

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return { success: true, data: [], count: 0 };
  }

  var headers = data[0];
  var rows = [];

  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      var val = data[i][j];
      // Date 객체를 문자열로 변환
      if (val instanceof Date) {
        val = val.toISOString();
      }
      row[headers[j]] = val;
    }
    rows.push(row);
  }

  return { success: true, data: rows, count: rows.length };
}
