import { h, Component, ComponentChildren } from "preact";
import "./LayoutColumn.css";

export interface Props {
  children: ComponentChildren;
}

export default class LayoutColumn extends Component<Props> {
  render(props: Props) {
    return <div class="LayoutColumn">{props.children}</div>;
  }
}
