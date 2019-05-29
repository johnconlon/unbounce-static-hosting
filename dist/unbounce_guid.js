(function() {
  // Generate a UUID that we'll use to identify this lead in Salesforce. Useful in
  // multi-step flows for updating existing leads.
  lp.jQuery(document).ready(function($) {
    var guid = uuidv4();
    $("#unbounce_guid").val(guid);
  });
})();
