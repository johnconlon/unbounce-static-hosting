(function() {
const QUALIFIED_LEAD_THANK_YOU_PAGE = 'https://sundae.com/thank-you/';
const NON_QUALIFIED_LEAD_THANK_YOU_PAGE = 'https://sundae.com/thank-you-nql/';

// Direct the user to a different page depending on whether their zip is in region or not
// We'll use the thank-you page with the FB "Lead" tracking event if the zip is in region
// otherwise they go to a different thank-you page without the lead tracking event.
function bindFormRedirectOnSubmit() {
  $('input').live('change', function () {
    const enteredZip = $('form').get(0).zip_code.value.trim();
    const isInRegion = zipsInRegion.indexOf(parseInt(enteredZip)) > -1;
    if (isInRegion) {
      window.module.lp.form.data.url = QUALIFIED_LEAD_THANK_YOU_PAGE;
    } else {
      window.module.lp.form.data.url = NON_QUALIFIED_LEAD_THANK_YOU_PAGE;
    }
    $('.lp-pom-form [name="in_region"]').val(isInRegion);
  });
}

// smooth scrolling
lp.jQuery(function ($) {
  // The speed of the scroll in milliseconds
  var speed = 400;

  // Find links that are #anchors and scroll to them
  $('a[href^=#]')
    .not('.lp-pom-form .lp-pom-button')
    .unbind('click.smoothScroll')
    .bind('click.smoothScroll', function (event) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, speed);
    });
});

lp.jQuery(document).ready(function ($) {
  bindFormRedirectOnSubmit();
});
})()