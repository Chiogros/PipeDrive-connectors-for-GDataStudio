var cc = DataStudioApp.createCommunityConnector();

function getFields(request) {
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
