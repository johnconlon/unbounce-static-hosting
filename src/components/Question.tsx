import { h, Component, ComponentChildren } from "preact";
import "./Question.css";

export interface Props {
  label: string;
  children: ComponentChildren;
}

export default class Question extends Component<Props> {
  render(props: Props) {
    return (
      <div class="Question">
        <div class="Question-label">{props.label}</div>
        <div class="Question-input">{props.children}</div>
      </div>
    );
  }
}
