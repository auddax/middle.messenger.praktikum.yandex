import Block from '../../core/Block';
import template from './Badge.hbs?raw';

type BadgeProps = {
  badgeText: string;
};

class Badge extends Block {
  constructor(props: BadgeProps) {
    super({
      ...props,
    });
  }

  protected render() {
    return template;
  }
}

export { Badge };
