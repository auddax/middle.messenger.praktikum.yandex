import ChatAPI from 'src/api/ChatAPI';
import { RequestResult, ChatResponse, SocketResponse } from 'src/types';
import { transformChatData } from 'src/modules/ChatsList/ChatsList';
import { handleError } from 'src/utils/handlers';

export const getChats = async (): Promise<ChatResponse[]> => {
  const resp = await ChatAPI.getChats() as RequestResult;
  if (resp.status !== 200) handleError(resp);
  const responseObj = JSON.parse(resp.response);
  return responseObj;
};

export const createChat = async (title: string) => {
  const resp = await ChatAPI.createChat({ title }) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  const chatsResponse = await getChats();
  if (chatsResponse) {
    const chats = chatsResponse.map((obj) => transformChatData(obj));
    window.store.set({ chats });
  }
  const responseObj = JSON.parse(resp.response);
  return responseObj;
};

export const deleteChat = async (chatId: number): Promise<ChatResponse> => {
  const resp = await ChatAPI.deleteChat({ chatId }) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  const responseObj = JSON.parse(resp.response);
  return responseObj;
};

export const addUsersToChat = async (users: number[], chatId: number): Promise<string> => {
  const resp = await ChatAPI.addUsersToChat({ users, chatId }) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  return resp.response;
};

export const deleteUsersFromChat = async (users: number[], chatId: number): Promise<string> => {
  const resp = await ChatAPI.deleteUsersFromChat({ users, chatId }) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  return resp.response;
};

export const getChatToken = async (id: number): Promise<string> => {
  const resp = await ChatAPI.getChatToken(id) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  const responseObj = JSON.parse(resp.response);
  return responseObj.token;
};

export const initChat = async (chatId: number, userId: number | string) => {
  const token = await getChatToken(chatId);
  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

  setInterval(() => {
    socket.send(JSON.stringify({
      type: 'ping',
    }));
  }, 5000);

  const handleSubmitMessage = (event: Event) => {
    event.preventDefault();
    const messageInputElement = document.getElementById('chatMessageInput') as HTMLInputElement;
    const message = messageInputElement?.value;
    socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
    messageInputElement.value = '';
  };

  const renderMessage = (data: SocketResponse) => {
    if (data.type !== 'message') return;
    const chatMessagesList = document.getElementById('chatMessagesList');
    const div = document.createElement('div');

    div.classList.add('message');

    if (data.user_id === Number(userId)) {
      div.classList.add('message_out');
    } else {
      div.classList.add('message_in');
    }
    div.textContent = data.content;

    if (chatMessagesList) {
      chatMessagesList?.append(div);
      chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
    }
  };

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
    window.store.set({ isOpenChat: true });

    const buttonElement = document.getElementById('sendMessageButton');
    const formElement = document.getElementById('messageForm');
    buttonElement?.addEventListener('click', handleSubmitMessage);
    formElement?.addEventListener('submit', handleSubmitMessage);

    socket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
    window.store.set({ isOpenChat: false });
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch {
      console.log(event);
    }

    if (Array.isArray(data) && data?.length) {
      data.reverse().forEach((message) => renderMessage(message));
    } else {
      renderMessage(data);
    }
  });
};
