import Block from 'src/core/Block';
import Router from 'src/core/Router';
import * as Pages from 'src/pages';
import config from '../../config.json';

const { rootQuery } = config;

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

const routes: { [key: string]: string } = {
  loginPage: '/login',
  signupPage: '/sign-up',
  errorPage: '/error',
  notFoundPage: '/not-found',
  chatPage: '/messenger',
  profilePage: '/settings',
  profileEditPage: '/settings-edit',
  profileEditPasswordPage: '/settings-edit-password',
};

const router = new Router(rootQuery);
router.use('/', pages.chatPage);

Object.entries(pages).forEach(([key, block]) => {
  router.use(routes[key], block);
});

export { pages, router };
