import React, { useState } from 'react';
import { Input, Select, Button, Form } from 'antd';
import './styles.scss';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AuthorizationWindow = (props: any) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
  
    const handleFormSubmit = (values: any) => {
      localStorage.setItem('userName', values.name);
      props.setUserName(values.name);
      navigate(`/chat/${values.chat}`);
    };
  
    return (
      <div className='modal-container'>
        <div className='modal-form'>
          <Form form={form} onFinish={handleFormSubmit}>
            <Title style={{fontSize: '25px'}}>Авторизируйтесь</Title>
            <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Введите имя' }]}>
              <Input />
            </Form.Item>
    
            <Form.Item label="Чат" name="chat" rules={[{ required: true, message: 'Выберите чат' }]}>
              <Select>
                <Option value="chat1">Game chat</Option>
                <Option value="chat2">Work chat</Option>
                <Option value="chat3">Family chat</Option>
              </Select>
            </Form.Item>
    
            <Form.Item>
              <Button type="primary" htmlType="submit">Отправить</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  };
  
  export default AuthorizationWindow;