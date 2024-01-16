import Block from 'src/core/Block';
import template from './Row.hbs?raw';

type RowProps = {
  rowClassName: string;
};

class Row extends Block {
  constructor(props: RowProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Row };
