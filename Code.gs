var cc = DataStudioApp.createCommunityConnector();

function getAuthType() {
  var AuthTypes = cc.AuthType;
  return cc
    .newAuthTypeResponse()
    .setAuthType(AuthTypes.KEY)
    .setHelpUrl('https://pipedrive.readme.io/docs/core-api-concepts-about-pipedrive-api')
    .build();
}

function setCredentials(request) {
  var key = request.key;
  var validKey = checkForValidKey(key);
  if (!validKey) {
    return {
      errorCode: 'INVALID_CREDENTIALS'
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('dscc.key', key);
  return {
    errorCode: 'NONE'
  };
}

function checkForValidKey(key) {
  var token = key;
  var baseURL = 'https://equipeer.pipedrive.com/api/v1/deals?api_token=' + token;
  var options = {
    'method' : 'GET',
    'headers': {
      'Content-Type': 'application/json'
    },
    'muteHttpExceptions':true
  };
  // var response = UrlFetchApp.fetch(baseURL, options);
  var response = UrlFetchApp.fetch(baseURL);
  if (response.getResponseCode() == 200) {
    return true;
  } else {
    return false;
  }
}

function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var key = userProperties.getProperty('dscc.key');
  return checkForValidKey(key);
}

function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty('dscc.key');
}

function getConfig(request) {
  var config = cc.getConfig();
  
  config.newInfo()
    .setId('instructions')
    .setText('Enter API key to fetch account data.');
  
  config.newTextInput()
    .setId('key')
    .setName('Enter an API key')
    .setHelpText('https://pipedrive.readme.io/docs/how-to-find-the-api-token')
    .setPlaceholder('API token');

  config.newTextInput()
    .setId('domain')
    .setName('Enter domain name')
    .setHelpText('https://pipedrive.readme.io/docs/how-to-get-the-company-domain')
    .setPlaceholder('Domain name');
  
  config.setDateRangeRequired(true);
  return config.build();
}

function getFields(request) {

  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;
  
  fields.newDimension()
    .setId('Leads_acheteurs')
    .setType(types.TEXT);
  
  return fields;
}

function getSchema(request) {
  var fields = getFields(request).build();
  return { schema: fields };
}

function getData(request) {

  // Create schema for requested fields
  var requestedFieldIds = request.fields.map(function(field) {
    return field.name;
  });
  var requestedFields = getFields().forIds(requestedFieldIds);

  var start = 0;

  // Fetch and parse data from API
  var url = [
    'https://',
    request.configParams.domain,
    '.pipedrive.com/api/v1/deals',
    '?api_token=',
    request.configParams.key,
    '&start=',
    start
  ];

  var response = UrlFetchApp.fetch(url.join(''));
  var parsedResponse = JSON.parse(response).data;
  var rows = responseToRows(requestedFields, parsedResponse, request.configParams.package);
  
  return {
    schema: requestedFields.build(),
    rows: rows
  };
}

function responseToRows(requestedFields, response, packageName) {

  // Transform parsed data and filter for requested fields
  return response.map(function(dataElement) {
    var row = [];
    requestedFields.asArray().forEach(function (field) {
      /*switch (field.getId()) {
        case 'Nombre de leads acheteurs':
          return row.push(dataElement.title);
        case 'day':
          return row.push(dataElement.add_time);
        case 'downloads':
          return row.push(dataElement.downloads);
        case 'packageName':
          return row.push(packageName);
        default:*/
          return row.push(dataElement.title);
      //}
    });
    return { values: row };
  });

}









