import Block from 'src/core/Block';
import { CardProps } from 'src/components/Card/Card';
import { initChat } from 'src/services/chat';
import { getCurrentChatName } from 'src/utils/helpers';
import template from './ChatCard.hbs?raw';

class ChatCard extends Block {
  constructor(props: CardProps) {
    super({
      handleSelectChat: async (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const { key } = target.dataset;
        if (key) {
          const currentChatName = getCurrentChatName(Number(key));
          window.store.set({ currentChatName, currentChat: Number(key) });
          const { userInfo } = window.store.getState();
          if (userInfo && userInfo.id) {
            initChat(Number(key), userInfo.id);
          }
        }
      },
      ...props,
    });
  }

  protected render() {
    return template;
  }
}

export { ChatCard };
