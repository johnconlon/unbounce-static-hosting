import { h } from "preact";
import OtherRadioQuestion from "../OtherRadioQuestion";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export const LABEL = "What is your reason for selling?";
export const INPUT_NAME = "reason";
export const OPTIONS = {
  "I'm relocating/downsizing": "Relocating / downsizing",
  "I inherited the house": "Inherited a house",
  "Financial or other life events": "Financial or other life event",
  "Offloading a rental property": "Offloading a rental property",
  "Just curious / good time to sell": "Just curious / good time to sell",
  "Other": "Other"
};
export const OTHER_PLACEHOLDER = "Why are you selling?"

export default function MLSListingQuestion(props: Props) {
  return (
    <OtherRadioQuestion
      name={INPUT_NAME}
      label={LABEL}
      options={OPTIONS}
      onChange={props.onChange}
      otherPlaceholder={OTHER_PLACEHOLDER}
      required
    />
  );
}
