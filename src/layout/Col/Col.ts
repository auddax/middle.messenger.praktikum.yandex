import Block from 'src/core/Block';
import template from './Col.hbs?raw';

type ColProps = {
  colClassName: string;
};
class Col extends Block {
  constructor(props: ColProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Col };
