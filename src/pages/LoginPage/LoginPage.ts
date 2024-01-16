import Block from 'src/core/Block';
import template from './LoginPage.hbs?raw';

class LoginPage extends Block {
  constructor() {
    super({
      className: 'login',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { LoginPage };
