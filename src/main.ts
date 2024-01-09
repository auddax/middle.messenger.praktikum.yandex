import Handlebars from 'handlebars';
import * as Components from './components';
import * as Modules from './modules';
import * as Layout from './layout';
import * as Pages from './pages';

const pages: { [key: string]: string } = {
  loginPage: Pages.LoginPage,
  signupPage: Pages.SignupPage,
  errorPage: Pages.ErrorPage,
  notFoundPage: Pages.NotFoundPage,
  chatPage: Pages.ChatPage,
  profilePage: Pages.ProfilePage,
  profileEditPage: Pages.ProfileEditPage,
  profileEditPasswordPage: Pages.ProfileEditPasswordPage,
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Modules).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Layout).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

const navigate = (pageName: string): void => {
  const source = pages[pageName];
  const container = document.getElementById('app');
  if (container) container.innerHTML = Handlebars.compile(source)({});
};

document.addEventListener('DOMContentLoaded', () => navigate('loginPage'));
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
