import "promise-polyfill/dist/polyfill";
import * as Unbounce from "unbounce";
import { render, h } from "preact";
import * as facebook from "facebook"
import { ready, getUrlParameter } from "dom-utils"

import UnbounceQuestionContainer from "../../components/UnbounceQuestionContainer"
import TimelineQuestion from "../../components/msow/TimelineQuestion";

import "normalize.css";
import "sundaelib/css/reset.css";
import "sundaelib/css/theme.css";

// TODO: formalize this
// Track a conversion if this lead is in region. Detect in region by
// looking at the url parameters.
ready(function() {
  const inRegion = getUrlParameter("in_region")
  if (!inRegion) {
    console.warn("Missing the in_region url parameter")
  } else if (inRegion === "true") {
      facebook.trackConversion()
  }
})


Unbounce.init(
  "dynamic-root",
  (container: Element, unbounceForm: Unbounce.UnbounceForm) => {
    render(
      <Unbounce.UnbounceAdapter form={unbounceForm}>
        {(submit: JSX.EventHandler<Event>) => {
          return (
                <UnbounceQuestionContainer onSubmit={submit}>
                  <TimelineQuestion />
                </UnbounceQuestionContainer>
          );
        }}
      </Unbounce.UnbounceAdapter>,
      container
    );
  }
);
