import { h, Component } from "preact";
import StepPage from "../../components/StepPage";
import QuestionForm from "../../components/QuestionForm";
import TimelineQuestion from "./TimelineQuestion";

export interface Props {
  onSubmit: Function;
}

export default class Test extends Component<Props> {
  onChange = (e: Event) => {
    console.log(e);
  };

  render(props: Props) {
    return (
      <StepPage>
        <QuestionForm onSubmit={props.onSubmit}>
          <TimelineQuestion onChange={this.onChange} />
        </QuestionForm>
      </StepPage>
    );
  }
}
