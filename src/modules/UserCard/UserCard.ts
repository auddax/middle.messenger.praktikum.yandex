import Block from 'src/core/Block';
import template from './UserCard.hbs?raw';

type UserCardProps = {
  userName: string;
  userCardText: string;
  userCardDateTime: string;
}

class UserCard extends Block {
  constructor(props: UserCardProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { UserCard };
