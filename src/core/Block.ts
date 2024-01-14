import EventBus from './EventBus'
import { v4 as uuidv4 } from 'uuid';
import Handlebars from 'handlebars';

class Block {
  protected props: { [key: string]: unknown };
  protected refs: { [key: string]: Block } = {};
  public children: { [key: string]: Block };
  public id: string = uuidv4();
  private eventBus: EventBus;
  private _element: HTMLElement | null = null;

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };
  
  constructor(propsWithChildren: object = {}) {
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
  
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.eventBus = new EventBus();;
  
    this._registerEvents(this.eventBus);

    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(propsWithChildren: object) {
    const children: { [key: string]: Block } = {};
    const props: { [key: string]: unknown } = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
    if (value instanceof Block) {
            children[key] = value;
    } else {
            props[key] = value;
        }
    });

    return { children, props };
  }

  private _makePropsProxy(props: { [key: string | symbol]: unknown }) {
    const self = this;

    const propsProxy = new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target }
        target[prop] = value;
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
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
    const { events = {} } = this.props as { events: { [key: string]: () => void } }
    Object.keys(events).forEach(e => {
      this._element?.addEventListener(e, events[e]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props as { events: { [key: string]: () => void } }
    Object.keys(events).forEach(event => {
      this._element?.removeEventListener(event, events[event])
    });
  }

  // private _render() {
  //   const propsAndStubs = { ...this.props };

  //   this._removeEvents();

  //   Object.entries(this.children).forEach(([key, child]) => {
  //       propsAndStubs[key] = `<div data-id="${child.id}"></div>`
  //   });

  //   const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

  //   fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
  //   const newElement = fragment.content.firstElementChild as HTMLElement;

  //   Object.values(this.children).forEach(child => {
  //       const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
  //       const childContent = child.getContent();
  //       if (stub && childContent) stub.replaceWith(childContent);
  //   });

  //   if (this._element && newElement) {
  //       this._element.replaceWith(newElement);
  //   }
  
  //   this._element = newElement;

  //   this._addEvents();
  // }

  private _render() {
    const fragment = this.render()
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement;
    this._addEvents();
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (response) this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  compile(template: string, context: { [key: string]: unknown }) {
    const contextAndStubs = { ...context, __refs: this.refs };

    Object.entries(this.children).forEach(([key, child]) => {
      contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(contextAndStubs);
    contextAndStubs.__children?.forEach(({ embed }: any) => {
      embed(fragment.content);
    });

    Object.values(this.children).forEach(child => {
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
    return new DocumentFragment()
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
      this._element.style.display = 'block'
    }
  }

  hide() {
    if (this._element) {
      this._element.style.display = 'none'
    }
  }
}

export default Block;
