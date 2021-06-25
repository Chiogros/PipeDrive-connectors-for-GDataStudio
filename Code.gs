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

function isAdminUser() {
  return true;
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
    .setId('Deals_title')
    .setType(types.TEXT);

  fields.newMetric()
    .setId('Deals_value')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newDimension()
    .setId('Deals_add_time')
    .setType(types.YEAR_MONTH_DAY);

  fields.newDimension()
    .setId('Deals_update_time')
    .setType(types.YEAR_MONTH_DAY);

  fields.newDimension()
    .setId('Deals_active')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_status')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_lost_reason')
    .setType(types.TEXT);

  return fields;
}

function getSchema(request) {
  var fields = getFields(request).build();
  return { schema: fields };
}

function getData(request) {

  // Create schema for requested fields
  var requestedFields;
  try {
    requestedFields = getRequestedFields(request);
  } catch (e) {
    DataStudioApp.createCommunityConnector()
      .newUserError()
      .setDebugText('Error resqueting fields. ' + e)
      .setText('There was an error requesting fields. File an issue.')
      .throwException();
  }

  // Get rows
  var rows;
  try {
    rows = fetchDataFromAPI(requestedFields, request);
  } catch(e) {
    DataStudioApp.createCommunityConnector()
      .newUserError()
      .setDebugText('Error fetching data from API. ' + e)
      .setText('There was an error communicating with the service. Try again later, or file an issue if this error persists.')
      .throwException();
  }

  return {
    schema: requestedFields.build(),
    rows: rows
  };
}

function getRequestedFields(request) {

  // Create schema for requested fields
  var requestedFieldIds = request.fields.map(function(field) {
    return field.name;
  });
  
  return getFields().forIds(requestedFieldIds);
}

function fetchDataFromAPI(requestedFields, request) {

  var itemsPerPage = 500;

  // will contains all fetched rows
  var rows = new Array();

  // index for looping through pages
  var start = 0;

  // Loop over results pages
  while(1) {

    // API Url
    var url = [
      'https://',
      request.configParams.domain,
      '.pipedrive.com/api/v1/deals',
      '?api_token=',
      request.configParams.key,
      '&start=',
      start,
      '&limit=',
      itemsPerPage
    ];

    // Fetch data
    var response = UrlFetchApp.fetch(url.join(''));
    var parsedResponse = JSON.parse(response);

    // No more results
    if (parsedResponse.data == null) {
      break;
    }

    // Clean up results
    var freshRows = responseToRows(requestedFields, parsedResponse.data, request.configParams.package);
    rows = rows.concat(freshRows);

    // Go to next results page
    start += itemsPerPage;

  }

  return rows;
}

function responseToRows(requestedFields, response, packageName) {

  // Transform parsed data and filter for requested fields
  return response.map(function(dataElement) {
    var row = [];
    requestedFields.asArray().forEach(function (field) {
      switch (field.getId()) {
        case 'Deals_title':
          return row.push(dataElement.title);
        case 'Deals_value':
          return row.push(dataElement.value);
        case 'Deals_add_time':
          let date_add_time = new Date(dataElement.add_time);
          let date_add_time_string = date_add_time.getFullYear() + '/' + (date_add_time.getMonth() + 1) + '/' + date_add_time.getDate();
          return row.push(date_add_time_string);
        case 'Deals_update_time':
          let date_update_time = new Date(dataElement.update_time);
          let date_update_time_string = date_update_time.getFullYear() + '/' + (date_update_time.getMonth() + 1) + '/' + date_update_time.getDate();
          return row.push(date_update_time_string);
        case 'Deals_active':
          return row.push(dataElement.active);
        case 'Deals_status':
          return row.push(dataElement.status);
        case 'Deals_lost_reason':
          return row.push(dataElement.lost_reason);
        default:
          break;
      }
    });
    return { values: row };
  });

}
