import Block from '../../core/Block';
import template from './Avatar.hbs?raw';

type AvatarProps = {
  avatarAltText?: string;
  avatarType: string;
  onClick?: () => void;
};

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render() {
    return template;
  }
}

export { Avatar };
