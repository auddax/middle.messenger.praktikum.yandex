import Block from 'src/core/Block';
import { focusOutHandler, getFormData } from 'src/utils/handlers';
import { Props } from 'src/types';
import { connect } from 'src/utils/connect';
import template from './Chat.hbs?raw';

const Chat = connect(class extends Block {
  constructor(props: Props) {
    super({
      ...props,
      focusOutHandler,
      handleSubmitMessage: (event: Event) => {
        event.preventDefault();
        const { message } = getFormData('messageForm', true);
        const { socket } = window.store.getState();
        socket?.send(JSON.stringify({
          content: message,
          type: 'message',
        }));
      },
    });
  }

  protected render() {
    return template;
  }
});

export { Chat };
