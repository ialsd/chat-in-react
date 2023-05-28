import './styles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Layout, List, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import chatDataJSON from '../../data/chatData.json'

const { Content, Sider } = Layout;

const ChatComponent = () => {
  const navigate = useNavigate();

  const { chatId } = useParams();

  const handleBackButtonClick = () => {
    navigate('/');
  };

  const handleChangeChat = (chatId: number) => {
    setSelectedChat(chatId);
  };

  const [chatData, setChatData] = useState(chatDataJSON);

  const [selectedChat, setSelectedChat] = useState(Number(chatId ? chatId[chatId?.length - 1] : null));
  const [inputValue, setInputValue] = useState('');

  const selectedChatData = selectedChat ? chatData.find((chat) => chat.id === selectedChat) : null;

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = inputValue.trim();
      const updatedChatData = chatData.map((chat) => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      });
      // Обновление состояния chatData
      setChatData(updatedChatData);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (selectedChat) {
      navigate(`/chat/${selectedChat}`);
    }
  }, [selectedChat]);

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Sider theme="light" width={200}>
        <List
          dataSource={chatData}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              className={`chat-item ${selectedChat === item.id ? 'selected' : ''}`}
              onClick={() => handleChangeChat(item.id)}
            >
              <Button type="link">{item.label}</Button>
            </List.Item>
          )}
        />
      </Sider>
      <div className="chat-full">
        <div className="chat-container">
          <Layout>
            <Content style={{ width: '1100px', height: '80vh' }}>
              {selectedChatData ? (
                <div className="chat-messages">
                  <div className="chat">
                    <h3>{selectedChatData.label}</h3>
                    <ul>
                      {selectedChatData.messages.map((message, index) => (
                        <div className='message-content'>
                            <li key={index}><span>{message}</span></li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="no-chat-selected">No chat selected</div>
              )}
            </Content>
          </Layout>
          <Sider theme="light" width={100}>
            <Button type="primary" danger onClick={handleBackButtonClick}>
              Back
            </Button>
          </Sider>
        </div>
        <Content style={{ backgroundColor: 'white' }}>
          <div className="chat-input">
            <Input.TextArea rows={4} value={inputValue} onChange={handleInputChange} />
            <Button type="primary" style={{ marginLeft: '20px' }} onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </Content>
      </div>
    </Layout>
  );
};

export default ChatComponent;