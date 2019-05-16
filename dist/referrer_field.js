(function(){
    // If a referrer field exists on the page, populate it with the document.referrer value
    lp.jQuery(function($) {
        // Bail out if the referrer was passed through a URL param.
        // This can happen when the SFDC lead is not generated upfront.
        if (getUrlParameter('referrer')) return;
        $('input[name="referrer"]').each(function(i, field) {
            $(field).val(document.referrer);
        });
    });

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
})();