
import React, { useState } from "react";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import RelatedShops from "@/components/RelatedShops";
import Results from "@/components/Results";
import ChatBot from "@/components/ChatBot";
import { MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Filters />
      <div className="max-w-[1800px] mx-auto">
        <RelatedShops />
        <Results />
      </div>
      
      {isChatOpen && <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
      
      {!isChatOpen && (
        <Button 
          className="fixed right-6 bottom-6 h-12 w-12 bg-shop-purple hover:bg-shop-purple/90 rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setIsChatOpen(true)}
        >
          <MessagesSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Index;
