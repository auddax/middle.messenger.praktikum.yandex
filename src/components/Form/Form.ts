import Block from 'src/core/Block';
import template from './Form.hbs?raw';

type FormProps = {
  formClassName: string;
}

class Form extends Block {
  constructor(props: FormProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Form };
