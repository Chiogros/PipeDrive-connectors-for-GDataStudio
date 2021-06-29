var cc = DataStudioApp.createCommunityConnector();

function getAuthType() {
  var AuthTypes = cc.AuthType;
  return cc
    .newAuthTypeResponse()
    .setAuthType(AuthTypes.NONE)
    .build();
}

function isAdminUser() {
  return true;
}

function checkForValidCredentials(domain, endpoint, key) {

  var baseURL = 'https://' + domain + '.pipedrive.com/api/v1/' + endpoint + '?api_token=' + key;
  var options = {
    'method' : 'GET',
    'headers': {
      'Content-Type': 'application/json'
    },
    'muteHttpExceptions':true
  };
  var response = UrlFetchApp.fetch(baseURL, options);

  if (response.getResponseCode() == 200) {
    return true;
  }
    
  cc.newUserError()
    .setText('Credentials are not valids.')
    .throwException();
}
