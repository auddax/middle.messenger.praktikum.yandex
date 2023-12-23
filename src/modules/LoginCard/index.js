import Handlebars from 'handlebars';

export { default as LoginCard } from './LoginCard.hbs?raw';

Handlebars.registerHelper('loginInputs', () => [
  {
    htmlType: 'text', type: 'text', label: 'Логин', id: 'loginCardLogin', name: 'login',
  },
  {
    htmlType: 'text', type: 'text', label: 'Пароль', id: 'loginCardPassword', name: 'password',
  },
]);
