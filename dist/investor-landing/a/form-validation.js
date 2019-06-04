(function() {
  lp.jQuery(document).ready(function($) {
    var tosInput = $("input[name=terms_and_conditions]")[0]
    setCustomValidity(tosInput, "Please agree to terms in order to join our investor list")
  })

  function setCustomValidity(element, validityMessage) {
    element.oninvalid = function(e) {
      if (!e.target.validity.valid) {
        e.target.setCustomValidity(validityMessage)
      } else {
        e.target.setCustomValidity("");
      }
    }

    element.onchange = function(e) {
      e.target.setCustomValidity("");
    }
  }
})()
