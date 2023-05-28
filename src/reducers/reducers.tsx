import { SEND_MESSAGE } from './actions';

const initialState = {
  chatData: [
    {
      id: 1,
      name: 'chat1',
      label: 'Game chat',
      messages: ['Message 1', 'Message 2', 'Message 3'],
    },
    {
      id: 2,
      name: 'chat2',
      label: 'Work chat',
      messages: ['Message 4', 'Message 5', 'Message 6'],
    },
    {
      id: 3,
      name: 'chat3',
      label: 'Family chat',
      messages: ['Message 7', 'Message 8', 'Message 9'],
    },
  ],
};

const chatReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const { chatId, message } = action.payload;
      const updatedChatData = state.chatData.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, message],
          };
        }
        return chat;
      });
      return {
        ...state,
        chatData: updatedChatData,
      };
    default:
      return state;
  }
};

export default chatReducer;