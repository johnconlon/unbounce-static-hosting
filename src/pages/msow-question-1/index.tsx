require("es6-promise").polyfill();
import Test from "../../components/msow/Test";
import * as Unbounce from "unbounce";
import { render, h } from "preact";

import "normalize.css";
import "sundaelib/css/reset.css";
import "sundaelib/css/theme.css";

if (Unbounce.isUnbounce()) {
  Unbounce.init((container: Element, unbounceForm: Unbounce.UnbounceForm) => {
    render(
      <Unbounce.UnbounceAdapter form={unbounceForm}>
        {(submit: Function) => {
          return <Test onSubmit={submit} />;
        }}
      </Unbounce.UnbounceAdapter>,
      container
    );
  });
} else {
  render(<Test onSubmit={() => {}} />, document.body);
}
