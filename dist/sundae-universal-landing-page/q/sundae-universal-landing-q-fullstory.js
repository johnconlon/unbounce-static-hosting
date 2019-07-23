(function() {
  // Tell FullStory the user's name once they enter something
  function bindSetFullStoryVars() {
    $(document).on('change', 'input[name*="_name"]', function() {
      var firstName = $('#first_name').val();
      var lastName  = $('#last_name').val();
      if (typeof FS != "undefined") {
        FS.setUserVars({
          displayName: "" + firstName + " " + lastName
         });
      }
    });
  
    // Send page variant to Fullstory
    if (typeof FS != "undefined") {
      FS.setUserVars({
        pageVariant_str:window.ub.page.variantId
      });
    }
  }
    
  $(document).ready(function($) {
    bindSetFullStoryVars();
  });
})();