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
    var freshRows = responseToRows(requestedFields, parsedResponse.data);
    rows = rows.concat(freshRows);

    // Go to next results page
    start += itemsPerPage;

  }

  return rows;
}
