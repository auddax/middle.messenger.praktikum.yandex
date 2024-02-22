import Block from '../../core/Block';
import Router from '../../core/Router';
import { ROOT_QUERY } from '../../../config';
import template from './NotFoundPage.hbs?raw';

const router = new Router(ROOT_QUERY);

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
