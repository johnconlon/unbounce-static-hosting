(function() {
const MSOW_FIRST_PAGE = 'http://sundae.com/get-offer/details/timeline/';

// Ensure the referrer field is fewer than 255 characters to not break a backend
// integration.
function trimReferrer(args) {
  var referrerInput = args.formElement.querySelector("#referrer");
  var withoutQueryParams = referrerInput.value.split("?")[0];
  referrerInput.value = withoutQueryParams;
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
  window.module.lp.form.data.url = MSOW_FIRST_PAGE;
  window.ub.hooks.beforeFormSubmit.push(trimReferrer)
});
})()