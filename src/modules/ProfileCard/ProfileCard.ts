import Block from 'src/core/Block';
import { router } from 'src/router';
import { connect } from 'src/utils/connect';
import template from './ProfileCard.hbs?raw';

type ProfileItem = {
  profileInfoTitle: string;
  profileInfoText: string | null;
  profileInfoName: string;
};

const profileItems: ProfileItem[] = [
  {
    profileInfoTitle: 'Почта',
    profileInfoText: null,
    profileInfoName: 'email',
  },
  {
    profileInfoTitle: 'Логин',
    profileInfoText: null,
    profileInfoName: 'login',
  },
  {
    profileInfoTitle: 'Имя',
    profileInfoText: null,
    profileInfoName: 'first_name',
  },
  {
    profileInfoTitle: 'Фамилия',
    profileInfoText: null,
    profileInfoName: 'second_name',
  },
  {
    profileInfoTitle: 'Имя в чате',
    profileInfoText: null,
    profileInfoName: 'display_name',
  },
  {
    profileInfoTitle: 'Телефон',
    profileInfoText: null,
    profileInfoName: 'phone',
  },
];

const ProfileCard = connect(class extends Block {
  constructor() {
    super({
      profileItems,
      avatarPath: '',
      currentUserName: null,
      goProfileEditPage: () => router.go('/settings-edit'),
      goProfileEditPasswordPage: () => router.go('/settings-edit-password'),
    });
  }

  componentDidMount() {
    const { userInfo, avatarPath } = window.store.getState();
    if (userInfo) {
      const items = this.props.profileItems as ProfileItem[];
      const currentUserInfo = items.map((item: ProfileItem) => ({
        ...item,
        profileInfoText: userInfo[item.profileInfoName],
      }));
      this.setProps({
        avatarPath,
        profileItems: currentUserInfo,
        currentUserName: userInfo.first_name,
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
});

export { ProfileCard };
