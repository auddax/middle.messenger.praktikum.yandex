import Block from 'src/core/Block';
import { ChatModal } from 'src/modules/ChatModal';
import { router } from 'src/router';
import { getChats } from 'src/services/chat';
import { connect } from 'src/utils/connect';
import { Chat, ChatResponse } from 'src/types';
import template from './ChatsList.hbs?raw';
import config from '../../../config.json';

const { rootQuery } = config;

const modal = new ChatModal();

export const transformChatData = (data: ChatResponse) => ({
  id: data.id,
  title: data.title,
  avatar: data.avatar,
  content: data.last_message?.content,
  time: data.last_message?.time,
  unreadCount: data.unread_count,
});

const ChatsList = connect(class ChatsList extends Block {
  chats: Chat[] = [];

  constructor() {
    super({
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
    });
  }

  componentDidMount() {
    const { chats } = window.store.getState();
    if (chats?.length) {
      this.chats = chats;
    } else {
      this.loadChats();
    }
  }

  loadChats = async () => {
    const response = await getChats();
    if (response) {
      const chats = response.map((obj) => transformChatData(obj));
      window.store.set({ chats });
    }
  };

  render() {
    return this.compile(template, this.props);
  }
});

export { ChatsList };
