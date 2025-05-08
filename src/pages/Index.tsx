
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import RelatedShops from "@/components/RelatedShops";
import Results from "@/components/Results";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(prevState => !prevState);
    console.log("Chat toggle clicked, new state:", !isChatOpen);
  };

  // Debug log to track state changes
  useEffect(() => {
    console.log("Chat state updated:", isChatOpen);
  }, [isChatOpen]);

  return (
    <div className="min-h-screen bg-white">
      <Header toggleChat={toggleChat} />
      <Filters />
      <div className="max-w-[1800px] mx-auto">
        <RelatedShops />
        <Results />
      </div>
      
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
