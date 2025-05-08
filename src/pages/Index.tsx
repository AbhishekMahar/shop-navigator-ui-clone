
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import RelatedShops from "@/components/RelatedShops";
import Results from "@/components/Results";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleChat = () => {
    setIsChatOpen(prevState => !prevState);
    console.log("Chat toggle clicked, new state:", !isChatOpen);
  };

  // Track window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debug log to track state changes
  useEffect(() => {
    console.log("Chat state updated:", isChatOpen);

    // Add or remove class from body based on chat state
    if (isChatOpen) {
      document.body.classList.add('chat-open');
    } else {
      document.body.classList.remove('chat-open');
    }
  }, [isChatOpen]);

  return (
    <div className="min-h-screen bg-white">
      <Header toggleChat={toggleChat} />
      <Filters />
      <div className={`max-w-[1800px] mx-auto transition-all duration-300 ${isChatOpen ? 'pr-[380px]' : ''}`}>
        <RelatedShops />
        <Results />
      </div>
      
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
