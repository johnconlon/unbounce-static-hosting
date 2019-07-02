import { h } from "preact";
import RadioQuestion from "sundaelib/components/RadioQuestion";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export const LABEL = "Was the roof replaced in the last 10-12 years?";
export const INPUT_NAME = "condition_roof";
export const OPTIONS = {
  Yes: "Yes",
  No: "No"
};

export default function MLSListingQuestion(props: Props) {
  return (
    <RadioQuestion
      name={INPUT_NAME}
      label={LABEL}
      options={OPTIONS}
      onChange={props.onChange}
      required
    />
  );
}
