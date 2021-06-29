var endpoint = 'deals';

function getSchema(request) {
  return PipeDriveCore.getSchema(request, endpoint, getFields(request));
}

function getData(request) {

  // Create schema for requested fields
  var requestedFields = getRequestedFields(request);

  // Get rows
  var rows = fetchDataFromAPI(requestedFields, request);

  return {
    schema: requestedFields.build(),
    rows: rows
  };
}

function getRequestedFields(request) {
  return PipeDriveCore.getRequestedFields(request, getFields());
}

function getConfig(request) {
  return PipeDriveCore.getConfig(request);
}
