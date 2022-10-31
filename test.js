function test() {
    if (!testConvertParamFromStringToArray()) {
      throw Error('testConvertParamFromStringToArray() is failed.');
    }
    if (!testShuffleArray()) {
      throw Error('testShuffleArray() is failed.');
    }
  }
  
  function testConvertParamFromStringToArray() {
    const paramString = 'token=xxxxxxxxxxxxxxxxxxxxxxx&team_id=TESTTEAMID&team_domain=test-team-domain&channel_id=CHANNELID&channel_name=test-channel-name&user_id=USERID&user_name=test_user_name&command=%2Fpair&text=hoge+fuga+piyo&api_app_id=APIAPPID&is_enterprise_install=false&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2Fxxxxxxxxxxxxxxxxxx%2Fxxxxxxxxxxx&trigger_id=1111111111111.11111111111111.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const resultJson = {
      'token': 'xxxxxxxxxxxxxxxxxxxxxxx',
      'team_id': 'TESTTEAMID',
      'team_domain': 'test-team-domain',
      'channel_id': 'CHANNELID',
      'channel_name': 'test-channel-name',
      'user_id': 'USERID',
      'user_name': 'test_user_name',
      'command': '%2Fpair',
      'text': 'hoge+fuga+piyo',
      'api_app_id': 'APIAPPID',
      'is_enterprise_install': 'false',
      'response_url': 'https%3A%2F%2Fhooks.slack.com%2Fcommands%2Fxxxxxxxxxxxxxxxxxx%2Fxxxxxxxxxxx',
      'trigger_id': '1111111111111.11111111111111.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    };
  
    const paramArray = convertParamFromStringToArray(paramString);
    console.log(paramArray);
    console.log(resultJson);
    return JSON.stringify(resultJson) == JSON.stringify(paramArray);
  }
  
  function testShuffleArray() {
    const textArray = ['fuga', 'hoge'];
    shuffledArray = shuffleArray(textArray);
    console.log(shuffledArray);
    return shuffleArray != textArray;
  }
  