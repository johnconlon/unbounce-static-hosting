$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

$( document ).ready(async () => {
  const $iframe = $('#iframe');
  const $field = $('#pageUrlField');

  $iframe.css('height', $(window).outerHeight());

  // Request the page URL if not provided in the URL param
  const pageToLoad = $.urlParam('page');
  if (pageToLoad) {
    // Strip out the hostname
    const url = new URL(pageToLoad);
    const pathToLoad = pageToLoad.replace(url.origin, '');
    $iframe.attr('src', pathToLoad);
    $field.hide();
  } else {
    $iframe.hide();
    $field.show();
  }

  $field.one('keyup', () => {
    const url = $field.val();
    location.href = `/?page=${url}`;
  });

})