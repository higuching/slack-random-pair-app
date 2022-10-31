// ウィークリー定期実行用
function doWeekly() {
    const textArray = [':cat:', ':dog:', ':bear:', ':horse:', ':sheep:'];
    const responseText = createRandomPair(textArray);
    
    const url = PropertiesService.getScriptProperties().getProperty("SLACK_WEBHOOK_URL");
    const payload = {
      text: responseText,
    };
    const params = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
    };
    const response = UrlFetchApp.fetch(url, params);
  }
  
  // スラッシュコマンドからのリクエスト用
  // e.g. /pair :cat: :dog: :bear: :horse: :sheep:
  function doPost(e) {
    const textArray = getTextArray(e.postData.getDataAsString());
  
    const responseText = createRandomPair(textArray);
  
    // 生成したテキストを返す
    let jsonData = {
      'text': responseText,
      'response_type': 'in_channel',
    };
    let payload = JSON.stringify(jsonData);
    let output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(payload);
  
    return output;
  }
  
  // POSTパラメーターからtext情報を配列で取得する
  function getTextArray(params) {
    const paramArray = convertParamFromStringToArray(params);
    const textArray = convertTextToArray(paramArray['text']);
  
    return textArray;
  }
  
  // 受け取ったPOSTを配列型に整形
  function convertParamFromStringToArray(params) {
    // let json = JSON.parse(params);
    let paramArray = {};
    params.split('&').map(s => s.split('=')).forEach(function (elm) {
      paramArray[elm[0]] = elm[1];
    });
    return paramArray;
  }
  
  // text情報を整形
  function convertTextToArray(text) {
    return decodeURI(text).replace(/\s+/g, '').split('+');
  }
  
  // 配列をシャッフルしてペアを作成する
  function createRandomPair(memberArray) {
    if (memberArray.length == 0) {
      return '内容が空';
    }
  
    let pairMultiArray = [];
    let pairArray = [];
  
    memberArray = shuffleArray(memberArray);
    memberArray.forEach(function(elm, idx) {
      pairArray.push(elm);
      if (pairArray.length == 2 || memberArray.length == idx + 1) {
        pairMultiArray.push(pairArray);
        pairArray = [];
      }
    });
  
    let result = 'ペア作ったよ！\n';
    pairMultiArray.forEach(function(elm) {
      result += elm.join(" - ") + "\n";
    });
    return decodeURIComponent(result);
  }
  
  // 配列をシャッフルして返す
  function shuffleArray(array, cnt = 0) {
    let resultArray = Object.assign([], array);
    for (let i = resultArray.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [resultArray[i], resultArray[randomIndex]] = [resultArray[randomIndex], resultArray[i]];
    }
    if (cnt < 100 && JSON.stringify(resultArray) == JSON.stringify(array)) {
      cnt++;
      shuffleArray(array, cnt);
    }
    return resultArray;
  }
  