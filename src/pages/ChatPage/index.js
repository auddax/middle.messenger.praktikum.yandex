import Handlebars from 'handlebars';

export { default as ChatPage } from './ChatPage.hbs?raw';

const userCardsArr = Array(10).fill({
  avatarAltText: 'Иванов Иван',
  avatarType: 'card-user',
  level: '4',
  userName: 'Иван',
  userInitials: 'ИИ',
  userCardText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quis commodi ipsa sapiente animi incidunt consectetur accusamus atque doloremque ex. Voluptatum magnam quibusdam vitae temporibus, ea aperiam recusandae autem consectetur...',
  userCardDateTime: '12.00',
  badgeText: '2',
});

Handlebars.registerHelper('userCards', () => userCardsArr);
Handlebars.registerHelper('userMessages', () => [
  {
    userMessage: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, totam sapiente non doloribus eveniet dicta ad vitae blanditiis natus eos officiis? Quae minima, perspiciatis nesciunt explicabo tempora quidem voluptas quisquam.',
    messageClassName: 'message_in',
  },
  {
    userMessage: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, totam sapiente non doloribus eveniet dicta ad vitae blanditiis natus eos officiis? Quae minima, perspiciatis nesciunt explicabo tempora quidem voluptas quisquam.',
    messageClassName: 'message_out',
  },
]);
