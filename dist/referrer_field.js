// If a referrer field exists on the page, populate it with the document.referrer value
lp.jQuery(function($) {
    $('input[name="referrer"]').each(function(i, field) {
        $(field).val(document.referrer);
    });
});