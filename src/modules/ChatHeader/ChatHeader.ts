import Block from 'src/core/Block';
import { Props } from 'src/types';
import { connect } from 'src/utils/connect';
import template from './ChatHeader.hbs?raw';

const ChatHeader = connect(class extends Block {
  constructor(props: Props) {
    super({
      ...props,
      handleChatMenu: () => {
        const element = document.querySelector('.chat__menu') as HTMLElement;
        element.classList.toggle('hidden');
      },
    });
  }

  getCurrentChatName() {
    const { currentChat, chats } = window.store.getState();
    let currentChatName;
    if (chats?.length && currentChat) {
      const chat = chats.find((c) => currentChat === c.id);
      currentChatName = chat?.title;
    } else {
      currentChatName = 'Чат не выбран';
    }
    return currentChatName;
  }

  render() {
    const { props } = this;
    const currentChatName = this.getCurrentChatName();
    return this.compile(template, { ...props, currentChatName });
  }
});

export { ChatHeader };
