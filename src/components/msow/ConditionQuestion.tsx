import { h, Component } from "preact";
import MultiCheckboxQuestion from "../MultiCheckboxQuestion";
import "./ConditionQuestion.css";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export const LABEL = "Have you updated or remodeled any of the following in the last 10 years? (check all that apply)";
export const OPTIONS = {
  renovated_kitchen: "Kitchen",
  renovated_bathrooms: "Bathrooms",
  renovated_bedrooms: "Bedrooms",
  renovated_roof: "Roof",
  renovated_flooring: "Flooring",
  renovated_paint: "Paint",
  renovated_landscaping: "Landscaping"
};

export default function ListingQuestion(props: Props) {
  return (
    <MultiCheckboxQuestion
      label={LABEL}
      options={OPTIONS}
      onChange={props.onChange}
    />
  );
}