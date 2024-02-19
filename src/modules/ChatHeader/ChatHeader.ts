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

  protected render() {
    return template;
  }
});

export { ChatHeader };
