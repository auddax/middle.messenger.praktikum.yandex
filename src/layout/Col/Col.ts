import Block from 'src/core/Block';
import template from './Col.hbs?raw';

class Col extends Block {
  protected render() {
    return template;
  }
}

export { Col };
