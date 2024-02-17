export const getCurrentChatName = (currentChat: number) => {
  const { chats } = window.store.getState();
  let currentChatName;
  if (chats?.length && currentChat) {
    const chat = chats.find((c) => currentChat === c.id);
    currentChatName = chat?.title;
  } else {
    currentChatName = 'Чат не выбран';
  }
  return currentChatName;
};
