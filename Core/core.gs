var cc = DataStudioApp.createCommunityConnector();

function getSchema(request, endpoint, rawFields) {

  // Check credentials
  var configParams = request.configParams;
  checkForValidCredentials(configParams.domain, endpoint, configParams.key);

  // return fields
  var fields = rawFields.build();
  return { schema: fields };
}

function getRequestedFields(request, fields) {

  // Create schema for requested fields
  try {

    requestedFieldIds = request.fields.map(function(field) {
      return field.name;
    });
    
    return fields.forIds(requestedFieldIds);
    
  } catch (e) {
    cc.newUserError()
      .setDebugText('Error requesting fields. ' + e)
      .setText('There was an error requesting fields. File an issue.')
      .throwException();
  }
}

function getConfig(request) {
  var config = cc.getConfig();
  
  setConfig(config);
  
  config.setDateRangeRequired(false);
  return config.build();
}
