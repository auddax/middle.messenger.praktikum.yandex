import Block from 'src/core/Block';
import { focusOutHandler } from 'src/utils/handlers';
import template from './Chat.hbs?raw';

const userMessages = [
  {
    userMessage: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, totam sapiente non doloribus eveniet dicta ad vitae blanditiis natus eos officiis? Quae minima, perspiciatis nesciunt explicabo tempora quidem voluptas quisquam.',
    messageClassName: 'message_in',
  },
  {
    userMessage: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, totam sapiente non doloribus eveniet dicta ad vitae blanditiis natus eos officiis? Quae minima, perspiciatis nesciunt explicabo tempora quidem voluptas quisquam.',
    messageClassName: 'message_out',
  },
];

class Chat extends Block {
  constructor() {
    super({
      userMessages,
      focusOutHandler,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Chat };
