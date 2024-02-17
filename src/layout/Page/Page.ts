import Block from 'src/core/Block';
import template from './Page.hbs?raw';

class Page extends Block {
  protected render() {
    return template;
  }
}

export { Page };
