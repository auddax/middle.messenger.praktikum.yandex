import Block from 'src/core/Block';
import template from './Modal.hbs?raw';

class Modal extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { Modal };
