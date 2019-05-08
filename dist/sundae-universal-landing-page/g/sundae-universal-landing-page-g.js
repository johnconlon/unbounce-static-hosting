(function(){
    /* Floating CTA */
    // TODO:
    // requestAnimationFrame polyfill
    // Can we use css intead of manually fixing styles here?
  
    // ID of the sticky bar trigger element (include the "#" e.g. "#my-element").
    // When the user scrolls past this element the sticky bar will appear.
    // When the user scrolls before this element the sticky bar will disapppear.
    var triggerElementId = "#lp-pom-block-65";
    
    // ID of the floating box and button to show/hide.
    var floatingCtaId = "#lp-pom-button-252"
    var floatingBarId = "#lp-pom-box-251"
    
    lp.jQuery(document).ready(function($) {
        var isShowingFloatingCta = false;
        var $triggerElement = $(triggerElementId);
        var triggerScrollTop = $triggerElement.offset().top + ($triggerElement.height() / 2);
        var $floatingCta = $(floatingCtaId);
        var $floatingBar = $(floatingBarId)
        
        // Dealing with unbounce styling...everything is positioned absolute and its
        // not possible to set a percentage width on the containing box from the
        // ui builder. We might be able to do this in css, but putting here for now
        // (also keeps everything floating-cta related here).
        $floatingBar.css("position", "fixed");
        $floatingBar.css("display", "none");
        $floatingBar.css("top", "unset");
        $floatingBar.css("bottom", "0px");
        $floatingBar.css("width", "100%");
        $floatingCta.css("left", "50%");
        $floatingCta.css("margin-left", "-75px");
         
        var $doc = $(document)
        
        $doc.scroll(throttle(function() {
            var shouldShowFloatingCta = $doc.scrollTop() > triggerScrollTop;
            if (shouldShowFloatingCta && !isShowingFloatingCta) {
              showFloatingCta();
            } else if (!shouldShowFloatingCta && isShowingFloatingCta) {
              hideFloatingCta();
            }
        }, 50))
      
        function showFloatingCta() {
            $floatingBar.fadeIn();
          isShowingFloatingCta = true;
        }
        
        function hideFloatingCta() {
            $floatingBar.fadeOut();
          isShowingFloatingCta = false;
        }
    });
    
    // Utility functions
    function throttle(fn, wait) {
      var previous = 0;
      return function() {
        var now = +(new Date());
        if ((now - wait) > previous) {
          previous = now;
          fn();
        }
      }
    }
  })()