import Block from 'src/core/Block';
import { Props } from 'src/types';
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

  render() {
    return this.compile(template, this.props);
  }
}

export { ChatMenu };
