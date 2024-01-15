import Block from 'src/core/Block';
import template from './LoginCard.hbs?raw';
import { submitHandler } from 'src/utils/handlers';

const inputHandler = () => {
  // const element = event.target as HTMLInputElement;
  // console.log(element.value);
}

const loginInputs = [
  {
    htmlType: 'text', 
    type: 'text', 
    label: 'Логин', 
    id: 'loginCardLogin', 
    name: 'login', 
    inputHandler,
  },
  {
    htmlType: 'password', 
    type: 'text', 
    label: 'Пароль', 
    id: 'loginCardPassword', 
    name: 'password',
    inputHandler,
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
