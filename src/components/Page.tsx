import { h, Component, ComponentChildren } from "preact";
import "./Page.css";

export interface Props {
  children: ComponentChildren;
}

export default class Page extends Component<Props> {
  render(props: Props) {
    return <div class="Page">{props.children}</div>;
  }
}
