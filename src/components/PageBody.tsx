import { h, Component, ComponentChildren } from "preact";
import "./PageBody.css";

export interface Props {
  children: ComponentChildren;
}

export default class PageBody extends Component<Props> {
  render(props: Props) {
    return <div class="PageBody">{props.children}</div>;
  }
}
