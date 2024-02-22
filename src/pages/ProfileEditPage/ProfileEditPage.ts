import Block from '../../core/Block';
import Router from '../../core/Router';
import { ROOT_QUERY } from '../../../config';
import template from './ProfileEditPage.hbs?raw';

const router = new Router(ROOT_QUERY);

class ProfileEditPage extends Block {
  constructor() {
    super({
      goProfilePage: () => router.go('/settings'),
    });
  }

  protected render() {
    return template;
  }
}

export { ProfileEditPage };
