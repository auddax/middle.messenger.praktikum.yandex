import Block from 'src/core/Block';
import { router } from 'src/router';
import template from './ProfileEditPasswordPage.hbs?raw';

class ProfileEditPasswordPage extends Block {
  constructor() {
    super({
      goProfilePage: () => router.go('/settings'),
    });
  }

  protected render() {
    return template;
  }
}

export { ProfileEditPasswordPage };
