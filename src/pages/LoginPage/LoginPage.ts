import Block from 'src/core/Block';
import template from './LoginPage.hbs?raw';

class LoginPage extends Block {
  constructor() {
    super({
      className: 'login',
    });
  }

  protected render() {
    return template;
  }
}

export { LoginPage };
