import { h, Component } from "preact";
import Question from "./Question";
import "./RadioQuestion.css";

export interface Props {
  label: string;
  name: string;
  options: { [k: string]: string };
  onChange: Function;
}

export default class RadioQuestion extends Component<Props> {
  render(props: Props) {
    console.log(props.options);
    return (
      <Question label={props.label}>
        {Object.entries(props.options).map(([key, value]) => (
          <div class="RadioQuestion-radio">
            <input
              type="radio"
              name={props.name}
              value={key}
              id={`${name}-${key}`}
            />
            <label for={`${name}-${key}`}>{value}</label>
          </div>
        ))}
      </Question>
    );
  }
}
