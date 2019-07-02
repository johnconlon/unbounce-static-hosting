import { h } from "preact";
import RadioQuestion from "sundaelib/components/RadioQuestion";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export const OPTIONS = {
  Yesterday: "Yesterday",
  "1-3 months": "1-3 months",
  "3-6 months": "3-6 months",
  "6-12 months": "6-12 months",
  "12+ months": "12+ months"
};

export default function TimelineQuestion(props: Props) {
  return (
    <RadioQuestion
      name="timeline"
      label="What is your timeline to sell?"
      options={OPTIONS}
      onChange={props.onChange}
      required
    />
  );
}
