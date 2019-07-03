import { h } from "preact";
import Question from "./Question";
import "./RadioQuestion.css";

export interface Props {
  label: string;
  name: string;
  options: { [k: string]: string };
  onChange?: JSX.EventHandler<Event>;
  required?: boolean
}

export default function RadioQuestion(props: Props) {
  return (
    <Question label={props.label}>
      {Object.entries(props.options).map(([label, value]) => (
        <div class="RadioQuestion-radio">
          <input
            type="radio"
            name={props.name}
            value={value}
            id={`${props.name}-${value}`}
            onChange={props.onChange}
            required={props.required}
          />
          <label for={`${props.name}-${value}`}>{label}</label>
        </div>
      ))}
    </Question>
  );
}
