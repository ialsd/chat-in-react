import React from 'react';
import './App.css';
import AuthorizationWindow from './components/AuthorizationWindow/AuthorizationWindow';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatComponent from './components/ChatComponent/ChatComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<AuthorizationWindow />}></Route>
          <Route path='/chat/:chatId' element={<ChatComponent />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
