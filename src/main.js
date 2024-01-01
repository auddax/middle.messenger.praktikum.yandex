import Handlebars from 'handlebars';
import * as Components from './components';
import * as Modules from './modules';
import * as Layout from './layout';
import * as Pages from './pages';

const pages = {
  loginPage: [Pages.LoginPage],
  signupPage: [Pages.SignupPage],
  errorPage: [Pages.ErrorPage],
  notFoundPage: [Pages.NotFoundPage],
  chatPage: [Pages.ChatPage],
  profilePage: [Pages.ProfilePage],
  profileEditPage: [Pages.ProfileEditPage],
  profileEditPasswordPage: [Pages.ProfileEditPasswordPage],
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

const navigate = (page) => {
  const [source, context] = pages[page];
  const container = document.getElementById('app');
  container.innerHTML = Handlebars.compile(source)(context);
};

document.addEventListener('DOMContentLoaded', () => navigate('loginPage'));
document.addEventListener('click', (e) => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
