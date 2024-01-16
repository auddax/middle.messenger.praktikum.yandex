import Block from 'src/core/Block';
import template from './Avatar.hbs?raw';

type AvatarProps = {
  avatarType: string;
  avatarAltText: string;
  userInitials: string;
  path: string;
};

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Avatar };
