import { h, ComponentChildren } from "preact";
import Page from "./Page";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import LayoutColumn from "./LayoutColumn";
import Section from "./Section";

export interface Props {
  children: ComponentChildren;
}

export default function StepPage(props: Props) {
    return (
      <Page>
        <PageHeader>
          <LayoutColumn>
            <h1>Hello Sundae</h1>
          </LayoutColumn>
        </PageHeader>
        <PageBody>
          <LayoutColumn>
            <Section block>{props.children}</Section>
          </LayoutColumn>
        </PageBody>
      </Page>
    );
}
