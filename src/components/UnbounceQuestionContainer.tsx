import { h, ComponentChildren } from "preact";

import LayoutColumn from "sundaelib/components/LayoutColumn";
import Section from "sundaelib/components/Section";
import QuestionForm from "sundaelib/components/QuestionForm";

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
