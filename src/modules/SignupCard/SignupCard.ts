import Block from 'src/core/Block';
import template from './SignupCard.hbs?raw';
import { submitHandler, focusOutHandler, } from 'src/utils/handlers';

const signupInputs = [
  {
    htmlType: 'text', 
    type: 'text', 
    label: 'Почта', 
    id: 'signupCardMail', 
    name: 'email', 
    focusOutHandler,
  },
  {
    htmlType: 'text', 
    type: 'text', 
    label: 'Логин', 
    id: 'signupCardLogin', 
    name: 'login', 
    focusOutHandler,
  },
  {
    htmlType: 'text', 
    type: 'text', 
    label: 'Имя', 
    id: 'signupCardName', 
    name: 'first_name', 
    focusOutHandler,
  },
  {
    htmlType: 'text', 
    type: 'text', 
    label: 'Фамилия', 
    id: 'signupCardLastName', 
    name: 'second_name', 
    focusOutHandler,
  },
  {
    htmlType: 'text', 
    type: 'text', 
    label: 'Номер телефона', 
    id: 'signupCardPhone', 
    name: 'phone', 
    focusOutHandler,
  },
  {
    htmlType: 'password', 
    type: 'text', 
    label: 'Пароль', 
    id: 'signupCardPassword', 
    name: 'password', 
    focusOutHandler,
  },
  {
    htmlType: 'password', 
    type: 'text', 
    label: 'Повторите пароль', 
    id: 'signupCardConfirmPassword', 
    name: 'confirmPassword', 
    focusOutHandler,
  },
];

class SignupCard extends Block {
  constructor() {
    super({ 
      signupInputs,
      submitHandler: () => submitHandler('signupForm'),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { SignupCard };
