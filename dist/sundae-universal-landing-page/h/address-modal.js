(function() {
  var pageInputId = "#autocomplete_address";
  var modalId = "#address_modal";
  var modalInputId = "#address_modal_input";

  lp.jQuery(document).ready(function($) {
    // Hack
    var viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth >= 600) {
      return;
    }

    var autocompleteService = new google.maps.places.AutocompleteService();
    var placesService = new google.maps.places.PlacesService(
      document.getElementById("attribution_container"),
    );
    var sessionToken = null; //hack

    // Reference to main page input
    var $pageInput = $(pageInputId);
    var $modal = $(modalId);
    var $modalInput = $(modalInputId);
    var $modalCancel = $modal.find(".AddressModal-cancel");
    var $modalResultsList = $modal.find("ul");
    var $body = $("body");
    var form = $("form")[0];

    // re-parent the address modal
    $body.append($modal);
    addEventListeners();

    function addEventListeners() {
      $pageInput.focus(onFocusPageInput);
      $modalCancel.click(onTapCancel);
    }

    function onFocusPageInput() {
      show();
    }

    function onKeydownModalInput(event) {
      var query = event.target.value;

      // Don't do anything on enter.
      if (event.keyCode === 13) {
        return;
      }

      query ? getResults(query) : clearResults();
    }

    function onTapResult(result) {
      return function(event) {
        getPlaceDetails(result.place_id);
        form.autocomplete_address.value = result.description;
      };
    }

    function getPlaceDetails(placeId) {
      var request = {
        placeId: placeId,
        fields: ["address_components"],
        sessionToken: sessionToken,
      };
      placesService.getDetails(request, onPlaceDetails);
    }

    function onPlaceDetails(place, status) {
      sessionToken = null;
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        // TODO: handle error case
        return;
      }

      fillUnbounceForm(place);
      form.submit();
      hide();
    }

    var componentForm = {
      street_number: "short_name",
      route: "long_name",
      locality: "long_name",
      administrative_area_level_1: "long_name",
      country: "long_name",
      postal_code: "short_name",
    };
    function fillUnbounceForm(place) {
      console.log(place);
      var addressComponents = {};
      place.address_components.forEach(function(component) {
        const type = component.types[0];
        addressComponents[type] = component[componentForm[type]] || "";
      });

      form.address.value =
        (addressComponents.street_number || "") +
        " " +
        (addressComponents.route || "");
      form.city.value = addressComponents.locality || "";
      form.state.value = addressComponents.administrative_area_level_1 || "";
      form.zip_code.value = addressComponents.postal_code || "";

      // Record whether the zip is in region
      const isInRegion =
        zipsInRegion.indexOf(parseInt(form.zip_code.value)) > -1;
      $("#in_region").val(isInRegion);
    }

    function onTapCancel() {
      // TODO: clear results
      hide();
    }

    function getResults(query) {
      if (!query || !sessionToken) return;
      autocompleteService.getPlacePredictions(
        {
          input: query,
          types: ["geocode"],
          sessionToken: sessionToken,
        },
        onResults,
      );
    }

    function onResults(results, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        // TODO: handle error case
        return;
      }

      renderResults(results);
    }

    function renderResults(results) {
      var fragment = document.createDocumentFragment();
      results.forEach(function(result) {
        var li = document.createElement("li");
        li.className += "AddressModal-result";
        li.innerHTML = result.description;
        li.addEventListener("click", onTapResult(result));
        fragment.appendChild(li);
      });
      clearResults();
      $modalResultsList.append(fragment);
    }

    function clearResults() {
      $modalResultsList.empty();
    }

    function show() {
      // refresh token
      sessionToken = new google.maps.places.AutocompleteSessionToken();
      $modalInput.keydown(onKeydownModalInput);
      $modal.hide();
      $modal.removeClass("no-display");
      $modal.fadeIn(200);
      $modalInput.focus();
    }

    function hide() {
      $modalInput.unbind("keydown");
      $modal.fadeOut(function() {
        $modal.addClass("no-display");
      });
    }
  });
})();
