import { h } from "preact";
import RadioQuestion from "sundaelib/components/RadioQuestion";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export const LABEL = "Is your house currently listed with an agent?";
export const INPUT_NAME = "listing";
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
