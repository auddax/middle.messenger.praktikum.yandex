import Block from 'src/core/Block';
import template from './ProfileCard.hbs?raw';

const profileItems = [
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
];

class ProfileCard extends Block {
  constructor() {
    super({ profileItems })
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileCard };
