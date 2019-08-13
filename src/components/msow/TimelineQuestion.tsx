import { h } from "preact";
import RadioQuestion from "../RadioQuestion";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export const OPTIONS = {
  "In the next 60 days": "In the next 60 days",
  "2 - 4 months": "2 - 4 months",
  "4 months or more": "4 months or more"
};

export default function TimelineQuestion(props: Props) {
  return (
    <RadioQuestion
      name="timeline"
      label="When would you like to sell and be out of the house? (Choose one)"
      options={OPTIONS}
      onChange={props.onChange}
      required
    />
  );
}
