import Handlebars from 'handlebars';

export { default as ProfileEditPassword } from './ProfileEditPassword.hbs?raw';

Handlebars.registerHelper('profileEditPassword', () => [
  {
    label: 'Старый пароль', htmlType: 'password', name: 'oldPassword',
  },
  {
    label: 'Новый пароль', htmlType: 'password', name: 'newPassword',
  },
  {
    label: 'Повторите новый пароль', htmlType: 'password', name: 'confirmPassword',
  },
]);
