import Block from 'src/core/Block';
import template from './Input.hbs?raw';

type InputProps = {
  className: string;
  id: string;
  label: string;
  name: string;
  htmlType: string;
  onInput?: () => void;
  onFocusOut?: () => void;
}

class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        input: props.onInput,
        focusout: props.onFocusOut,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Input };
