import Block from 'src/core/Block';
import { ChatAddModal } from 'src/modules/ChatAddModal';
import { router } from 'src/router';
import { getChats } from 'src/services/chat';
import { ChatResponse, Props } from 'src/types';
import { logout, setUser } from 'src/services/auth';
import { initState } from 'src/main';
import { connect } from 'src/utils/connect';
import template from './ChatsList.hbs?raw';
import config from '../../../config.json';

const { rootQuery } = config;

const modal = new ChatAddModal();

export const transformChatData = (data: ChatResponse) => ({
  id: data.id,
  title: data.title,
  avatar: data.avatar,
  content: data.last_message?.content,
  time: data.last_message?.time,
  unreadCount: data.unread_count,
});

const ChatsList = connect(class extends Block {
  constructor(props: Props) {
    super({
      // chats: [],
      handleLogout: async () => {
        window.store.set(initState);
        const response = await logout();
        if (response) router.go('/login');
      },
      goProfilePage: () => router.go('/settings'),
      handleCreateChat: () => {
        const modalElement = modal.render();
        const root = document.getElementById(rootQuery);
        if (root) root.append(modalElement);
        const popup = document.querySelector('.backdrop');
        if (popup) {
          popup.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.className === 'backdrop') popup.remove();
          });
        }
      },
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
    if (!chats?.length) {
      const response = await getChats();
      if (response) {
        const loadedChats = response.map((obj) => transformChatData(obj));
        window.store.set({ chats: loadedChats });
      }
    }
  };

  render() {
    return this.compile(template, this.props);
  }
});

export { ChatsList };
