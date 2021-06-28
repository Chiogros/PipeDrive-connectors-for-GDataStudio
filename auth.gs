var cc = DataStudioApp.createCommunityConnector();

function getAuthType() {
  var AuthTypes = cc.AuthType;
  return cc
    .newAuthTypeResponse()
    .setAuthType(AuthTypes.NONE)
    // .setHelpUrl('https://pipedrive.readme.io/docs/core-api-concepts-about-pipedrive-api')
    .build();
}

/*function setCredentials(request) {
  var key = request.key;
  var domain = request.domain;

  var validKey = checkForValidCredentials(key, domain);
  if (!validKey) {
    return {
      errorCode: 'INVALID_CREDENTIALS'
    };
  }

  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('pipedrive.key', key);
  userProperties.setProperty('pipedrive.domain', domain);
  
  return {
    errorCode: 'NONE'
  };
}*/

function isAdminUser() {
  return true;
}

function checkForValidCredentials(key, domain) {

  var baseURL = 'https://' + domain + '.pipedrive.com/api/v1/deals?api_token=' + key;
  var options = {
    'method' : 'GET',
    'headers': {
      'Content-Type': 'application/json'
    },
    'muteHttpExceptions':true
  };
  var response = UrlFetchApp.fetch(baseURL, options);
  // var response = UrlFetchApp.fetch(baseURL);

  if (response.getResponseCode() == 200) {
    return true;
  }
    
  cc.newUserError()
    .setText('Credentials are not valids.')
    .throwException();

}

/*function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var key = userProperties.getProperty('pipedrive.key');
  var domain = userProperties.getProperty('pipedrive.domain');
  return checkForValidCredentials(key, domain);
}*/

/*function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty('pipedrive.key');
  userProperties.deleteProperty('pipedrive.domain');
}*/
