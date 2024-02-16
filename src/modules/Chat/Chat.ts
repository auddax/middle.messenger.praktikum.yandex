import Block from 'src/core/Block';
import { focusOutHandler } from 'src/utils/handlers';
import { Props } from 'src/types';
import { connect } from 'src/utils/connect';
import template from './Chat.hbs?raw';

const Chat = connect(class extends Block {
  constructor(props: Props) {
    super({
      ...props,
      focusOutHandler,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
});

export { Chat };
