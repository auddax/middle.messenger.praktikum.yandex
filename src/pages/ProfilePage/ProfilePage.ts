import Block from 'src/core/Block';
import { router } from 'src/router';
import template from './ProfilePage.hbs?raw';

class ProfilePage extends Block {
  constructor() {
    super({
      goChatPage: () => router.go('/messenger'),
    });
  }

  componentDidMount() {
    console.log('mounted Profile page');
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfilePage };
