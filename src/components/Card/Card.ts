import Block from 'src/core/Block';
import template from './Card.hbs?raw';

class Card extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { Card };
