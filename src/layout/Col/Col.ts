import Block from 'src/core/Block';
import template from './Col.hbs?raw';

class Col extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { Col };
