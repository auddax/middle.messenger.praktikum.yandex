import Block from 'src/core/Block';
import template from './ChatPage.hbs?raw';

class ChatPage extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { ChatPage };
