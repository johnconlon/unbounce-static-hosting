import { h, Component } from "preact";
import "./Button.css";

export interface Props {
  children: string;
  onClick: JSX.EventHandler<MouseEvent>;
}

export default class Button extends Component<Props> {
  render(props: Props) {
    return (
      <div class="Button" role="button" onClick={props.onClick}>
        {props.children}
      </div>
    );
  }
}
