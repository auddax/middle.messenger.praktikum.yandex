import Block from '../../core/Block';
import Router from '../../core/Router';
import { ROOT_QUERY } from '../../../config';
import template from './ProfilePage.hbs?raw';

const router = new Router(ROOT_QUERY);

class ProfilePage extends Block {
  constructor() {
    super({
      goChatPage: () => router.go('/messenger'),
    });
  }

  protected render() {
    return template;
  }
}

export { ProfilePage };
