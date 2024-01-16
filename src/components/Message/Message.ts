import Block from 'src/core/Block';
import template from './Message.hbs?raw';

class Message extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { Message };
