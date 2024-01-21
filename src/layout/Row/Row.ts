import Block from 'src/core/Block';
import template from './Row.hbs?raw';

class Row extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { Row };
