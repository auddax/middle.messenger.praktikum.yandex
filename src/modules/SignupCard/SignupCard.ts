import Block from '../../core/Block';
import Router from '../../core/Router';
import { ROOT_QUERY } from '../../../config';
import { focusOutHandler, getFormData } from '../../utils/handlers';
import template from './SignupCard.hbs?raw';
import { createUser } from '../../services/auth';

const router = new Router(ROOT_QUERY);

const signupInputs = [
  {
    htmlType: 'text',
    type: 'text',
    label: 'Почта',
    id: 'signupCardMail',
    name: 'email',
    focusOutHandler,
  },
  {
    htmlType: 'text',
    type: 'text',
    label: 'Логин',
    id: 'signupCardLogin',
    name: 'login',
    focusOutHandler,
  },
  {
    htmlType: 'text',
    type: 'text',
    label: 'Имя',
    id: 'signupCardName',
    name: 'first_name',
    focusOutHandler,
  },
  {
    htmlType: 'text',
    type: 'text',
    label: 'Фамилия',
    id: 'signupCardLastName',
    name: 'second_name',
    focusOutHandler,
  },
  {
    htmlType: 'text',
    type: 'text',
    label: 'Номер телефона',
    id: 'signupCardPhone',
    name: 'phone',
    focusOutHandler,
  },
  {
    htmlType: 'password',
    type: 'text',
    label: 'Пароль',
    id: 'signupCardPassword',
    name: 'password',
    focusOutHandler,
  },
  {
    htmlType: 'password',
    type: 'text',
    label: 'Повторите пароль',
    id: 'signupCardConfirmPassword',
    name: 'confirmPassword',
    focusOutHandler,
  },
];

class SignupCard extends Block {
  constructor() {
    super({
      signupInputs,
      handleSubmit: async () => {
        const formProps = getFormData('signupForm');
        if (formProps) {
          const response = await createUser(formProps);
          if (response) router.go('/login');
        }
      },
      goLogin: () => router.go('/login'),
    });
  }

  protected render() {
    return template;
  }
}

export { SignupCard };
