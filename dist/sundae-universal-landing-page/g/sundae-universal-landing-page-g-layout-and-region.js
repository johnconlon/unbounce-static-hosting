var QUALIFIED_LEAD_THANK_YOU_PAGE = 'https://sundae.com/thank-you/';
var NON_QUALIFIED_LEAD_THANK_YOU_PAGE = 'https://sundae.com/thank-you-nql/';

// Direct the user to a different page depending on whether their zip is in region or not
// We'll use the thank-you page with the FB "Lead" tracking event if the zip is in region
// otherwise they go to a different thank-you page without the lead tracking event.
function bindFormRedirectOnSubmit() {
  $('input[name="zip_code"]').live('change', function() {
    var enteredZip = $(this).val().trim();
    var isInRegion = zipsInRegion.indexOf(parseInt(enteredZip)) > -1;
    if (isInRegion) {
      window.module.lp.form.data.url = QUALIFIED_LEAD_THANK_YOU_PAGE;
    } else {
      window.module.lp.form.data.url = NON_QUALIFIED_LEAD_THANK_YOU_PAGE;
    }
    $('.lp-pom-form [name="in_region"]').val(isInRegion);
  });
}

// Setup tabindex ordering for desktop by field ID
var desktopFieldOrdering = [
  'address',
  'city',
  'state',
  'zip_code',
  'first_name',
  'last_name',
  'phone_number',
  'email',
  'lp-pom-button-168'
];
desktopFieldOrdering.forEach((fieldId, i) => {
  $("[id=" + fieldId + "]").attr('tabindex', i + 1);
});

// These IDs reflect the placeholder ID number
// We iterate thru the fields in their native order according to the unbounce editor
// The JS will move the corresponding field to the corresponding place holder in sequence
// To change, just update the box numbers (the comments are in the native order of the form)
var boxes = [
    239, // address placeholder
    242, // first name placeholder
    240, // city
    243, // last name
    238, // state
    244, // phone
    241, // zip
    245, // email
  ].map(id => "#lp-pom-box-"+id);

function setFlexibleFormFieldSize() {
  if ($(window).width() > 600) {
    // Reset positioning if we resize above breakpoint
    $('.lp-pom-form .lp-pom-form-field').each(function(i, field) {
      field.style = '';
    });

  } else {
    // Move form fields to unbounce box targets for mobile
    $('.lp-pom-form .lp-pom-form-field').each(function(i, field) {
      $(field).offset($(boxes[i]).offset());
      $(this).children().outerWidth($(boxes[i]).outerWidth());
      $(this).children().outerHeight($(boxes[i]).outerHeight());
      // Hide box
      $(boxes[i]).css('zIndex', -1);
      $(boxes[i]).css('visibility', 'hidden');
    });
  }
};

// smooth scrolling
lp.jQuery(function($) {
  // The speed of the scroll in milliseconds
  var speed = 400;

  // Find links that are #anchors and scroll to them
  $('a[href^=#]')
    .not('.lp-pom-form .lp-pom-button')
    .unbind('click.smoothScroll')
    .bind('click.smoothScroll', function(event) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: $( $(this).attr('href') ).offset().top }, speed);
    });
});

lp.jQuery(document).ready(function($) {
  setFlexibleFormFieldSize();
  bindFormRedirectOnSubmit();
});
window.addEventListener("resize", setFlexibleFormFieldSize);