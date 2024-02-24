import Block from '../../core/Block';
import { Props } from '../../types';
import { connect } from '../../utils/connect';
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
