import { h, Component } from "preact";
import Question from "./Question";
import "./RadioQuestion.css";

export interface Props {
  label: string;
  name: string;
  options: { [k: string]: string };
  onChange: JSX.EventHandler<Event>;
}

export default function RadioQuestion(props: Props) {
  console.log(props.options);
  return (
    <Question label={props.label}>
      {Object.entries(props.options).map(([key, value]) => (
        <div class="RadioQuestion-radio">
          <input
            type="radio"
            name={props.name}
            value={value}
            id={`${name}-${value}`}
            onChange={props.onChange}
          />
          <label for={`${name}-${value}`}>{key}</label>
        </div>
      ))}
    </Question>
  );
}
