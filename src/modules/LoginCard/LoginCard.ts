import Block from '../../core/Block';
import Router from '../../core/Router';
import { ROOT_QUERY } from '../../../config';
import { login, setUser } from '../../services/auth';
import { focusOutHandler, getFormData } from '../../utils/handlers';
import template from './LoginCard.hbs?raw';

const router = new Router(ROOT_QUERY);

const loginInputs = [
  {
    htmlType: 'text',
    type: 'text',
    label: 'Логин',
    id: 'loginCardLogin',
    name: 'login',
    focusOutHandler,
  },
  {
    htmlType: 'password',
    type: 'text',
    label: 'Пароль',
    id: 'loginCardPassword',
    name: 'password',
    focusOutHandler,
  },
];

class LoginCard extends Block {
  constructor() {
    super({
      userInfo: null,
      loginInputs,
      handleSubmit: async () => {
        const formProps = getFormData('loginForm');
        if (formProps) {
          const response = await login(formProps);
          if (response) router.go('/messenger');
        }
      },
      goSignup: () => router.go('/sign-up'),
    });
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    const { userInfo } = window.store.getState();
    if (!userInfo) {
      const response = await setUser();
      if (response) router.go('/messenger');
      return;
    }
    router.go('/messenger');
  };

  protected render() {
    return template;
  }
}

export { LoginCard };
