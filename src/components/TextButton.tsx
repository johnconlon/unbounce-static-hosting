import { h, Component } from "preact";
import "./TextButton.css";

export interface Props {
  children: string;
  onClick: JSX.EventHandler<MouseEvent>;
}

export default class TextButton extends Component<Props> {
  render(props: Props) {
    return (
      <div class="TextButton" role="button" onClick={props.onClick}>
        {props.children}
      </div>
    );
  }
}
