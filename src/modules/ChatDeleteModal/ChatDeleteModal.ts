import Block from 'src/core/Block';
import { deleteChat } from 'src/services/chat';
import { focusOutHandler } from 'src/utils/handlers';
// import { deleteChat } from 'src/services/chat';
import template from './ChatDeleteModal.hbs?raw';

class ChatDeleteModal extends Block {
  constructor() {
    super({
      focusOutHandler,
      handleDeleteChat: async () => {
        const { currentChat } = window.store.getState();
        if (!currentChat) return;
        const resp = await deleteChat(currentChat);
        if (resp) {
          this.remove();
          this.cancelMenu();
          window.store.set({ currentChat: null });
        }
      },
      handleCancel: () => {
        this.remove();
        this.cancelMenu();
      },
    });
  }

  remove() {
    const modal = document.querySelector('.backdrop');
    if (modal) modal.remove();
  }

  cancelMenu() {
    const element = document.querySelector('.chat__menu') as HTMLElement;
    element.classList.toggle('hidden');
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ChatDeleteModal };
