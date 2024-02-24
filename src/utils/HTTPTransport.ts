import { BASE_URL, DEFAULT_HEADERS } from '../../config';

interface MethodOptions {
  headers?: object,
  data?: unknown,
  timeout?: number,
}

interface RequestOptions extends MethodOptions {
  method: METHODS,
}

type HTTPMethod = (url: string, options?: MethodOptions) => Promise<unknown>;

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

function queryStringify(data = {}) {
  const res: string[] = [];
  Object.entries(data).forEach((arr) => {
    const query = `${arr[0]}=${arr[1]}`;
    res.push(query);
  });
  return `?${res.join('&')}`;
}

class HTTPTransport {
  private apiUrl: string = '';

  constructor(path: string) {
    this.apiUrl = `${BASE_URL}${path}`;
  }

  get: HTTPMethod = (url, options) => this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.GET });

  post: HTTPMethod = (url, options) => this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.POST });

  put: HTTPMethod = (url, options) => this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.PUT });

  delete: HTTPMethod = (url, options) => this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.DELETE });

  request = (url: string, options: RequestOptions) => {
    const {
      method, data, headers, timeout = 5000,
    } = options;
    const requestHeaders = headers || DEFAULT_HEADERS;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      let xhrUrl = url;
      if (method === METHODS.GET && data && typeof url === 'string') {
        const strData = queryStringify(data);
        xhrUrl = url + strData;
      }

      xhr.open(method, xhrUrl);
      xhr.withCredentials = true;

      if (Object.entries(requestHeaders).length) {
        Object.entries(requestHeaders).forEach((arr) => {
          xhr.setRequestHeader(arr[0], arr[1]);
        });
      }

      xhr.timeout = timeout;

      xhr.onload = () => resolve(xhr);

      xhr.onerror = () => reject(new Error('request error'));

      xhr.onabort = () => reject(new Error('request aborted'));

      xhr.ontimeout = () => reject(new Error('request timeout'));

      if (method === METHODS.GET) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        const json = JSON.stringify(data);
        xhr.send(json);
      }
    });
  };
}

export default HTTPTransport;
