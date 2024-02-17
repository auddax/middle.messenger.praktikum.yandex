import Block from 'src/core/Block';
import { deleteChat, getChats } from 'src/services/chat';
import { Props } from 'src/types';
import template from './ChatDeleteModal.hbs?raw';

class ChatDeleteModal extends Block {
  constructor(props: Props) {
    super({
      ...props,
      handleDeleteChat: async () => {
        const { currentChat } = window.store.getState();
        if (!currentChat) return;
        const resp = await deleteChat(currentChat);
        if (resp) {
          await getChats();
          this.cancelMenu();
          window.store.set({
            currentChat: null,
            isChatDeleteModalOpen: false,
          });
        }
      },
      handleCancel: () => {
        this.cancelMenu();
        window.store.set({ isChatDeleteModalOpen: false });
      },
    });
  }

  cancelMenu() {
    const element = document.querySelector('.chat__menu') as HTMLElement;
    element?.classList.toggle('hidden');
  }

  protected render() {
    return template;
  }
}

export { ChatDeleteModal };
