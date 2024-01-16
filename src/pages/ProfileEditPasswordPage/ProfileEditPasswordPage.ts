import Block from 'src/core/Block';
import template from './ProfileEditPasswordPage.hbs?raw';

class ProfileEditPasswordPage extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileEditPasswordPage };
