import Block from 'src/core/Block';
import template from './Row.hbs?raw';

class Row extends Block {
  protected render() {
    return template;
  }
}

export { Row };
