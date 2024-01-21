import Block from 'src/core/Block';
import template from './Avatar.hbs?raw';

class Avatar extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { Avatar };
