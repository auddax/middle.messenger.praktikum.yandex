import Block from 'src/core/Block';
import template from './UserCard.hbs?raw';

class UserCard extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { UserCard };
