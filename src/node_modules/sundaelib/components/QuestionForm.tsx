import { h, Component, ComponentChild } from "preact";
import { goBack } from "dom-utils";

import Button from "./Button";
import LayoutColumn from "./LayoutColumn";
import "./QuestionForm.css";

export interface Props {
  onSubmit?: Function;
  children: ComponentChild | ComponentChild[];
  class?: string;
}

export default class QuestionForm extends Component<Props> {
  onSubmit = (event: Event) => {
    this.props.onSubmit && this.props.onSubmit(event)
  }

  render(props: Props) {
    const children = Array.isArray(props.children)
      ? props.children
      : [props.children];
    const classNames = props.class ? "QuestionForm " + props.class : "QuestionForm"
    return (
      <LayoutColumn>
        <form class={classNames} onSubmit={this.onSubmit}>
          <div class="QuestionForm-questions">
            {children.map((child: ComponentChild) => (
              <div class="QuestionForm-question">{child}</div>
            ))}
          </div>
          <div class="QuestionForm-navigationContainer">
            <div
              role="button"
              class="QuestionForm-backButton"
              onClick={goBack}
            >
              &lt; Back
            </div>
            <div class="QuestionForm-forwardButton">
              <Button>Submit</Button>
            </div>
          </div>
        </form>
      </LayoutColumn>
    );
  }
}
