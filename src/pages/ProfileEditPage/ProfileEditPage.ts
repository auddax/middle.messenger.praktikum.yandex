import Block from 'src/core/Block';
import { router } from 'src/router';
import template from './ProfileEditPage.hbs?raw';

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
