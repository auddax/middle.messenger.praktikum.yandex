import Block from 'src/core/Block';
import { Props } from 'src/types';
import template from './ChatPage.hbs?raw';

class ChatPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ChatPage };
