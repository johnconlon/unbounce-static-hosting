import { h, Component } from "preact";
import "./Button.css";

export interface Props {
  children: string
  onClick?: JSX.EventHandler<MouseEvent>
  type?: string
}

export default function Button(props: Props) {
  return (
    <button type={props.type} class="Button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}
