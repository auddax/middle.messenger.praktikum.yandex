import Block from 'src/core/Block';
import template from './LoginPage.hbs?raw';

class LoginPage extends Block {
  constructor() {
    super({
      className: 'login',
    });
  }

  componentDidMount() {
    console.log('LoginPage mounted');
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { LoginPage };
