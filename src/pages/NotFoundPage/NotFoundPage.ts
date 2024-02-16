import Block from 'src/core/Block';
import { router } from 'src/router';
import template from './NotFoundPage.hbs?raw';

class NotFoundPage extends Block {
  constructor() {
    super({
      goBack: () => router.back(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { NotFoundPage };
