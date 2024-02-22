import Block from '../../core/Block';
import { focusOutHandler, getFormData } from '../../utils/handlers';
import { createChat, initChat } from '../../services/chat';
import { getCurrentChatName } from '../../utils/helpers';
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
            const currentChatName = getCurrentChatName(Number(id));
            window.store.set({
              currentChatName,
              currentChat: id,
              isChatAddModalOpen: false,
            });
            const { userInfo } = window.store.getState();
            if (userInfo && userInfo.id) {
              initChat(id, userInfo.id);
            }
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
