import { h, Component, ComponentChildren } from "preact";
import "./PageHeader.css";

export interface Props {
  children: ComponentChildren;
}

export default function PageHeader(props: Props) {
  return <div class="PageHeader">{props.children}</div>;
}
