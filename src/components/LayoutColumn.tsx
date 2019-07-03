import { h, Component, ComponentChildren } from "preact";
import "./LayoutColumn.css";

export interface Props {
  children: ComponentChildren;
}

export default function LayoutColumn(props: Props) {
  return <div class="LayoutColumn">{props.children}</div>;
}
