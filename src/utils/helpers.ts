import { ChatResponse } from '../types';

export const getCurrentChatName = (currentChat: number) => {
  const { chats } = window.store.getState();
  let currentChatName;
  if (chats?.length && currentChat) {
    const chat = chats.find((c) => currentChat === c.id);
    currentChatName = chat?.title;
  } else {
    currentChatName = 'Чат не выбран';
  }
  return currentChatName;
};

export const transformChatData = (data: ChatResponse) => ({
  id: data.id,
  avatarPath: data?.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : '',
  title: data.title,
  avatar: data.avatar,
  content: data.last_message?.content,
  time: data.last_message?.time,
  unreadCount: data.unread_count,
});
