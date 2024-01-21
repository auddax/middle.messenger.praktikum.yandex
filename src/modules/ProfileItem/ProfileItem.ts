import Block from 'src/core/Block';
import template from './ProfileItem.hbs?raw';

class ProfileItem extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileItem };
