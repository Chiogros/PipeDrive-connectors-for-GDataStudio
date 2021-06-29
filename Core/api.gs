function fetchDataFromAPI(requestedFields, request, endpoint) {

  var itemsPerPage = 500;

  // will contains all fetched rows
  var parsedResponses = new Array();

  // index for looping through pages
  var start = 0;

  try {

    // Loop over results pages
    while(1) {

      // API Url
      var url = [
        'https://',
        request.configParams.domain,
        '.pipedrive.com/api/v1/',
        endpoint,
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

      // Save results
      parsedResponses = parsedResponses.concat(parsedResponse.data);

      // Go to next results page
      start += itemsPerPage;

    }
    
  } catch (e) {
    cc.newUserError()
      .setDebugText('Error fetching data from API. ' + e)
      .setText('There was an error communicating with PipeDrive. Try again later.')
      .throwException();
  }

  return parsedResponses;
}
