import Block from 'src/core/Block';
import template from './ProfileItem.hbs?raw';

class ProfileItem extends Block {
  protected render() {
    return template;
  }
}

export { ProfileItem };
