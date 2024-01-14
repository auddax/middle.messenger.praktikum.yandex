import Block from 'src/core/Block';
import template from './ProfilePage.hbs?raw';

class ProfilePage extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export  { ProfilePage };
