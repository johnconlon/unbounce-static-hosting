import { h, Component } from "preact";
import Page from "../Page";
import PageHeader from "../PageHeader";
import PageBody from "../PageBody";
import Section from "../Section";
import QuestionForm from "../QuestionForm";
import RadioQuestion from "../RadioQuestion";
import LayoutColumn from "../LayoutColumn";

export interface Props {
  onSubmit: Function;
}

export default class Test extends Component<Props> {
  onChange = (e: Event) => {
    console.log(e);
  };

  render() {
    const options = {
      yesterday: "Yesterday",
      "1_3": "1-3 months",
      "3_6": "3-6 months",
      "6_12": "6-12 months",
      "12_or_more": "12+ months"
    };

    return (
      <Page>
        <PageHeader>
          <LayoutColumn>
            <h1>Hello Sundae</h1>
          </LayoutColumn>
        </PageHeader>
        <PageBody>
          <LayoutColumn>
            <Section block>
              <QuestionForm>
                <RadioQuestion
                  name="timeline"
                  label="What is your timeline to sell?"
                  options={options}
                  onChange={this.onChange}
                />
              </QuestionForm>
            </Section>
          </LayoutColumn>
        </PageBody>
      </Page>
    );
  }
}
