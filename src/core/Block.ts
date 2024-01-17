import { v4 as uuidv4 } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

type Props = {
  [key: string | symbol]: unknown | Block;
  events?: Events;
};

type Child = { embed: (content: DocumentFragment) => void };

type Events = { [key: string]: (() => void) | undefined };

type Children = { [key: string]: Block };

type Refs = { [key: string]: Element | Block };

class Block {
  protected props: Props;

  public children: Children;

  protected refs: Refs = {};

  private eventBus: EventBus;

  private _element: HTMLElement | null = null;

  public id: string = uuidv4();

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  constructor(propsWithChildren: Props = {}) {
    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.eventBus = new EventBus();

    this._registerEvents(this.eventBus);

    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(propsWithChildren: Props) {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _makePropsProxy(props: Props) {
    const self = this;

    const propsProxy = new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });

    return propsProxy;
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((e) => {
      this._element?.addEventListener(e, events[e]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((event) => {
      this._element?.removeEventListener(event, events[event]);
    });
  }

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    this._removeEvents();

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (response) this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  compile(template: string, context: { [key: string]: unknown }) {
    const contextAndStubs: { [key: string]: unknown } = { ...context, __refs: this.refs };

    Object.entries(this.children).forEach(([key, child]) => {
      contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(contextAndStubs);
    (contextAndStubs.__children as Child[])?.forEach(({ embed }) => {
      embed(fragment.content);
    });

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      const childContent = child.getContent();
      if (stub && childContent) stub.replaceWith(childContent);
    });

    return fragment.content;
  }

  init() {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  getContent() {
    return this.element;
  }

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidUpdate() {
    return true;
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  componentDidMount() {}

  setProps = (nextProps: { [key: string]: unknown }) => {
    if (!nextProps) {
      return;
    }
    if (this.props !== nextProps) {
      Object.assign(this.props, nextProps);
    }
  };

  get element() {
    return this._element;
  }

  show() {
    if (this._element) {
      this._element.style.display = 'block';
    }
  }

  hide() {
    if (this._element) {
      this._element.style.display = 'none';
    }
  }
}

export default Block;
