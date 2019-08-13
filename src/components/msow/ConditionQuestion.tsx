import { h, Component } from "preact";
import RadioQuestion from "../RadioQuestion";
import "./ConditionQuestion.css";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export const LABEL = "Have you updated or remodeled any of the following in the last 10 years? (check all that apply)";
export const OPTIONS = {
  "Recently updated": "Low",
  "No recent updates": "Medium",
  "Never updated or needs repairs": "High"
};

export default function ListingQuestion(props: Props) {
  return (
    <RadioQuestion
      name="condition"
      label="When would you like to sell and be out of the house? (Choose one)"
      options={OPTIONS}
      onChange={props.onChange}
      required
    />
  );
}