
import React, { useState, useEffect } from 'react';
import { X, Send, Bot, Maximize, Minimize, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

type MessageType = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type ChatBotProps = {
  isOpen: boolean;
  onClose: () => void;
  onMaximizeChange: (isMaximized: boolean) => void;
};

const Message = ({ message }: { message: MessageType }) => {
  const handleThumbsUp = () => {
    console.log('Feedback: Thumbs up for message', message.id);
  };

  const handleThumbsDown = () => {
    console.log('Feedback: Thumbs down for message', message.id);
  };

  return (
    <div className={`flex mb-4 ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
      {message.sender === 'bot' && (
        <div className="h-8 w-8 rounded-full bg-shop-purple text-white flex items-center justify-center mr-2">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div className={`flex flex-col max-w-xs`}>
        <div className={`p-3 rounded-lg ${
          message.sender === 'bot' 
            ? 'bg-gray-100 text-black' 
            : 'bg-shop-purple text-white'
        }`}>
          <p className="text-sm">{message.text}</p>
        </div>
        
        {message.sender === 'bot' && (
          <div className="flex mt-1 gap-2">
            <button 
              onClick={handleThumbsUp}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ThumbsUp className="h-4 w-4 text-gray-500" />
            </button>
            <button 
              onClick={handleThumbsDown}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ThumbsDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ChatBot = ({ isOpen, onClose, onMaximizeChange }: ChatBotProps) => {
  const [visible, setVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      text: 'Hi there! I can help you find the perfect shoes. What type are you looking for today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  // Use an effect to handle visibility with animation
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      console.log("ChatBot is now visible");
    } else {
      console.log("ChatBot is now hidden");
      setVisible(false);
      setIsMaximized(false); // Reset maximized state when closing
      onMaximizeChange(false); // Notify parent that chatbot is not maximized
    }
  }, [isOpen, onMaximizeChange]);

  // Use an effect to notify parent component when maximized state changes
  useEffect(() => {
    onMaximizeChange(isMaximized);
  }, [isMaximized, onMaximizeChange]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: MessageType = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const newBotMessage: MessageType = {
        id: messages.length + 2,
        text: 'Connect me to backend first',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 800);
  };

  const toggleMaximize = () => {
    setIsMaximized(prev => !prev);
    console.log("Chatbot maximized state:", !isMaximized);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  if (!visible) {
    return null;
  }

  // Reduced to only 3 suggestions
  const suggestions = ['Sneakers', 'Running shoes', 'Boots'];

  return (
    <div 
      className={`fixed bg-white rounded-lg shadow-lg overflow-hidden border z-50 transition-all duration-300 ease-in-out ${
        isMaximized 
          ? 'right-0 top-[72px] bottom-0 w-[380px] border-l-2 border-shop-purple/20 rounded-none' 
          : 'right-6 bottom-6 w-80'
      }`}
    >
      <div className="p-4 bg-shop-darkPurple border-b flex justify-between items-center">
        <h3 className="font-medium text-shop-purple">Shop AI</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMaximize} className="h-6 w-6 hover:bg-white/10">
            {isMaximized ? <Minimize className="h-4 w-4 text-shop-purple" /> : <Maximize className="h-4 w-4 text-shop-purple" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 hover:bg-white/10">
            <X className="h-4 w-4 text-shop-purple" />
          </Button>
        </div>
      </div>
      
      <div className={`p-4 overflow-y-auto flex flex-col ${isMaximized ? 'h-[calc(100vh-12.5rem-72px)]' : 'max-h-96'}`}>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      
      <div className={`${isMaximized ? 'p-3 pb-2' : 'p-4'} border-t bg-white`}>
        {/* Reduced to only 3 suggestions that fit in one line */}
        <div className={`flex gap-2 ${isMaximized ? 'mb-2' : 'mb-3'}`}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 text-xs rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              {suggestion}
            </button>
          ))}
        </div>
        <div className="relative flex items-center">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="w-full px-4 py-2 pr-10 bg-gray-100 rounded-full focus:outline-none text-sm min-h-[42px] border border-gray-200"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSendMessage} 
            className="absolute right-1 h-7 w-7"
          >
            <Send className="h-4 w-4 text-shop-purple" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
