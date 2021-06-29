function responseToRows(requestedFields, response) {

  // Transform parsed data and filter for requested fields
  var fields = requestedFields.asArray();

  return response.map(function(dataElement) {
    var rows = [];
    
    fields.forEach(function (field) {
      
      switch (field.getId()) {
        case 'Pipelines_id':
          return rows.push(dataElement.id);
        case 'Pipelines_name':
          return rows.push(dataElement.name);
        case 'Pipelines_url_title':
          return rows.push(dataElement.url_title);
        case 'Pipelines_order_nr':
          return rows.push(dataElement.order_nr);
        case 'Pipelines_active':
          return rows.push(dataElement.active);
        case 'Pipelines_deal_probability':
          return rows.push(dataElement.deal_probability);
        case 'Pipelines_add_time':
          return rows.push(dataElement.add_time);
        case 'Pipelines_update_time':
          return rows.push(dataElement.update_time);
        case 'Pipelines_selected':
          return rows.push(dataElement.selected);
        default:
          break;
      }
    });

    return { values: rows };
  });
}
