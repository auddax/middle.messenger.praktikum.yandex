import Block from 'src/core/Block';
import { router } from 'src/router';
import { ChatResponse, Props } from 'src/types';
import { logout } from 'src/services/auth';
import { initState } from 'src/main';
import { connect } from 'src/utils/connect';
import template from './ChatsList.hbs?raw';

export const transformChatData = (data: ChatResponse) => ({
  id: data.id,
  avatarPath: data?.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : '',
  title: data.title,
  avatar: data.avatar,
  content: data.last_message?.content,
  time: data.last_message?.time,
  unreadCount: data.unread_count,
});

const ChatsList = connect(class extends Block {
  constructor(props: Props) {
    super({
      handleLogout: async () => {
        window.store.set(initState);
        const response = await logout();
        if (response) router.go('/login');
      },
      goProfilePage: () => router.go('/settings'),
      handleAddChat: () => window.store.set({ isChatAddModalOpen: true }),
      ...props,
    });
  }

  render() {
    return template;
  }
});

export { ChatsList };
