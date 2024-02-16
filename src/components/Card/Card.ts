import Block from 'src/core/Block';
import template from './Card.hbs?raw';

export type CardProps = {
  cardClassName: string;
  key: string;
  onClick?: () => void;
};

class Card extends Block {
  constructor(props: CardProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Card };
