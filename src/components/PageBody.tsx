import { h, Component, ComponentChildren } from "preact";
import "./PageBody.css";

export interface Props {
  children: ComponentChildren;
}

export default function PageBody(props: Props) {
  return <div class="PageBody">{props.children}</div>;
}
