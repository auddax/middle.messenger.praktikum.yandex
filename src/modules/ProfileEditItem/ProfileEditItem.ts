import Block from 'src/core/Block';
import template from './ProfileEditItem.hbs?raw';

class ProfileEditItem extends Block {
  constructor() {
    super()
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileEditItem };
