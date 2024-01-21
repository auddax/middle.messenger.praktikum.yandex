import Block from 'src/core/Block';
import template from './Title.hbs?raw';

class Title extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export { Title };
