
import React, { useState, useEffect } from 'react';
import { X, Send, Bot, Maximize, Minimize } from 'lucide-react';
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
};

const Message = ({ message }: { message: MessageType }) => {
  return (
    <div className={`flex mb-4 ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
      {message.sender === 'bot' && (
        <div className="h-8 w-8 rounded-full bg-[#9b87f5] text-white flex items-center justify-center mr-2">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div className={`max-w-xs p-3 rounded-lg ${
        message.sender === 'bot' 
          ? 'bg-gray-100 text-black' 
          : 'bg-[#9b87f5] text-white'
      }`}>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [visible, setVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      text: 'What type of shoes are you looking for? Are you interested in sneakers, dress shoes, sandals, or something else?',
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
    }
  }, [isOpen]);

  // Use an effect to handle body class when maximized
  useEffect(() => {
    if (isMaximized) {
      document.body.classList.add('chatbot-maximized');
    } else {
      document.body.classList.remove('chatbot-maximized');
    }
    
    return () => {
      document.body.classList.remove('chatbot-maximized');
    };
  }, [isMaximized]);

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
      let botResponse;
      if (inputValue.toLowerCase().includes('sneaker') || 
          inputValue.toLowerCase().includes('running')) {
        botResponse = "Great choice! Do you have a specific color or style in mind for the sneakers?";
      } else {
        botResponse = "I found some options for you. Is there a particular brand or feature you're looking for in your shoes?";
      }
      
      const newBotMessage: MessageType = {
        id: messages.length + 2,
        text: botResponse,
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

  if (!visible) {
    return null;
  }

  return (
    <div 
      className={`fixed bg-white rounded-lg shadow-lg overflow-hidden border z-50 transition-all duration-300 ease-in-out ${
        isMaximized 
          ? 'right-0 top-[72px] bottom-0 w-[380px] border-l-2 border-[#9b87f5]/20 rounded-none' 
          : 'right-6 bottom-6 w-80'
      }`}
    >
      <div className="p-4 bg-white border-b flex justify-between items-center">
        <h3 className="font-medium text-[#7e69ab]">Shop AI</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMaximize} className="h-6 w-6 hover:bg-[#9b87f5]/10">
            {isMaximized ? <Minimize className="h-4 w-4 text-[#9b87f5]" /> : <Maximize className="h-4 w-4 text-[#9b87f5]" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 hover:bg-[#9b87f5]/10">
            <X className="h-4 w-4 text-[#9b87f5]" />
          </Button>
        </div>
      </div>
      
      <div className={`p-4 overflow-y-auto flex flex-col ${isMaximized ? 'h-[calc(100vh-10rem-72px)]' : 'max-h-96'}`}>
        <div className="py-2 px-4 bg-gray-100 rounded-md mb-4">
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="black running sneakers"
              className="w-full py-1 px-2 text-sm bg-transparent border-none focus:outline-none"
            />
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center pt-1 text-xs text-gray-500">
            +4 filters
          </div>
        </div>
        
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      
      <div className="p-4 border-t bg-white">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="w-full px-4 py-2 pr-10 bg-gray-100 rounded-full focus:outline-none text-sm"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSendMessage} 
            className="absolute right-1 h-7 w-7"
          >
            <Send className="h-4 w-4 text-[#9b87f5]" />
          </Button>
        </div>
        <div className="flex justify-between mt-2">
          <Button variant="ghost" size="sm" className="text-xs h-6 text-[#9b87f5]">
            Customize more
          </Button>
          <Button size="sm" className="text-xs h-6 bg-[#9b87f5] hover:bg-[#7E69AB]">
            Getting Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
