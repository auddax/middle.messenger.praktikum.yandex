import { assert, expect } from 'chai';
import sinon from 'sinon';
import Router from './Router';
import { LoginPage } from '../pages';
import { ROOT_QUERY } from '../../config';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router(ROOT_QUERY);
  });

  describe('Router object', () => {
    it('is not null', () => {
      expect(router).not.null;
    });

    it('has only single instance', () => {
      const routerNew = new Router(ROOT_QUERY);
      assert.equal(routerNew, router);
    });
  });

  describe('Router methods', () => {
    describe('getRoute method', () => {
      it('should return null on not added path', () => {
        assert.equal(router.getRoute('/login'), null);
      });

      it('should return not null on added path', () => {
        router.use('/login', LoginPage);
        expect(router.getRoute('/login')).not.null;
      });
    });

    describe('go method', () => {
      it('adds an entry to the history stack', () => {
        router.use('/login', LoginPage);
        sinon.spy(window.history, 'pushState');
        router.go('/login');
        assert.equal(window.location.pathname, '/login');
      });
    });

    describe('start method', () => {
      it('adds a popstate event listener', () => {
        assert.equal(window.onpopstate, null);
        router.start();
        expect(window.onpopstate).not.null;
      });
    });
  });
});
