import Block from 'src/core/Block';
import { router } from 'src/router';
import template from './NotFoundPage.hbs?raw';

class NotFoundPage extends Block {
  constructor() {
    super({
      goBack: () => router.back(),
    });
  }

  protected render() {
    return template;
  }
}

export { NotFoundPage };
