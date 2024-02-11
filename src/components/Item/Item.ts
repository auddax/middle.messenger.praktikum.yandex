import Block from 'src/core/Block';
import template from './Item.hbs?raw';

export type ItemProps = {
  itemClassName: string;
  onClick?: () => void;
};

class Item extends Block {
  constructor(props: ItemProps) {
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

export { Item };
