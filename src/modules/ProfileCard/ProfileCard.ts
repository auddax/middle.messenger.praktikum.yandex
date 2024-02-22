import Block from '../../core/Block';
import Router from '../../core/Router';
import { ROOT_QUERY } from '../../../config';
import { connect } from '../../utils/connect';
import { setUser } from '../../services/auth';
import { User } from '../../types';
import template from './ProfileCard.hbs?raw';

const router = new Router(ROOT_QUERY);

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

  async componentDidMount() {
    const user = await this.checkUser();
    this.setProfile(user?.userInfo, user?.avatarPath);
  }

  async checkUser() {
    const { userInfo, avatarPath } = window.store.getState();
    if (!userInfo || !avatarPath) {
      const resp = await setUser();
      return resp;
    }
    return { userInfo, avatarPath };
  }

  setProfile(userInfo: User, avatarPath: string | undefined) {
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

  protected render() {
    return template;
  }
});

export { ProfileCard };
