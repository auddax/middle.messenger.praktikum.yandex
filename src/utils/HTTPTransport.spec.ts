import sinon, { SinonStub } from 'sinon';
import { assert } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
  let http: HTTPTransport;
  let requestStub: SinonStub;

  beforeEach(() => {
    http = new HTTPTransport('/test');
    requestStub = sinon.stub(http, 'request').callsFake(() => Promise.resolve<unknown>({ status: 200, data: 'data' }));
  });

  afterEach(() => {
    sinon.restore();
  });

  it('get should make GET request', () => {
    http.get('/url');
    assert(requestStub.calledOnce);
    assert(requestStub.calledWithMatch('/url'));
  });

  it('put should make PUT request', () => {
    http.put('/url');
    assert(requestStub.calledOnce);
    assert(requestStub.calledWithMatch('/url'));
  });

  it('post should make POST request', () => {
    http.post('/url');
    assert(requestStub.calledOnce);
    assert(requestStub.calledWithMatch('/url'));
  });

  it('delete should make DELETE request', () => {
    http.delete('/url');
    assert(requestStub.calledOnce);
    assert(requestStub.calledWithMatch('/url'));
  });
});
