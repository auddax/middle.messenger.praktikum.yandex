export const ROOT_QUERY = 'app';

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export const ROUTES: { [key: string]: string } = {
  loginPage: '/login',
  signupPage: '/sign-up',
  errorPage: '/error',
  notFoundPage: '/not-found',
  chatPage: '/messenger',
  profilePage: '/settings',
  profileEditPage: '/settings-edit',
  profileEditPasswordPage: '/settings-edit-password',
};

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const INIT_STATE = {
  avatarPath: null,
  error: null,
  userInfo: null,
  currentChat: null,
  currentChatName: null,
  isOpenChat: false,
  isUserAddModalOpen: false,
  isUserDeleteModalOpen: false,
  isChatAddModalOpen: false,
  isChatDeleteModalOpen: false,
  isAvatarAddModalOpen: false,
  socket: null,
  chats: [],
  messages: [],
};
