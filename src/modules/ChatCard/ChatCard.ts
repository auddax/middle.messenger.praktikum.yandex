import Block from 'src/core/Block';
import { CardProps } from 'src/components/Card/Card';
import template from './ChatCard.hbs?raw';

class ChatCard extends Block {
  constructor(props: CardProps) {
    super({
      handleSelectChat: (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const { key } = target.dataset;
        if (key) window.store.set({ currentChat: Number(key) });
      },
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ChatCard };
