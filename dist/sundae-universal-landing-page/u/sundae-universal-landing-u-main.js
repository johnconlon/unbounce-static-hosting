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
  var redirectParams;
  
  $('#ublp_variant').val($('.lp-pom-form form input[name=pageVariant]').val());
  $('#unbounce_guid').val(guid);
  
  if (zipCode && isNumber(zipCode)) {
    zipCode = parseInt(zipCode);
  }
    
  isInRegion = zipsInRegion.indexOf(zipCode) > -1;
  
  $('#in_region').val(isInRegion);
  
  params = {
    'lp-form-submit-method': 'ajax',
    'variant': 'u',
    'pageId': $form.find('input[name=pageId]').val()
  };
  
  redirectParams = {
    'unbounce_guid': guid,
    'autocomplete_address': $form.find('input[name=autocomplete_address]').val(),
    'address': $form.find('input[name=address]').val(),
    'city': $form.find('input[name=city]').val(),
    'state': $form.find('input[name=state]').val(),
    'zip_code': $form.find('input[name=zip_code]').val(),
    'address_copy': $form.find('input[name=address]').val(),
    'city_copy': $form.find('input[name=city]').val(),
    'state_copy': $form.find('input[name=state]').val(),
    'zip_code_copy': $form.find('input[name=zip_code]').val(),
    'in_region': $form.find('input[name=in_region]').val(),
    'ublp_variant': $form.find('input[name=ublp_variant]').val()
  };
  
  $.ajax({
    type: 'POST',
    url: '/fsg?' + $.param(params),
    data: $form.serialize(), 
    success: function(response) {
      location.replace('https://sundae.com/get-offer/contact-details/?' + $.param(redirectParams));
    },
    error: function(jqXHR, textStatus, errorThrown) {
      location.replace('https://sundae.com/get-offer-ublp/');
    }
  });
});
})();