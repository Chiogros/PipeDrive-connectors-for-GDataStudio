function fetchDataFromAPI(requestedFields, request) {
  var rawRows = PipeDriveCore.fetchDataFromAPI(requestedFields, request, endpoint);
  
  return responseToRows(requestedFields, rawRows);
}
