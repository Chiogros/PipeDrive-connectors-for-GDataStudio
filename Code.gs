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
    .setId('Deals_id')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_org_id')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_stage_id')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_title')
    .setType(types.TEXT);

  fields.newMetric()
    .setId('Deals_value')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newDimension()
    .setId('Deals_currency')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_add_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_update_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_stage_changed_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_active')
    .setType(types.BOOLEAN);

  fields.newDimension()
    .setId('Deals_deleted')
    .setType(types.BOOLEAN);

  fields.newDimension()
    .setId('Deals_status')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_probability')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_next_activity_date')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_next_activity_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_next_activity_id')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_last_activity_id')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_last_activity_date')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_lost_reason')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_visible_to')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_close_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_pipeline_id')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_won_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_first_won_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_lost_time')
    .setType(types.TEXT);

  fields.newMetric()
    .setId('Deals_products_count')
    .setType(types.NUMBER);

  fields.newMetric()
    .setId('Deals_files_count')
    .setType(types.NUMBER);

  fields.newMetric()
    .setId('Deals_notes_count')
    .setType(types.NUMBER);

  fields.newMetric()
    .setId('Deals_followers_count')
    .setType(types.NUMBER);

  fields.newMetric()
    .setId('Deals_email_messages_count')
    .setType(types.NUMBER);

  fields.newMetric()
    .setId('Deals_activities_count')
    .setType(types.NUMBER);

  fields.newMetric()
    .setId('Deals_done_activities_count')
    .setType(types.NUMBER);

  fields.newMetric()
    .setId('Deals_undone_activities_count')
    .setType(types.NUMBER);

  fields.newMetric()
    .setId('Deals_participants_count')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_expected_close_date')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_last_incoming_mail_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_last_outcoming_mail_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_renewal_type')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_stage_order_nr')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_person_name')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_org_name')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_next_activity_subject')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_next_activity_type')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_next_activity_duration')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_next_activity_note')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_group_id')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_group_name')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_formatted_value')
    .setType(types.TEXT);

  fields.newMetric()
    .setId('Deals_weighted_value')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Deals_formatted_weighted_value')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_weighted_value_currency')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_rotten_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_owner_name')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_cc_email')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Deals_org_hidden')
    .setType(types.BOOLEAN);

  fields.newDimension()
    .setId('Deals_person_hidden')
    .setType(types.BOOLEAN);

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
    var freshRows = responseToRows(requestedFields, parsedResponse.data);
    rows = rows.concat(freshRows);

    // Go to next results page
    start += itemsPerPage;

  }

  return rows;
}

function responseToRows(requestedFields, response) {

  // Transform parsed data and filter for requested fields
  var fields = requestedFields.asArray();

  return response.map(function(dataElement) {
    var rows = [];
    
    fields.forEach(function (field) {
      
      switch (field.getId()) {
        case 'Deals_id':
          return rows.push(dataElement.id);
        case 'Deals_org_id':
          return rows.push(dataElement.org_id);
        case 'Deals_stage_id':
          return rows.push(dataElement.stage_id);
        case 'Deals_title':
          return rows.push(dataElement.title);
        case 'Deals_value':
          return rows.push(dataElement.value);
        case 'Deals_currency':
          return rows.push(dataElement.currency);
        case 'Deals_add_time':
          return rows.push(dataElement.add_time);
        case 'Deals_update_time':
          return rows.push(dataElement.update_time);
        case 'Deals_stage_changed_time':
          return rows.push(dataElement.stage_changed_time);
        case 'Deals_active':
          return rows.push(dataElement.active);
        case 'Deals_deleted':
          return rows.push(dataElement.deleted);
        case 'Deals_status':
          return rows.push(dataElement.status);
        case 'Deals_probability':
          return rows.push(dataElement.probability);
        case 'Deals_next_activity_date':
          return rows.push(dataElement.next_activity_date);
        case 'Deals_next_activity_time':
          return rows.push(dataElement.next_activity_time);
        case 'Deals_next_activity_id':
          return rows.push(dataElement.next_activity_id);
        case 'Deals_last_activity_date':
          return rows.push(dataElement.last_activity_date);
        case 'Deals_lost_reason':
          return rows.push(dataElement.lost_reason);
        case 'Deals_visible_to':
          return rows.push(dataElement.visible_to);
        case 'Deals_close_time':
          return rows.push(dataElement.close_time);
        case 'Deals_pipeline_id':
          return rows.push(dataElement.pipeline_id);
        case 'Deals_won_time':
          return rows.push(dataElement.won_time);
        case 'Deals_lost_time':
          return rows.push(dataElement.lost_time);
        case 'Deals_products_count':
          return rows.push(dataElement.products_count);
        case 'Deals_files_count':
          return rows.push(dataElement.files_count);
        case 'Deals_notes_count':
          return rows.push(dataElement.notes_count);
        case 'Deals_followers_count':
          return rows.push(dataElement.followers_count);
        case 'Deals_email_messages_count':
          return rows.push(dataElement.email_messages_count);
        case 'Deals_activities_count':
          return rows.push(dataElement.activities_count);
        case 'Deals_done_activities_count':
          return rows.push(dataElement.done_activities_count);
        case 'Deals_undone_activities_count':
          return rows.push(dataElement.undone_activities_count);
        case 'Deals_participants_count':
          return rows.push(dataElement.participants_count);
        case 'Deals_expected_close_date':
          return rows.push(dataElement.expected_close_date);
        case 'Deals_last_incoming_mail_time':
          return rows.push(dataElement.last_incoming_mail_time);
        case 'Deals_last_outcoming_mail_time':
          return rows.push(dataElement.last_outcoming_mail_time);
        case 'Deals_renewal_type':
          return rows.push(dataElement.renewal_type);
        case 'Deals_stage_order_nr':
          return rows.push(dataElement.stage_order_nr);
        case 'Deals_person_name':
          return rows.push(dataElement.person_name);
        case 'Deals_org_name':
          return rows.push(dataElement.org_name);
        case 'Deals_next_activity_subject':
          return rows.push(dataElement.next_activity_subject);
        case 'Deals_next_activity_type':
          return rows.push(dataElement.next_activity_type);
        case 'Deals_next_activity_duration':
          return rows.push(dataElement.next_activity_duration);
        case 'Deals_next_activity_note':
          return rows.push(dataElement.next_activity_note);
        case 'Deals_group_id':
          return rows.push(dataElement.group_id);
        case 'Deals_group_name':
          return rows.push(dataElement.group_name);
        case 'Deals_formatted_value':
          return rows.push(dataElement.formatted_value);
        case 'Deals_weighted_value':
          return rows.push(dataElement.weighted_value);
        case 'Deals_formatted_weighted_value':
          return rows.push(dataElement.formatted_weighted_value);
        case 'Deals_weighted_value_currency':
          return rows.push(dataElement.weighted_value_currency);
        case 'Deals_rotten_time':
          return rows.push(dataElement.rotten_time);
        case 'Deals_owner_name':
          return rows.push(dataElement.owner_name);
        case 'Deals_cc_email':
          return rows.push(dataElement.cc_email);
        case 'Deals_org_hidden':
          return rows.push(dataElement.org_hidden);
        case 'Deals_person_hidden':
          return rows.push(dataElement.person_hidden);
        default:
          break;
      }
    });

    return { values: rows };
  });
}
