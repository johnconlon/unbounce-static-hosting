import { h, Component } from "preact";
import "./Button.css";

export interface Props {
  children: string;
  onClick: JSX.EventHandler<MouseEvent>;
}

export default function Button(props: Props) {
  return (
    <div class="Button" role="button" onClick={props.onClick}>
      {props.children}
    </div>
  );
}
