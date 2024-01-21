import Block from 'src/core/Block';
import template from './NotFoundPage.hbs?raw';

class NotFoundPage extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { NotFoundPage };
