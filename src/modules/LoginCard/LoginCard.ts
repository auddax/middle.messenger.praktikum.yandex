import Block from 'src/core/Block';
import { submitHandler, focusOutHandler } from 'src/utils/handlers';
import template from './LoginCard.hbs?raw';

const loginInputs = [
  {
    htmlType: 'text',
    type: 'text',
    label: 'Логин',
    id: 'loginCardLogin',
    name: 'login',
    focusOutHandler,
  },
  {
    htmlType: 'password',
    type: 'text',
    label: 'Пароль',
    id: 'loginCardPassword',
    name: 'password',
    focusOutHandler,
  },
];

class LoginCard extends Block {
  constructor() {
    super({
      loginInputs,
      submitHandler: () => submitHandler('loginForm'),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { LoginCard };
