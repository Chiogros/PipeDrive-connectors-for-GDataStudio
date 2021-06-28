var cc = DataStudioApp.createCommunityConnector();

function getSchema(request) {

  // Check credentials
  var configParams = request.configParams;
  checkForValidCredentials(configParams.key, configParams.domain);

  // return fields
  var fields = getFields(request).build();
  return { schema: fields };
}

function getData(request) {

  // Create schema for requested fields
  var requestedFields;
  try {
    requestedFields = getRequestedFields(request);
  } catch (e) {
    cc.newUserError()
      .setDebugText('Error resqueting fields. ' + e)
      .setText('There was an error requesting fields. File an issue.')
      .throwException();
  }

  // Get rows
  var rows;
  try {
    rows = fetchDataFromAPI(requestedFields, request);
  } catch(e) {
    cc.newUserError()
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

function getConfig(request) {
  var config = cc.getConfig();
  
  setConfig(config);
  
  config.setDateRangeRequired(false);
  return config.build();
}
