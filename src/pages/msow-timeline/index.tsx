import "promise-polyfill/dist/polyfill";
import * as Unbounce from "unbounce";
import { render, h } from "preact";
import * as facebook from "facebook"
import { ready, getUrlParameter } from "dom-utils"

import UnbounceQuestionContainer from "../../components/UnbounceQuestionContainer"
import TimelineQuestion from "../../components/msow/TimelineQuestion";
import StepPage from "../../components/StepPage";
import QuestionForm from "../../components/QuestionForm";

import "normalize.css";
import "sundaelib/css/reset.css";
import "sundaelib/css/theme.css";

// TODO: formalize this
// Track a conversion if this lead is in region. Detect in region by
// looking at the url parameters.
ready(function() {
  const inRegion = getUrlParameter("in_region")
  if (!inRegion) {
    console.warn("Facebook Conversion Tracking: Missing the in_region url parameter, won't track as a conversion")
  } else if (inRegion === "true") {
      facebook.trackConversion()
  }
})


if (Unbounce.isUnbounce()) {
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
)
} else {
  const onSubmit = (e: Event) => {
    e.preventDefault();
    console.log("Submitted form!")
    console.log(e.target)
  }
  render(
      <StepPage>
        <QuestionForm onSubmit={onSubmit}>
          <TimelineQuestion />
        </QuestionForm>
      </StepPage>,
      document.body
  )
}
