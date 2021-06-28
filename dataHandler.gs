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
