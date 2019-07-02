require("es6-promise").polyfill();
import * as Unbounce from "unbounce";
import { render, h, ComponentConstructor } from "preact";

import "normalize.css";
import "sundaelib/css/reset.css";
import "sundaelib/css/theme.css";

export default function pageRender(ComponentClass: ComponentConstructor) {
  if (Unbounce.isUnbounce()) {
    Unbounce.init(
      "#dynamic-root",
      (container: Element, unbounceForm: Unbounce.UnbounceForm) => {
        render(
          <Unbounce.UnbounceAdapter form={unbounceForm}>
            {(submit: Function) => {
              return <ComponentClass />;
            }}
          </Unbounce.UnbounceAdapter>,
          container
        );
      }
    );
  } else {
    render(<ComponentClass/>, document.body);
  }
}
