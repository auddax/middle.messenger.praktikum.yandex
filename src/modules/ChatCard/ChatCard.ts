import Block from '../../core/Block';
import { CardProps } from '../../components/Card/Card';
import { initChat } from '../../services/chat';
import { getCurrentChatName } from '../../utils/helpers';
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
