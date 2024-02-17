import Block from 'src/core/Block';
import template from './Button.hbs?raw';

type ButtonProps = {
  type: string;
  page?: string;
  buttonId?: string;
  onClick?: () => void;
};

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render() {
    return template;
  }
}

export { Button };
