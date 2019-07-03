// TODO: move this to the unbounce module

declare namespace lp {
  const jQuery: JQueryStatic;
}

declare namespace ub {
  namespace page {
    const variantId: string;
  }
}

interface Window {
  module: any;
  ub: any;
}

type Unbounce = {
  container: HTMLElement;
  form: HTMLFormElement;
};
