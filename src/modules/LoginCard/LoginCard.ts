import Block from 'src/core/Block';
import template from './LoginCard.hbs?raw';

const loginInputs = [
  {
    htmlType: 'text', type: 'text', label: 'Логин', id: 'loginCardLogin', name: 'login',
  },
  {
    htmlType: 'text', type: 'text', label: 'Пароль', id: 'loginCardPassword', name: 'password',
  },
];

class LoginCard extends Block {
  constructor() {
    super({ loginInputs });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { LoginCard };
