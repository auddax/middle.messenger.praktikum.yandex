import Block from '../../core/Block';
import { Props } from '../../types';
import template from './ChatMenu.hbs?raw';

class ChatMenu extends Block {
  constructor(props: Props) {
    super({
      ...props,
      handleAddUser: () => {
        window.store.set({ isUserAddModalOpen: true });
      },
      handleDeleteUser: () => {
        window.store.set({ isUserDeleteModalOpen: true });
      },
      handleDeleteChat: () => {
        window.store.set({ isChatDeleteModalOpen: true });
      },
    });
  }

  protected render() {
    return template;
  }
}

export { ChatMenu };
