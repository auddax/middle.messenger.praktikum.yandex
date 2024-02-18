import Store from 'src/core/Store';
import * as Components from 'src/components';
import * as Layout from 'src/layout';
import * as Modules from 'src/modules';
import { registerComponent } from 'src/utils/registerComponent';
import { router } from 'src/router';
import { AppState } from 'src/types';

declare global {
  interface Window {
    store: Store<AppState>;
  }

  type Nullable<T> = T | null;

}

export const initState: AppState = {
  avatarPath: null,
  error: null,
  userInfo: null,
  currentChat: null,
  currentChatName: null,
  isOpenChat: false,
  isUserAddModalOpen: false,
  isUserDeleteModalOpen: false,
  isChatAddModalOpen: false,
  isChatDeleteModalOpen: false,
  isAvatarAddModalOpen: false,
  socket: null,
  chats: [],
  messages: [],
};

window.store = new Store<AppState>(initState);

Object.entries(Components).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(Layout).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(Modules).forEach(([name, component]) => {
  registerComponent(name, component);
});

document.addEventListener('DOMContentLoaded', () => router.start());
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.className === 'backdrop') {
    window.store.set({
      isUserAddModalOpen: false,
      isUserDeleteModalOpen: false,
      isChatAddModalOpen: false,
      isChatDeleteModalOpen: false,
      isAvatarAddModalOpen: false,
    });
    target.remove();
  }
});
