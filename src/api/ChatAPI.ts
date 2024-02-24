import HTTPTransport from '../utils/HTTPTransport';

const chatApi = new HTTPTransport('/chats');

class ChatAPI {
  async createChat(data: object) {
    return chatApi.post('/', { data });
  }

  async getChats() {
    return chatApi.get('/');
  }

  async deleteChat(data: object) {
    return chatApi.delete('/', { data });
  }

  async addUsersToChat(data: object) {
    return chatApi.put('/users', { data });
  }

  async deleteUsersFromChat(data: object) {
    return chatApi.delete('/users', { data });
  }

  async getChatToken(id: number) {
    return chatApi.post(`/token/${id}`);
  }
}

export default new ChatAPI();
