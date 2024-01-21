import Block from 'src/core/Block';
import template from './Page.hbs?raw';

class Page extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { Page };
