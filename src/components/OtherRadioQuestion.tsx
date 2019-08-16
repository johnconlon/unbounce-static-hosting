import { h, Component } from "preact";
import RadioQuestion, { Props as RadioQuestionProps } from "./RadioQuestion";
import TextInput from "./TextInput";
import "./OtherRadioQuestion.css";

export interface Props extends RadioQuestionProps {
  otherPlaceholder: string;
}

interface State {
  showingOtherField: boolean;
}

export function otherFieldName(fieldName: string) {
  return `${fieldName}_other_notes`;
}

export default class OtherRadioQuestion extends Component<Props, State> {
  state = {
    showingOtherField: false
  };

  onChange = (e: Event) => {
    // TODO: proper typing
    if (e.target && (e.target as any).value === "Other") {
      this.setState({ showingOtherField: true });
    } else {
      this.setState({ showingOtherField: false });
    }
    this.props.onChange && this.props.onChange(e);
  };

  render(props: Props, state: State) {
    const { onChange, ...radioQuestionProps } = props;
    const classNames = this.state.showingOtherField
      ? "OtherRadioQuestion-otherField"
      : "OtherRadioQuestion-otherField u-hidden";
    return (
      <div class="OtherRadioQuestion">
        <RadioQuestion {...radioQuestionProps} onChange={this.onChange} />
        <div class={classNames}>
          <TextInput
            name={otherFieldName(props.name)}
            placeholder={props.otherPlaceholder}
            class="OtherRadioQuestion-otherInput"
            required={false}
          />
        </div>
      </div>
    );
  }
}
