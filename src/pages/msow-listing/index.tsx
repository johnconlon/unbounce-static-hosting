import "promise-polyfill/dist/polyfill";
import * as Unbounce from "unbounce";
import { render, h } from "preact";

import UnbounceQuestionContainer from "../../components/UnbounceQuestionContainer"
import MLSListingQuestion from "../../components/msow/MLSListingQuestion";

import "normalize.css";
import "sundaelib/css/reset.css";
import "sundaelib/css/theme.css";

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
);
