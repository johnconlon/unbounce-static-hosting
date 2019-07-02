import { h } from "preact";
import RadioQuestion from "../RadioQuestion";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export const LABEL =
  "Was the kitchen or bathroom remodeled in the last 5-7 years?";
export const INPUT_NAME = "condition_remodel";
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
