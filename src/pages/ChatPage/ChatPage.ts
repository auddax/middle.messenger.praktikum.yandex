import Block from '../../core/Block';
import { Props } from '../../types';
import Router from '../../core/Router';
import { ROOT_QUERY } from '../../../config';
import { setUser } from '../../services/auth';
import { getChats } from '../../services/chat';
import template from './ChatPage.hbs?raw';

const router = new Router(ROOT_QUERY);

class ChatPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    const { userInfo } = window.store.getState();
    if (!userInfo) {
      const response = await setUser();
      if (response) {
        this.loadChats();
      } else {
        router.go('/login');
      }
    } else {
      await this.loadChats();
    }
  };

  loadChats = async () => {
    const { chats } = window.store.getState();
    if (!chats?.length) await getChats();
  };

  protected render() {
    return template;
  }
}

export { ChatPage };
