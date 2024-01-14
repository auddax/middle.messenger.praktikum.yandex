import Block from 'src/core/Block';
import template from './Title.hbs?raw';

type TitleProps = {
  level: string;
}

class Title extends Block {
  constructor(props: TitleProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Title };
