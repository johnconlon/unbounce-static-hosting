import { h, Component, ComponentChildren } from "preact";
import "./Section.css";

export interface Props {
  children: ComponentChildren;
  block?: boolean;
}

export default class Section extends Component<Props> {
  render(props: Props) {
    const classNames = props.block ? "Section Section--block" : "Section";
    return <div class={classNames}>{props.children}</div>;
  }
}
