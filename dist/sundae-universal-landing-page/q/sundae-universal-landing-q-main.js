(function() {
const componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'long_name',
    postal_code: 'short_name'
};
   
jQuery(document).ready(function($) {
    // Generate a GUID that we'll use to identify this lead in Salesforce for step 2 (contact info).
    // We'll use a Zap to locate the newly created lead in order to update it with the contact info in
    // the second page which is a different form altogether.
    // Salesforce also requires that we set a lastname value, so we'll use it as a placeholder too
    const guid = uuidv4();
    const guidParts = guid.split('-');
    $('#unbounce_guid').val(guid);
   
    // Setup autocomplete for any forms on the page
    $('form').each(function(i, form) {
      const addressField = form.autocomplete_address;
      const autocomplete = new google.maps.places.Autocomplete(addressField, {
        types: ['geocode'],
      });
   
      // get address components
      const addresses = {};
   
      autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();

        if (!Array.isArray(place.address_components)) {
          console.warn('place.address_components is not an Array. Will not process autosuggested address.');
          return;
        }
    
        place.address_components.forEach(function(component) {
          const type = component.types[0];
          addresses[type] = component[componentForm[type]] || "";
        });
   
        form.address.value = (addresses.street_number || "") + " " + (addresses.route || "");
        form.city.value = addresses.locality || "";
        form.state.value = addresses.administrative_area_level_1 || "";
        form.zip_code.value = addresses.postal_code || "";
   
        // Record whether the zip is in region
        const isInRegion = zipsInRegion.indexOf(parseInt(form.zip_code.value)) > -1;
        $('#in_region').val(isInRegion);
      });
    });
   });
   
   
   // smooth scrolling
   $(function($) {
    // The speed of the scroll in milliseconds
    var speed = 400;
   
    // Find links that are #anchors and scroll to them
    $('a[href^=\\#]')
      .not('.lp-pom-form .lp-pom-button')
      .unbind('click.smoothScroll')
      .bind('click.smoothScroll', function(event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: $( $(this).attr('href') ).offset().top }, speed);
      });
   });
})()