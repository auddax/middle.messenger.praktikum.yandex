import HTTPTransport from 'src/utils/HTTPTransport';

const userApi = new HTTPTransport('/user');

class UserAPI {
  async editUserProfile(data: object) {
    return userApi.put('/profile', { data });
  }

  async editUserAvatar(data: object) {
    const headers = {};
    return userApi.put('/profile/avatar', { data, headers });
  }

  async searchUser(data: object) {
    return userApi.post('/search', { data });
  }

  async editUserPassword(data: object) {
    return userApi.put('/password', { data });
  }
}

export default new UserAPI();
