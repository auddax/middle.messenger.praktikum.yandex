import Block from 'src/core/Block';
import { submitHandler } from 'src/utils/handlers';
import template from './ProfileEditPassword.hbs?raw';

const profileEditPassword = [
  {
    label: 'Старый пароль', htmlType: 'password', name: 'oldPassword', id: 'profileOldPasswordInput',
  },
  {
    label: 'Новый пароль', htmlType: 'password', name: 'newPassword', id: 'profileNewPasswordInput',
  },
  {
    label: 'Повторите новый пароль', htmlType: 'password', name: 'confirmPassword', id: 'profileConfirmPasswordInput',
  },
];

class ProfileEditPassword extends Block {
  constructor() {
    super({
      profileEditPassword,
      submitHandler: () => submitHandler('profileEditPasswordForm'),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileEditPassword };
