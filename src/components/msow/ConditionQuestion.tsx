import { h, Component } from "preact";
import RadioQuestion from "../RadioQuestion";
import "./ConditionQuestion.css";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export const OPTIONS = {
  "Recently updated": "Low",
  "No recent updates": "Medium",
  "Never updated or needs repairs": "High"
};

export default function ListingQuestion(props: Props) {
  return (
    <RadioQuestion
      name="scope_of_work"
      label="Sundae buys houses that need some love (repairs and renovations). Which of the following best describes the current condition of your property?  (Choose one)"
      options={OPTIONS}
      onChange={props.onChange}
      required
    />
  );
}