import Block from '../../core/Block';
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

  protected render() {
    return template;
  }
}

export { Card };
