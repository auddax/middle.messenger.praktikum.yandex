import Block from 'src/core/Block';
import { getFormData } from 'src/utils/handlers';
import { router } from 'src/router';
import { editUserPassword } from 'src/services/user';
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
      handleSubmitPassword: async () => {
        const formProps = getFormData('profileEditPasswordForm');
        if (formProps) {
          const response = await editUserPassword(formProps);
          if (response) {
            window.store.set({ userInfo: response });
            router.go('/settings');
          }
        }
      },
      currentUserName: null,
    });
  }

  componentDidMount() {
    const { userInfo, avatarPath } = window.store.getState();
    if (userInfo) {
      this.setProps({
        avatarPath,
        currentUserName: userInfo.first_name,
      });
    }
  }

  protected render() {
    return template
  }
}

export { ProfileEditPassword };
