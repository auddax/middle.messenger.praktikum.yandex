import Block from 'src/core/Block';
import template from './Input.hbs?raw';

type InputProps = {
  className: string;
  id: string;
  label: string;
  name: string;
  htmlType: string;
}

class Input extends Block {
  constructor(props: InputProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Input };
