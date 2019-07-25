import "promise-polyfill/dist/polyfill";
import * as Unbounce from "unbounce";
import { render, h } from "preact";

import UnbounceQuestionContainer from "../../components/UnbounceQuestionContainer"
import ConditionQuestion from "../../components/msow/ConditionQuestion";
import StepPage from "../../components/StepPage";
import QuestionForm from "../../components/QuestionForm";

import "normalize.css";
import "sundaelib/css/reset.css";
import "sundaelib/css/theme.css";

if (Unbounce.isUnbounce()) {
  Unbounce.init(
    "dynamic-root",
    (container: Element, unbounceForm: Unbounce.UnbounceForm) => {
      render(
        <Unbounce.UnbounceAdapter form={unbounceForm}>
          {(submit: JSX.EventHandler<Event>) => {
            return (
              <UnbounceQuestionContainer onSubmit={submit}>
                <ConditionQuestion />
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
          <ConditionQuestion />
        </QuestionForm>
      </StepPage>,
      document.body
  )
}