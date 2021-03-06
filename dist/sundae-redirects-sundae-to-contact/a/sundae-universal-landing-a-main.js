(function() {
function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
  
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getForm() {
  return document.querySelector(".lp-pom-form form");
}

function submit(form) {
  const event = document.createEvent('Event')
  event.initEvent('submit', true, true)
  form.dispatchEvent(event)
}

// Use load event to get the form populated by unbounce
$(window).on('load', function (){
  // Generate a GUID that we'll use to identify this lead in Salesforce for step 2 (contact info).
  // We'll use a Zap to locate the newly created lead in order to update it with the contact info in
  // the second page which is a different form altogether.
  // Salesforce also requires that we set a lastname value, so we'll use it as a placeholder too
  
  const guid = uuidv4();
  const guidParts = guid.split('-');
  var zipCode = qs('zip_code');
  var isInRegion = false;
  var $form = $('.lp-pom-form form');
  var params;
  
  $('#unbounce_guid').val(guid);
  
  if (zipCode && isNumber(zipCode)) {
    zipCode = parseInt(zipCode);
    
    isInRegion = zipsInRegion.indexOf(zipCode) > -1;
    
    $('#in_region').val(isInRegion);
    
    params = {
      'lp-form-submit-method': 'ajax',
      'variant': 'a',
      'pageId': $form.find('input[name=pageId]').val()
    };
    
    $.ajax({
      type: 'POST',
      url: 'https://sundae.com/fsg?' + $.param(params),
      data: $form.serialize(), 
      success: function(response) {
        location.replace('https://sundae.com/get-offer/contact-details/?unbounce_guid=' + guid);
      }
    });
  }
});
})();