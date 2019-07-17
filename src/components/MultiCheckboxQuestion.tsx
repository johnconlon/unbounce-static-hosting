import { h, Component } from "preact";
import Question from "./Question";
import "./MultiCheckboxQuestion.css";

export interface Props {
  label: string;
  options: { [k: string]: string };
  onChange?: JSX.EventHandler<Event>;
}

export default class MultiCheckboxQuestion extends Component<Props> {
  render(props: Props) {
    return (
      <Question label={props.label}>
        {Object.entries(props.options).map(([name, checkboxLabel]) => (
          <div class="MultiCheckboxQuestion-checkbox">
            <input
              type="checkbox"
              className="MultiCheckboxQuestion-checkboxInput"
              name={name}
              id={`${name}-id`}
              onChange={props.onChange}
            />
            <label for={`${name}-id`}>{checkboxLabel}</label>
          </div>
        ))}
      </Question>
    );
  }
}
