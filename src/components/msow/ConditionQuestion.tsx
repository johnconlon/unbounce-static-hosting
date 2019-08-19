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
    key: "high",
    value: "High",
    description: "Never updated or needs repairs",
    photo_prefix: 'https://sundae-web-assets.s3-us-west-2.amazonaws.com/unbounce/msow-scope-of-work/high'
  }, {
    key: "med",
    value: "Medium",
    description: "No recent updates",
    photo_prefix: 'https://sundae-web-assets.s3-us-west-2.amazonaws.com/unbounce/msow-scope-of-work/med'
  }, {
    key: "low",
    value: "Low",
    description: "Recently updated",
    photo_prefix: 'https://sundae-web-assets.s3-us-west-2.amazonaws.com/unbounce/msow-scope-of-work/low'
  }];
  
  return (
    <Question label={label}>
      {options.map(obj => (
        <div class="ConditionQuestion-radio">
          <label class="d-flex" for={`${name}-${obj.value}`}>
            <div class="ConditionQuestion-radioBtn align-self-center">
              <input
                type="radio"
                name={name}
                value={obj.value}
                id={`${name}-${obj.value}`}
                required={true}
              />
            </div>
            <div class="ConditionQuestion-photoContainer flex-shrink-0">
              <img class={`ConditionQuestion-photo ConditionQuestion-photo--${obj.key}`} src={`${obj.photo_prefix}-1024.jpg`} />
            </div>
            <div class="align-self-center ConditionQuestion-description">
              {obj.description}
            </div>
          </label>
        </div>
      ))}
    </Question>

  );
}