import { expect } from 'chai';
import sinon from 'sinon';
import Block from './Block';
import { Props } from '../types';

describe('Block', () => {
  let PageClass: typeof Block;

  before(() => {
    class Page extends Block {
      constructor(props: Props) {
        super({
          ...props,
        });
      }

      protected render(): string {
        return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`;
      }
    }

    PageClass = Page;
  });

  it('is not null', () => {
    const pageComponent = new PageClass({ text: 'text' } as Props);
    expect(pageComponent.getContent()).not.null;
  });

  it('should create component with props', () => {
    const text = 'Hello';
    const pageComponent = new PageClass({ text } as Props);

    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  it('is reactive', () => {
    const text = 'new value';
    const pageComponent = new PageClass({ text: 'Hello' } as Props);

    pageComponent.setProps({ text });
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  it('adds event listeners to elements', () => {
    const handlerStub = sinon.stub();
    const pageComponent = new PageClass({
      events: {
        click: handlerStub,
      },
    });

    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);

    expect(handlerStub.calledOnce).to.be.true;
  });

  it('should call dispatchComponentDidMount method', () => {
    const clock = sinon.useFakeTimers();
    const pageComponent = new PageClass();

    const spyCDM = sinon.spy(pageComponent, 'componentDidMount');

    const element = pageComponent.getContent();
    document.body.append(element!);
    clock.next();

    expect(spyCDM.calledOnce).to.be.true;
  });
});
