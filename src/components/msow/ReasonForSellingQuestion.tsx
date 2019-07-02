import { h } from "preact";
import RadioQuestion from "../RadioQuestion";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export const LABEL = "What is your reason for selling?";
export const INPUT_NAME = "reason";
export const OPTIONS = {
  "I'm relocating/downsizing": "I'm relocating/downsizing",
  "I inherited the house": "I inherited the house",
  "Financial or other life events": "Financial or other life events",
  "Offloading a rental property": "Offloading a rental property",
  "Just curious / good time to sell": "Just curious / good time to sell"
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
