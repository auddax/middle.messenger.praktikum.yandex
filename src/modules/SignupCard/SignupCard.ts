import Block from 'src/core/Block';
import template from './SignupCard.hbs?raw';
import { submitHandler } from 'src/utils/handlers';

const signupInputs = [
  {
    htmlType: 'text', type: 'text', label: 'Почта', id: 'signupCardMail', name: 'email',
  },
  {
    htmlType: 'text', type: 'text', label: 'Логин', id: 'signupCardLogin', name: 'login',
  },
  {
    htmlType: 'text', type: 'text', label: 'Имя', id: 'signupCardName', name: 'first_name',
  },
  {
    htmlType: 'text', type: 'text', label: 'Фамилия', id: 'signupCardLastName', name: 'second_name',
  },
  {
    htmlType: 'text', type: 'text', label: 'Номер телефона', id: 'signupCardPhone', name: 'phone',
  },
  {
    htmlType: 'password', type: 'text', label: 'Пароль', id: 'signupCardPassword', name: 'password',
  },
  {
    htmlType: 'password', type: 'text', label: 'Повторите пароль', id: 'signupCardConfirmPassword', name: 'confirmPassword',
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
