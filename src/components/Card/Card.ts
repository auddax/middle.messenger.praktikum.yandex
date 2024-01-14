import Block from 'src/core/Block';
import template from './Card.hbs?raw';

type CardProps = {
  cardClassName: string;
}

class Card extends Block {
  constructor(props: CardProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Card };
