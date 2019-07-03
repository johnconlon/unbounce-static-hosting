import { h } from "preact";
import "./TextInput.css";

export interface Props {
  [k: string]: any
}

export default function TextInput(props: Props) {
    const { class: propClass, ...inputProps } = props
    const className = propClass ? "TextInput " + propClass : "TextInput"
    return <input class={className} {...inputProps}></input>
}
