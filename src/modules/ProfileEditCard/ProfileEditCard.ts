import Block from '../../core/Block';
import { editUserProfile } from '../../services/user';
import Router from '../../core/Router';
import { ROOT_QUERY } from '../../../config';
import { getFormData } from '../../utils/handlers';
import { User } from '../../types';
import { connect } from '../../utils/connect';
import template from './ProfileEditCard.hbs?raw';

const router = new Router(ROOT_QUERY);

type ProfileEditItem = {
  label: string;
  htmlType: string;
  name: string;
  id: string
  value?: string | undefined;
};

const profileEditItems = [
  {
    label: 'Почта', htmlType: 'email', name: 'email', id: 'profileEmailInput', value: '',
  },
  {
    label: 'Логин', htmlType: 'text', name: 'login', id: 'profileLoginInput', value: '',
  },
  {
    label: 'Имя', htmlType: 'text', name: 'first_name', id: 'profileFirsNameInput', value: '',
  },
  {
    label: 'Фамилия', htmlType: 'text', name: 'second_name', id: 'profileSecondNameInput', value: '',
  },
  {
    label: 'Имя в чате', htmlType: 'text', name: 'display_name', id: 'profileDisplayNameInput', value: '',
  },
  {
    label: 'Телефон', htmlType: 'text', name: 'phone', id: 'profilePhoneInput', value: '',
  },
];

const ProfileEditCard = connect(class extends Block {
  constructor() {
    super({
      avatarPath: '',
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
      handleSelectAvatar: () => window.store.set({ isAvatarAddModalOpen: true }),
      currentUserName: null,
    });
  }

  componentDidMount() {
    const { userInfo, avatarPath } = window.store.getState();
    if (userInfo && avatarPath) this.setProfile(userInfo, avatarPath);
  }

  setProfile(userInfo: User, avatarPath: string | undefined) {
    const items = this.props.profileEditItems as ProfileEditItem[];
    const currentUserInfo = items.map((item: ProfileEditItem) => ({
      ...item,
      value: userInfo[item.name],
    }));
    this.setProps({
      avatarPath,
      currentUserName: userInfo?.firstName,
      profileEditItems: currentUserInfo,
    });
  }

  protected render() {
    return template;
  }
});

export { ProfileEditCard };
