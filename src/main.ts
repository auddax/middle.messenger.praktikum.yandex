import { ROUTES, ROOT_QUERY, INIT_STATE } from '../config';
import { Store } from './core/Store';
import * as Components from './components';
import * as Layout from './layout';
import * as Modules from './modules';
import * as Pages from './pages';
import { registerComponent } from './utils/registerComponent';
import Router from './core/Router';
import { AppState } from './types';
import Block from './core/Block';

declare global {
  interface Window {
    store: Store<AppState>;
  }

  type Nullable<T> = T | null;

}

window.store = new Store<AppState>(INIT_STATE);

const pages: { [key: string]: typeof Block } = {
  loginPage: Pages.LoginPage,
  signupPage: Pages.SignupPage,
  errorPage: Pages.ErrorPage,
  notFoundPage: Pages.NotFoundPage,
  chatPage: Pages.ChatPage,
  profilePage: Pages.ProfilePage,
  profileEditPage: Pages.ProfileEditPage,
  profileEditPasswordPage: Pages.ProfileEditPasswordPage,
};

const router = new Router(ROOT_QUERY);

Object.entries(Components).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(Layout).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(Modules).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(pages).forEach(([key, block]) => {
  router.use(ROUTES[key], block);
});

router.use('/', pages.loginPage);

document.addEventListener('DOMContentLoaded', () => router.start());
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.className === 'backdrop') {
    window.store.set({
      isUserAddModalOpen: false,
      isUserDeleteModalOpen: false,
      isChatAddModalOpen: false,
      isChatDeleteModalOpen: false,
      isAvatarAddModalOpen: false,
    });
    target.remove();
  }
});
