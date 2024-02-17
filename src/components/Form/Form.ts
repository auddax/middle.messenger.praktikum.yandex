import Block from 'src/core/Block';
import template from './Form.hbs?raw';

type FormProps = {
  formClassName: string;
  formId: string;
  onSubmit?: () => void;
  onChange?: () => void;
};

class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit,
        change: props.onChange,
      },
    });
  }

  protected render() {
    return template;
  }
}

export { Form };
