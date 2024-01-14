import Block from 'src/core/Block';
import template from './ProfileEditCard.hbs?raw';

const profileEditItems = [
  {
    label: 'Почта', htmlType: 'email', name: 'email', id: 'profileEmailInput',
  },
  {
    label: 'Логин', htmlType: 'text', name: 'login', id: 'profileLoginInput',
  },
  {
    label: 'Имя', htmlType: 'text', name: 'first_name', id: 'profileFirsNameInput',
  },
  {
    label: 'Фамилия', htmlType: 'text', name: 'second_name', id: 'profileSecondNameInput',
  },
  {
    label: 'Имя в чате', htmlType: 'text', name: 'display_name', id: 'profileDisplayNameInput',
  },
  {
    label: 'Телефон', htmlType: 'number', name: 'phone', id: 'profilePhoneInput',
  },
];

class ProfileEditCard extends Block {
  constructor() {
    super({ profileEditItems })
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileEditCard };
