import Block from 'src/core/Block';
import template from './Modal.hbs?raw';

class Modal extends Block {
  protected render() {
    return template;
  }
}

export { Modal };
