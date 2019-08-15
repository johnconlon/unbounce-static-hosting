import "promise-polyfill/dist/polyfill";
import * as Unbounce from "unbounce";
import { render, h } from "preact";

import UnbounceQuestionContainer from "../../components/UnbounceQuestionContainer"
import MLSListingQuestion from "../../components/msow/MLSListingQuestion";
import StepPage from "../../components/StepPage";
import QuestionForm from "../../components/QuestionForm";

import "normalize.css";
import "sundaelib/css/reset.css";
import "sundaelib/css/theme.css";

const QUALIFIED_LEAD_THANK_YOU_PAGE = 'https://sundae.com/thank-you/';
const NON_QUALIFIED_LEAD_THANK_YOU_PAGE = 'https://sundae.com/thank-you-nql/';

function qs(key: string) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
  
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

if (Unbounce.isUnbounce()) {
  console.log(qs('in_region'));
  
  Unbounce.init(
    "dynamic-root",
    (container: Element, unbounceForm: Unbounce.UnbounceForm) => {
      render(
        <Unbounce.UnbounceAdapter form={unbounceForm}>
          {(submit: JSX.EventHandler<Event>) => {
            return (
                  <UnbounceQuestionContainer onSubmit={submit}>
                    <MLSListingQuestion />
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
          <MLSListingQuestion />
        </QuestionForm>
      </StepPage>,
      document.body
  )
}