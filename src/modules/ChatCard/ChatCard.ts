import Block from 'src/core/Block';
import { CardProps } from 'src/components/Card/Card';
import { initChat } from 'src/services/chat';
import template from './ChatCard.hbs?raw';

class ChatCard extends Block {
  constructor(props: CardProps) {
    super({
      handleSelectChat: async (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const { key } = target.dataset;
        if (key) {
          const currentChatName = this.getCurrentChatName(Number(key));
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

  getCurrentChatName(currentChat: number) {
    const { chats } = window.store.getState();
    let currentChatName;
    if (chats?.length && currentChat) {
      const chat = chats.find((c) => currentChat === c.id);
      currentChatName = chat?.title;
    } else {
      currentChatName = 'Чат не выбран';
    }
    return currentChatName;
  }

  protected render() {
    return template;
  }
}

export { ChatCard };
