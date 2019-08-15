import { h, Component } from "preact";
import Question from "../Question";
import "./ConditionQuestion.css";

export interface Props {
  onChange?: JSX.EventHandler<Event>;
}

export default function ConditionQuestion(props: Props) {
  const name = 'scope_of_work';
  const label = 'Which of the following best describes the current condition of your property?  (Choose one)';
  
  const options = [{
    value: "Low",
    description: "Recently updated",
    photo_prefix: 'https://sundae-web-assets.s3-us-west-2.amazonaws.com/unbounce/msow-scope-of-work/low'
  }, {
    value: "Medium",
    description: "No recent updates",
    photo_prefix: 'https://sundae-web-assets.s3-us-west-2.amazonaws.com/unbounce/msow-scope-of-work/med'
  }, {
    value: "High",
    description: "Never updated or needs repairs",
    photo_prefix: 'https://sundae-web-assets.s3-us-west-2.amazonaws.com/unbounce/msow-scope-of-work/high'
  }];
  
  return (
    <Question label={label}>
      {options.map(obj => (
        <div class="ConditionQuestion-radio">
          <label class="d-sm-flex" for={`${name}-${obj.value}`}>
            <div class="ConditionQuestion-radioBtn d-inline d-sm-block order-0 align-self-center">
              <input
                type="radio"
                name={name}
                value={obj.value}
                id={`${name}-${obj.value}`}
                required={true}
              />
            </div>
            <div class="d-inline d-sm-block order-sm-2 align-self-center ConditionQuestion-description">
              {obj.description}
            </div>
            <div class="order-sm-1 ConditionQuestion-photoContainer">
              <img class="" src={`${obj.photo_prefix}-1024.jpg`} />
            </div>
          </label>
        </div>
      ))}
    </Question>

  );
}