# PipeDrive connectors for GDataStudio
Google Data Studio connectors to fetch data from PipeDrive API.

## Connectors organization
There's a main connector called "Core": it retrieve and handle data to bring it properly for GDS and set authentication method.
Child connectors (Deals, Pipelines, ...) use Core functions and have functions specific for their API endpoint.

## How to use them on GDS

### Setup Core connector
1. Go to [Google Apps Script](https://script.google.com)
2. Create new project
3. Name it
4. Go to project settings
5. Check "Display appsscript.json manifest file"
6. Take note about Script ID (useful for child connectors)
7. Go back to code window
8. Create files and set code for Core connector

### Setup child connector
1. Go to [Google Apps Script](https://script.google.com)
2. Create new project
3. Name it
4. Go to project settings
5. Check "Display appsscript.json manifest file"
7. Go back to code window
8. Create files and set code for child connector
9. In appsscript.json, change Dependencies > Libraries > LibraryID to the Core script ID you took note
10. Deploy it (easiest by going though "Use old editor" > "Publish" > "Publish from manifest file")

### Use connectors in GDS
1. Go to [Google Data Studio](https://datastudio.google.com)
2. Create > Data source
3. Search for your deployed child connector
4. Fill credentials
5. Now you can import it in your GDS reports

## To create a new PipeDrive connector
First, copy Deals or Pipelines connector.

[Link to API](https://developers.pipedrive.com/docs/api/v1), where you can find data for below steps.

Then you have 3 things to change :
1. Change `endpoint` global var to API endpoint name : 
api/v1/__deals__?api_token=XXX
```javascript
// core.gs
var endpoint = 'deals';
```
2. Put fetchable fields from API
```javascript
// fields.gs
function getFields(request) {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  fields.newDimension()
    .setId('Deals_FieldName_example')
    .setType(types.NUMBER); // BOOLEAN, TEXT, ...
    
  fields.newDimension()
    .setId('Deals_X')
    .setType(types.TEXT); // BOOLEAN, NUMBER, ...
  
  // put all fetchable fields
  
  return fields;
}
```
3. Handle each data row
```javascript
// dataHandler.gs
function responseToRows(requestedFields, response) {

  // Filter for requested fields
  var fields = requestedFields.asArray();

  return response.map(function(dataElement) {
    var rows = [];
    
    fields.forEach(function (field) {

      switch (field.getId()) {
        case 'Deals_FieldName_example':
          return rows.push(dataElement.FieldName_example);
        case 'Deals_X':
          return rows.push(dataElement.X);
        // put all other cases
        default:
          break;
      }
    });

    return { values: rows };
  });
}
```



## If needed
Send me an email at alexandre.bouijoux@gmail.com :)
