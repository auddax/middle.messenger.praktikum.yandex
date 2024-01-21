import Block from 'src/core/Block';
import template from './ProfileEditPage.hbs?raw';

class ProfileEditPage extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileEditPage };
