import Handlebars from 'handlebars';

export { default as ProfileEditPassword } from './ProfileEditPassword.hbs?raw';

Handlebars.registerHelper('profileEditPassword', () => [
  {
    label: 'Старый пароль', htmlType: 'password',
  },
  {
    label: 'Новый пароль', htmlType: 'password',
  },
  {
    label: 'Повторите новый пароль', htmlType: 'password',
  },
]);
