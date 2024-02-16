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
          window.store.set({ currentChat: Number(key) });
          const { userInfo } = window.store.getState();
          if (userInfo && userInfo.id) {
            initChat(Number(key), userInfo.id);
          }
        }
      },
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ChatCard };
