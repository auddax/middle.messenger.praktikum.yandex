import Block from 'src/core/Block';
import template from './SignupPage.hbs?raw';

class SignupPage extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { SignupPage };
