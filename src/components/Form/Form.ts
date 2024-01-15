import Block from 'src/core/Block';
import template from './Form.hbs?raw';

type FormProps = {
  formClassName: string;
  formId: string;
  onSubmit?: () => void;
}

class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Form };
