import { h, Component, ComponentChildren } from "preact";
import "./PageHeader.css";

export interface Props {
  children: ComponentChildren;
}

export default class PageHeader extends Component<Props> {
  render(props: Props) {
    return <div class="PageHeader">{props.children}</div>;
  }
}
