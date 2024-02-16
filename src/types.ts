import Block from 'src/core/Block';

export type Props = {
  [key: string | symbol]: unknown | Block;
  events?: Events;
};

export type Child = { embed: (content: DocumentFragment) => void };

export type Events = { [key: string]: (() => void) | undefined };

export type Children = { [key: string]: Block };

export type Refs = { [key: string]: Element | Block };

export type Error = { code: number | undefined, message: string | undefined };

export type AppState = {
  error: Error | null,
  avatarPath: string | null,
  userInfo: User | null,
  currentChat: number | null,
  isOpenChat: boolean,
  isUserAddModalOpen: boolean,
  isUserDeleteModalOpen: boolean;
  isChatDeleteModalOpen: boolean,
  chats: Chat[]
};

export type User = {
  [key: string]: string | number;
};

export type UserResponse = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  avatar: string,
  phone: string,
  email: string,
  selected?: boolean,
};

type LastMessage = {
  user: User,
  time: string,
  content: string
};

export type Chat = {
  id: number,
  title: string,
  avatar: Nullable<string>,
  content: string | undefined,
  time: string | undefined,
  unreadCount: number,
};

export type ChatResponse = {
  avatar: Nullable<string>,
  created_by: number,
  id: number,
  last_message: LastMessage | null
  title: string,
  unread_count: number,
};

export type SocketResponse = {
  chat_id: number,
  content: string
  file: null,
  id: number,
  is_read: boolean,
  time: string,
  type: string,
  user_id: number
};

export type RequestResult = {
  status: number;
  statusText: string;
  response: string
  reason: string
};
