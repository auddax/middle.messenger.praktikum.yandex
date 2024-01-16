type Options = {
  method: METHODS,
  headers?: object,
  data?: unknown,
  timeout?: number,
};

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
  get = (url: string, options: Options) => this.request(url, { ...options, method: METHODS.GET });

  post = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.POST });

  put = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.PUT });

  delete = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.DELETE });

  request = (url: string, options: Options) => {
    const {
      method, data, headers = {}, timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let xhrUrl = url;
      if (method === METHODS.GET && data && typeof url === 'string') {
        const strData = queryStringify(data);
        xhrUrl = url + strData;
      }
      if (headers) {
        if (Object.entries(headers).length) {
          Object.entries(headers).forEach((arr) => {
            xhr.setRequestHeader(arr[0], arr[1]);
          });
        }
      }
      xhr.open(method, xhrUrl);
      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onerror = function () {
        reject(new Error('request error'));
      };

      xhr.onabort = function () {
        reject(new Error('request aborted'));
      };

      xhr.ontimeout = function () {
        reject(new Error('request timeout'));
      };

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        const json = JSON.stringify(data);
        xhr.send(json);
      }
    });
  };
}

export default HTTPTransport;
