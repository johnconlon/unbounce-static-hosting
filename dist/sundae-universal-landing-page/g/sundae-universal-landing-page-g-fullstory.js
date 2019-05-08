// Tell FullStory the user's name once they enter something
function bindSetFullStoryVars() {
    $('input[name*="_name"]').live('change', function() {
      const firstName = $('#first_name').val();
      const lastName  = $('#last_name').val();
      if (typeof FS != "undefined") {
        FS.setUserVars({
          displayName: `${firstName} ${lastName}`,
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
  
  lp.jQuery(document).ready(function($) {
    bindSetFullStoryVars();
  });