import { h, Component } from "preact";
import Question from "../Question";
import "./ConditionQuestion.css";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export default function ListingQuestion(props: Props) {
  const name = 'scope_of_work';
  const label = 'Sundae buys houses that need some love (repairs and renovations). Which of the following best describes the current condition of your property?  (Choose one)';
  
  const options = [{
    value: "Low",
    description: "Recently updated",
    photo_urls: [
      ]
  }, {
    value: "Medium",
    description: "No recent updates",
    photo_urls: [
      ]
  }, {
    value: "High",
    description: "Never updated or needs repairs",
    photo_urls: [
      ]
  }];
    //   <RadioQuestion
    //   name="scope_of_work"
    //   label="Sundae buys houses that need some love (repairs and renovations). Which of the following best describes the current condition of your property?  (Choose one)"
    //   options={OPTIONS}
    //   onChange={props.onChange}
    //   required
    // />
  
  return (
    <Question label={label}>
      {options.map(obj => (
        <div class="RadioQuestion-radio">
          <input
            type="radio"
            name={name}
            value={obj.value}
            id={`${name}-${obj.value}`}
            required={true}
          />
          <label for={`${name}-${obj.value}`}>
            <img src="https://sundae.com/wp-content/uploads/2019/02/landing@2x.png" />
            {obj.description}
          </label>
        </div>
      ))}
    </Question>

  );
}