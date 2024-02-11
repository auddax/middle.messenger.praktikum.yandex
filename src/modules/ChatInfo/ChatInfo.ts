import Block from 'src/core/Block';
import { connect } from 'src/utils/connect';
import { Props } from 'src/types';
import template from './ChatInfo.hbs?raw';

const ChatInfo = connect(class extends Block {
  currentChatName: string | undefined;

  constructor(props: Props) {
    super({
      ...props,
      handleChatMenu: () => {
        const element = document.querySelector('.chat__menu') as HTMLElement;
        element.classList.toggle('hidden');
      },
    });
  }

  componentDidMount() {
    const { currentChat, chats } = window.store.getState();
    if (chats?.length && currentChat) {
      const chat = chats.find((c) => currentChat === c.id);
      this.currentChatName = chat?.title;
    } else {
      this.currentChatName = 'Чат не выбран';
    }
  }

  componentDidUpdate() {
    const { currentChat, chats } = window.store.getState();
    if (chats?.length && currentChat) {
      const chat = chats.find((c) => currentChat === c.id);
      this.currentChatName = chat?.title;
      return true;
    }
    return false;
  }

  render() {
    const { props, currentChatName } = this;
    return this.compile(template, { ...props, currentChatName });
  }
});

export { ChatInfo };
