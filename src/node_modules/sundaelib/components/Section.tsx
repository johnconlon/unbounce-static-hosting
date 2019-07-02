import { h, ComponentChildren } from "preact";
import "./Section.css";

export interface Props {
  children: ComponentChildren;
  block?: boolean;
}

export default function Section(props: Props) {
  const classNames = props.block ? "Section Section--block" : "Section";
  return <div class={classNames}>{props.children}</div>;
}
