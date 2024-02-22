import { expect } from 'chai';
import { LoginCard } from './LoginCard';

describe('LoginCard', () => {
  const loginCard = new LoginCard();

  describe('LoginCard object', () => {
    it('is not null', () => {
      expect(loginCard).not.null;
    });

    it('render html content', () => {
      const component = loginCard.getContent();
      expect(component).to.be.a('HTMLElement');
    });
  });

  describe('LoginCard html element', () => {
    const component = loginCard.getContent();

    it('has an input with name login', () => {
      const element = component?.querySelector('#loginCardLogin');
      expect(element).not.null;
      expect(element?.getAttribute('name')).to.equal('login');
    });

    it('has an input with name password', () => {
      const element = component?.querySelector('#loginCardPassword');
      expect(element).not.null;
      expect(element?.getAttribute('name')).to.equal('password');
    });
  });
});
