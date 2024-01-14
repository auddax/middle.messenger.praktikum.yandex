import Block from 'src/core/Block';
import template from './Page.hbs?raw';

type PageProps = {
  className: string;
}

class Page extends Block {
  constructor(props: PageProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Page };
