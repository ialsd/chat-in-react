import React, { useState } from 'react';
import './App.css';
import AuthorizationWindow from './components/AuthorizationWindow/AuthorizationWindow';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatComponent from './components/ChatComponent/ChatComponent';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const [userName, setUserName] = useState('');
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<AuthorizationWindow setUserName={setUserName}/>} />
            <Route path="/chat/:chatId" element={<ChatComponent userName={userName}/>} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;