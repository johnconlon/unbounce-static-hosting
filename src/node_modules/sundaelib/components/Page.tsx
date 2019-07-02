import { h, Component, ComponentChildren } from "preact";
import "./Page.css";

export interface Props {
  children: ComponentChildren;
}

export default function Page(props: Props) {
  return <div class="Page">{props.children}</div>;
}
