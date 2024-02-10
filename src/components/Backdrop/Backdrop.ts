import Block from 'src/core/Block';
import template from './Backdrop.hbs?raw';

class Backdrop extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { Backdrop };
