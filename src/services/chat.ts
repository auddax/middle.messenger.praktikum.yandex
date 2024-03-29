import ChatAPI from '../api/ChatAPI';
import { RequestResult, ChatResponse, SocketResponse } from '../types';
import { transformChatData } from '../utils/helpers';
import { handleError } from '../utils/handlers';

export const getChats = async () => {
  let responseObj;
  try {
    const resp = await ChatAPI.getChats() as RequestResult;
    if (resp.status !== 200) handleError(resp);
    responseObj = JSON.parse(resp.response);
  } catch (error) {
    console.warn(error);
  }
  const chats = responseObj.map((obj: ChatResponse) => transformChatData(obj));
  window.store.set({ chats });
};

export const createChat = async (title: string) => {
  let responseObj;
  try {
    const resp = await ChatAPI.createChat({ title }) as RequestResult;
    if (resp.status !== 200) handleError(resp);
    await getChats();
    responseObj = JSON.parse(resp.response);
  } catch (error) {
    console.warn(error);
  }
  return responseObj;
};

export const deleteChat = async (chatId: number): Promise<ChatResponse> => {
  let responseObj;
  try {
    const resp = await ChatAPI.deleteChat({ chatId }) as RequestResult;
    if (resp.status !== 200) handleError(resp);
    responseObj = JSON.parse(resp.response);
  } catch (error) {
    console.warn(error);
  }
  return responseObj;
};

export const addUsersToChat = async (
  users: number[],
  chatId: number,
): Promise<string | undefined> => {
  let response;
  try {
    const resp = await ChatAPI.addUsersToChat({ users, chatId }) as RequestResult;
    if (resp.status !== 200) handleError(resp);
    response = resp.response;
  } catch (error) {
    console.warn(error);
  }
  return response;
};

export const deleteUsersFromChat = async (
  users: number[],
  chatId: number,
): Promise<string | undefined> => {
  let response;
  try {
    const resp = await ChatAPI.deleteUsersFromChat({ users, chatId }) as RequestResult;
    if (resp.status !== 200) handleError(resp);
    response = resp.response;
  } catch (error) {
    console.warn(error);
  }
  return response;
};

export const getChatToken = async (id: number): Promise<string | undefined> => {
  let responseObj;
  try {
    const resp = await ChatAPI.getChatToken(id) as RequestResult;
    if (resp.status !== 200) handleError(resp);
    responseObj = JSON.parse(resp.response);
  } catch (error) {
    console.warn(error);
  }
  return responseObj?.token;
};

export const initChat = async (chatId: number, userId: number | string) => {
  window.store.getState().socket?.close();

  const token = await getChatToken(chatId);
  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

  setInterval(() => {
    socket.send(JSON.stringify({
      type: 'ping',
    }));
  }, 5000);

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
    window.store.set({
      isOpenChat: false,
      socket: null,
      messages: [],
    });
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

  socket.addEventListener('error', (event) => {
    console.warn(event);
  });

  window.store.set({ socket });
};
