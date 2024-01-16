import Block from 'src/core/Block';
import template from './ErrorPage.hbs?raw';

class ErrorPage extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ErrorPage };
