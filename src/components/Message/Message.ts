import Block from 'src/core/Block';
import template from './Message.hbs?raw';

type MessageProps = {
  messageClassName: string;
};

class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Message };
