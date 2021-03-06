require("es6-promise").polyfill();
import { ready, getUrlParameter, getUrlParams } from "dom-utils";
import STATES from "us-states";

import "./main.css";

// Google maps initMap function
declare global {
  interface Window {
    initMap: Function;
  }
}

interface Place {
  address: string;
  city: string;
  state: string;
  zipcode: string;
  lat: number;
  lng: number;
}

type LatLng = google.maps.LatLng | google.maps.LatLngLiteral;

const addressRegex = /([^,]*), ([^,]*), ([A-Z]{2}) ([0-9]*)/;

const confirmButtonId = "#lp-pom-button-258";

// Catch the "Yes" button clicks and translate them into unbounce form
// submissions.
lp.jQuery(document).ready(($: JQueryStatic) => {
  const $confirmButton = $(confirmButtonId);
  const $form = $("form");
  $confirmButton.click(function(event: JQuery.Event) {
    event.preventDefault();
    // Unbounce breaks if you call `submit` directly on a form element. Must
    // wrap it in jquery first :shrugging-man:
    $form.submit();
  });
});

// Google maps requires the init function is set on the window
// We may not have the lat/lng....
window.initMap = () => ready(initMap);
async function initMap() {
  // Use lat as a flag to know if we have the full place from the previous
  // form.
  const hasPlaceData = !!getUrlParameter("lat");
  // Use the raw address to know if we have *anything* from the previous
  // form. Not having this would be an exceptional case.
  const rawAddress = getUrlParameter("autocomplete_address");

  const map = renderMap();

  if (hasPlaceData) {
    const place = parsePlaceFromQueryParams();
    setPlace(map, place);
  } else if (rawAddress) {
    const place = await findPlace(map, rawAddress);
    setPlace(map, place);
  } else {
    console.error("No address information available.");
    //redirectToManualEntry()
  }
}

const parsePlaceFromQueryParams = (): Place => ({
  address: getUrlParameter("address"),
  city: getUrlParameter("city"),
  state: getUrlParameter("state"),
  zipcode: getUrlParameter("zip_code"),
  lat: +getUrlParameter("lat"),
  lng: +getUrlParameter("lng")
});

const formatAddress = (place: Place) =>
  `${place.address}, ${place.city}, ${place.state} ${place.zipcode}`;

const renderMap = () =>
  new google.maps.Map(document.getElementById("address-map"), {
    zoom: 15,
    disableDefaultUI: true,
    gestureHandling: "none"
  });

const setPlace = (map: google.maps.Map, place: Place) => {
  setMapPosition(map, { lat: place.lat, lng: place.lng });
  setAddressLabel(place);
  fillForm(place, (key: string) => (key === "zipcode" ? "zip_code" : key));
};

const setAddressLabel = (place: Place) => {
  const label = document.getElementById("address-label");
  if (!label) {
    console.warn("Can't find the #address-label element");
    return;
  }
  label.innerHTML = formatAddress(place);
};

const setMapPosition = (map: google.maps.Map, center: LatLng) => {
  // TODO: clear markers (but unnecessary here)
  map.setCenter(center);
  new google.maps.Marker({ position: center, map: map });
};

async function findPlace(map: google.maps.Map, query: string): Promise<Place> {
  return new Promise((resolve, reject) => {
    const request = {
      query,
      fields: ["formatted_address", "geometry", "place_id"]
    };
    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        throw new Error(`Google maps api error: ${status}`);
      }

      const result = results[0];
      if (!result || !result.formatted_address) {
        throw new Error("No search results with address.");
      }

      const addressParts = addressRegex.exec(result.formatted_address);
      if (!addressParts || addressParts.length !== 5) {
        throw new Error("Unknown address format.");
      }

      const stateVal = addressParts[3];
      const place = {
        address: addressParts[1],
        city: addressParts[2],
        state: STATES[stateVal] ? STATES[stateVal] : stateVal,
        zipcode: addressParts[4],
        lat: result.geometry!.location.lat(), // TODO: don't assume geometry exists
        lng: result.geometry!.location.lng()
      };
      resolve(place);
    });
  });
}

function fillForm(data: Object, fieldMapping?: Function) {
  Object.entries(data).forEach(([key, value]) => {
    const fieldId = fieldMapping ? fieldMapping(key) : key;
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (!field) {
      throw new Error(
        `Cannot fill field ${fieldId} for key ${key}. Field doesn't exist.`
      );
    }
    field.value = value;
  });
}
