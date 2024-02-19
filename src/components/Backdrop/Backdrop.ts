import Block from 'src/core/Block';
import template from './Backdrop.hbs?raw';

class Backdrop extends Block {
  protected render() {
    return template;
  }
}

export { Backdrop };
