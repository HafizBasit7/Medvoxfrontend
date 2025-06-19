// context/MessageContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import MessageModal from '../Components/MessageModal';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  const showMessage = useCallback((type, message, duration = 2500) => {
    setType(type);
    setMessage(message);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, duration);
  }, []);

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <MessageModal visible={visible} type={type} message={String(message)} />
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
