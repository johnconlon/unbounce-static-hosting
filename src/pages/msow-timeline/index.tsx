import "promise-polyfill/dist/polyfill";
import * as Unbounce from "unbounce";
import { render, h } from "preact";

import LayoutColumn from "../../components/LayoutColumn";
import Section from "../../components/Section";
import QuestionForm from "../../components/QuestionForm";
import TimelineQuestion from "./TimelineQuestion";

import "normalize.css";
import "sundaelib/css/reset.css";
import "sundaelib/css/theme.css";

Unbounce.init(
  "dynamic-root",
  (container: Element, unbounceForm: Unbounce.UnbounceForm) => {
    render(
      <Unbounce.UnbounceAdapter form={unbounceForm}>
        {(submit: Function) => {
          return (
            <LayoutColumn>
              <Section block>
                <QuestionForm onSubmit={submit}>
                  <TimelineQuestion />
                </QuestionForm>
              </Section>
            </LayoutColumn>
          );
        }}
      </Unbounce.UnbounceAdapter>,
      container
    );
  }
);
