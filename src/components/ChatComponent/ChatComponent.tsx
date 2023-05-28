import './styles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Layout, List, Input } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../reducers/actions';
import { RootState } from '../../reducers/types';
import { Chat } from '../../types/chat';

const { Content, Sider } = Layout;

const ChatComponent = (props: {userName: string}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [userName, setUserName] = useState(() => {
    const storedUserName = localStorage.getItem('userName');
    return storedUserName ? storedUserName : '';
  });
  const handleBackButtonClick = () => {
    navigate('/');
  };

  const handleChangeChat = (chatId: number) => {
    setSelectedChat(chatId);
  };

  const chatData = useSelector((state: RootState) => state.chatData);
  console.log(chatData);
  const [selectedChat, setSelectedChat] = useState<number | null>(Number(chatId ? chatId[chatId?.length - 1] : null));
  const [inputValue, setInputValue] = useState('');

  const selectedChatData = selectedChat ? chatData.find((chat: Chat) => chat.id === selectedChat) : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '' && selectedChat !== null) {
      dispatch(sendMessage(selectedChat, `${userName}: ${inputValue.trim()}`));
      setInputValue('');
    }
  };

  console.log(selectedChatData?.messages);

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
          renderItem={(item: Chat) => (
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
                      {selectedChatData.messages.map((message: string, index: number) => (
                        <div className='message-content' key={index}>
                          <li><span>{message}</span></li>
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