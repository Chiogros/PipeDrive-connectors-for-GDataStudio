var cc = DataStudioApp.createCommunityConnector();

function getFields(request) {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  fields.newDimension()
    .setId('Pipelines_id')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Pipelines_name')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Pipelines_url_title')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Pipelines_order_nr')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('Pipelines_active')
    .setType(types.BOOLEAN);

  fields.newDimension()
    .setId('Pipelines_deal_probability')
    .setType(types.BOOLEAN);

  fields.newDimension()
    .setId('Pipelines_add_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Pipelines_update_time')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('Pipelines_selected')
    .setType(types.BOOLEAN);

  return fields;
}
