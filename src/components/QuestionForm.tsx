import { h, Component, ComponentChild } from "preact";
//import { isArray } from "util";

import Button from "./Button";
import LayoutColumn from "./LayoutColumn";
import "./QuestionForm.css";

export interface Props {
  children: ComponentChild | ComponentChild[];
}

export default function QuestionForm(props: Props) {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  return (
    <LayoutColumn>
      <form class="QuestionForm">
        <div class="QuestionForm-questions">
          {children.map((child: ComponentChild) => (
            <div class="QuestionForm-question">{child}</div>
          ))}
        </div>
        <div class="QuestionForm-navigationContainer">
          <div role="button" class="QuestionForm-backButton" onClick={() => {}}>
            &lt; Back
          </div>
          <div class="QuestionForm-forwardButton">
            <Button onClick={() => {}}>Submit</Button>
          </div>
        </div>
      </form>
    </LayoutColumn>
  );
}
