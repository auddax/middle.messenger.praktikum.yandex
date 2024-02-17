import Block from 'src/core/Block';
import template from './Title.hbs?raw';

class Title extends Block {
  protected render() {
    return template;
  }
}

export { Title };
