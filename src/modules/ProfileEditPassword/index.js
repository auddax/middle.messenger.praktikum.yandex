import Handlebars from 'handlebars';

export { default as ProfileEditPassword } from './ProfileEditPassword.hbs?raw';

Handlebars.registerHelper('profileEditPassword', () => [
  {
    label: 'Почта', type: 'email',
  },
  {
    label: 'Логин', type: 'text',
  },
  {
    label: 'Имя', type: 'text',
  },
  {
    label: 'Фамилия', type: 'text',
  },
  {
    label: 'Имя в чате', type: 'text',
  },
  {
    label: 'Телефон', type: 'number',
  },
]);
