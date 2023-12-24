import Handlebars from 'handlebars';

export { default as ProfileEditCard } from './ProfileEditCard.hbs?raw';

Handlebars.registerHelper('profileEditItems', () => [
  {
    label: 'Почта', htmlType: 'email', name: 'email',
  },
  {
    label: 'Логин', htmlType: 'text', name: 'login',
  },
  {
    label: 'Имя', htmlType: 'text', name: 'first_name',
  },
  {
    label: 'Фамилия', htmlType: 'text', name: 'second_name',
  },
  {
    label: 'Имя в чате', htmlType: 'text', name: 'display_name',
  },
  {
    label: 'Телефон', htmlType: 'number', name: 'phone',
  },
]);
