import { h, ComponentChildren } from "preact";

import LayoutColumn from "./LayoutColumn";
import Section from "./Section";
import QuestionForm from "./QuestionForm";

export interface Props {
  onSubmit: JSX.EventHandler<Event>;
  children: ComponentChildren;
}

export default function UnbounceQuestionContainer(props: Props) {
  return (
    <LayoutColumn>
      <Section block>
        <QuestionForm onSubmit={props.onSubmit}>{props.children}</QuestionForm>
      </Section>
    </LayoutColumn>
  );
}
