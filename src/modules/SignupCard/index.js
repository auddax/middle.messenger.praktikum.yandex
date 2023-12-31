import Handlebars from 'handlebars';

export { default as SignupCard } from './SignupCard.hbs?raw';

Handlebars.registerHelper('signupInputs', () => [
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
    htmlType: 'text', type: 'text', label: 'Пароль', id: 'signupCardPassword', name: 'password',
  },
  {
    htmlType: 'text', type: 'text', label: 'Повторите пароль', id: 'signupCardConfirmPassword', name: 'confirmPassword',
  },
]);
