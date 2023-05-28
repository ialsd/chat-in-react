import { AnyAction } from 'redux';

export const SEND_MESSAGE = 'SEND_MESSAGE';

export const sendMessage = (chatId: number, message: string): AnyAction => {
  return {
    type: SEND_MESSAGE,
    payload: {
      chatId,
      message,
    },
  };
};