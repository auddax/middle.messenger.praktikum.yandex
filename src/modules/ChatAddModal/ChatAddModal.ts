import Block from 'src/core/Block';
import { focusOutHandler, getFormData } from 'src/utils/handlers';
import { createChat } from 'src/services/chat';
import template from './ChatAddModal.hbs?raw';

class ChatAddModal extends Block {
  constructor() {
    super({
      focusOutHandler,
      handleCreateChat: async () => {
        const formProps = getFormData('chatNameForm');
        if (formProps) {
          const title = formProps.chat_name as string;
          const resp = await createChat(title);
          if (resp) {
            const { id } = resp;
            window.store.set({ currentChat: id });
            this.remove();
          }
        }
      },
    });
  }

  remove() {
    const modal = document.querySelector('.backdrop');
    if (modal) modal.remove();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ChatAddModal };
