import Block from 'src/core/Block';
import template from './Button.hbs?raw';

type ButtonProps = {
  type: string;
  page: string;
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Button };
