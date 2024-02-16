import Block from 'src/core/Block';
import { Props } from 'src/types';

class Route {
  private _pathname: string;

  private readonly _blockClass: typeof Block;

  private _block: Block | null = null;

  private readonly _props: Props;

  constructor(pathname: string, view: typeof Block, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (pathname === this._pathname) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    this._block = new this._blockClass();
    if (!this._props.rootQuery) return;
    const container = document.getElementById(this._props.rootQuery as string);
    if (container?.firstElementChild) {
      container?.firstElementChild?.replaceWith(this._block.render());
    } else {
      container?.append(this._block.render());
    }
  }
}

export default Route;
