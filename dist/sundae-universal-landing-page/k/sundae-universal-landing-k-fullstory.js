;(function() {
  // Tell FullStory the user's name once they enter something
  function bindSetFullStoryVars() {
    // Send page variant to Fullstory
    if (typeof FS != "undefined") {
      FS.setUserVars({
        pageVariant_str: window.ub.page.variantId,
      })
    }
  }

  lp.jQuery(document).ready(function($) {
    bindSetFullStoryVars()
  })
})()
