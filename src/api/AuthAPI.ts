import HTTPTransport from 'src/utils/HTTPTransport';

const authApi = new HTTPTransport('/auth');

class AuthAPI {
  async createUser(data: object) {
    return authApi.post('/signup', { data });
  }

  async login(data: object) {
    return authApi.post('/signin', { data });
  }

  async getUser() {
    return authApi.get('/user');
  }

  async logout() {
    return authApi.post('/logout');
  }
}

export default new AuthAPI();
