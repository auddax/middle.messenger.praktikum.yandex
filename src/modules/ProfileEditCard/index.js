import Handlebars from 'handlebars';

export { default as ProfileEditCard } from './ProfileEditCard.hbs?raw';

Handlebars.registerHelper('profileEditItems', () => [
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
