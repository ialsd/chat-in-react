import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import chatReducer from './reducers/reducers';

// Получение сохраненного состояния из localStorage
const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState')!)
  : {};
const initialState = {
    chatData: [
        {
        id: 1,
        name: 'chat1',
        label: 'Game chat',
        messages: [],
        },
        {
        id: 2,
        name: 'chat2',
        label: 'Work chat',
        messages: [],
        },
        {
        id: 3,
        name: 'chat3',
        label: 'Family chat',
        messages: [],
        },
    ]
};

const mergedState = {
    ...initialState, 
    ...persistedState
}

const store = createStore(chatReducer, mergedState, applyMiddleware(thunk));

// Сохранение состояния в localStorage при изменении
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
});

export default store;