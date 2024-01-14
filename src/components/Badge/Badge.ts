import Block from 'src/core/Block';
import template from './Badge.hbs?raw';

type BadgeProps = {
  badgeText: string;
}

class Badge extends Block {
  constructor(props: BadgeProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Badge };
