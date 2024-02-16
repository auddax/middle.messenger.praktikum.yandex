import Block from 'src/core/Block';
import { editUserProfile } from 'src/services/user';
import { router } from 'src/router';
import { getFormData } from 'src/utils/handlers';
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
    label: 'Телефон', htmlType: 'text', name: 'phone', id: 'profilePhoneInput',
  },
];

class ProfileEditCard extends Block {
  constructor() {
    super({
      profileEditItems,
      isAvatarAddModalOpen: false,
      handleSubmitProfile: async () => {
        const formProps = getFormData('profileEditForm');
        if (formProps) {
          const response = await editUserProfile(formProps);
          if (response) {
            window.store.set({ userInfo: response });
            router.go('/settings');
          }
        }
      },
      handleSelectAvatar: () => {
        this.setProps({ isAvatarAddModalOpen: true });
      },
      currentUserName: null,
    });
  }

  componentDidMount() {
    const { userInfo } = window.store.getState();
    if (userInfo?.firstName) {
      this.props.currentUserName = userInfo.firstName;
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileEditCard };
