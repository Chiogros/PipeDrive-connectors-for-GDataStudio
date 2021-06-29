# PipeDrive-connectors-for-GDataStudio
A basic connector for Google Data Studio that connects to PipeDrive API to fetch data.

## To create a new PipeDrive connector
First, copy Deals or Pipelines connector.

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
  
  // all fetchable fields
  
  return fields;
}
```
3. Handle each data row
```javascript
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
