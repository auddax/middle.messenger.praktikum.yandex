import Handlebars from 'handlebars';

export { default as ProfileCard } from './ProfileCard.hbs?raw';

Handlebars.registerHelper('profileItems', () => [
  {
    profileInfoTitle: 'Почта', profileInfoText: 'pochta@yandex.ru',
  },
  {
    profileInfoTitle: 'Логин', profileInfoText: 'ivanivanov',
  },
  {
    profileInfoTitle: 'Имя', profileInfoText: 'Иван',
  },
  {
    profileInfoTitle: 'Фамилия', profileInfoText: 'Иванов',
  },
  {
    profileInfoTitle: 'Имя в чате', profileInfoText: 'Иван',
  },
  {
    profileInfoTitle: 'Телефон', profileInfoText: '+7 (909) 967 30 30',
  },
]);
