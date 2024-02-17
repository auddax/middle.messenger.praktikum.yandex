import Block from 'src/core/Block';
import { Props } from 'src/types';
import { router } from 'src/router';
import { setUser } from 'src/services/auth';
import { getChats } from 'src/services/chat';
import template from './ChatPage.hbs?raw';

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
