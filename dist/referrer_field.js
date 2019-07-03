(function() {
  // If a referrer field exists on the page, populate it with the document.referrer value
  ready(function() {
    // Bail out if the referrer was passed through a URL param.
    // This can happen when the SFDC lead is not generated upfront.
    if (getUrlParameter("referrer")) return;
    var fields = document.querySelectorAll('input[name="referrer"]');
    Array.prototype.forEach.call(fields, function(field) {
      field.value = document.referrer;
    });
  });

  function ready(fn) {
    if (
      document.attachEvent
        ? document.readyState === "complete"
        : document.readyState !== "loading"
    ) {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
  }
})();
