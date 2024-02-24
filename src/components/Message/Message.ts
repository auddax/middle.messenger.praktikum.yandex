import Block from '../../core/Block';
import template from './Message.hbs?raw';

class Message extends Block {
  protected render() {
    return template;
  }
}

export { Message };
