import Handlebars from 'handlebars';

export { default as ProfileEditCard } from './ProfileEditCard.hbs?raw';

Handlebars.registerHelper('profileEditItems', () => [
  {
    label: 'Почта', htmlType: 'email',
  },
  {
    label: 'Логин', htmlType: 'text',
  },
  {
    label: 'Имя', htmlType: 'text',
  },
  {
    label: 'Фамилия', htmlType: 'text',
  },
  {
    label: 'Имя в чате', htmlType: 'text',
  },
  {
    label: 'Телефон', htmlType: 'number',
  },
]);
