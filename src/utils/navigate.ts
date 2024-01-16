import * as Pages from 'src/pages';
import Block from 'src/core/Block';

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

export function navigate(pageName: string) {
  const Page = pages[pageName];
  const page = new Page();
  const container = document.getElementById('app');
  container?.firstElementChild
    ? container?.firstElementChild?.replaceWith(page.render())
    : container?.append(page.render());
}
