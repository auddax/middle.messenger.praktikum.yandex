import Block from 'src/core/Block';
import { focusOutHandler, getFormData } from 'src/utils/handlers';
import { createChat } from 'src/services/chat';
import template from './ChatAddModal.hbs?raw';

class ChatAddModal extends Block {
  constructor() {
    super({
      focusOutHandler,
      handleCreateChat: async (e: Event) => {
        e.preventDefault();
        const formProps = getFormData('chatNameForm');
        if (formProps) {
          const title = formProps.chat_name as string;
          const resp = await createChat(title);
          if (resp) {
            const { id } = resp;
            window.store.set({
              currentChat: id,
              isChatAddModalOpen: false,
            });
          }
        }
      },
    });
  }

  protected render() {
    return template;
  }
}

export { ChatAddModal };
