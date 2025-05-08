
import React from 'react';
import { Search, MessagesSquare, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeaderProps = {
  toggleChat: () => void;
};

const Header = ({ toggleChat }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-8">
        <a href="/" className="text-shop-purple text-2xl font-bold">shop</a>
        <nav className="flex gap-6">
          <a href="/" className="text-gray-700 hover:text-shop-purple">Home</a>
          <a href="/explore" className="text-gray-700 hover:text-shop-purple">Explore</a>
        </nav>
      </div>
      
      <div className="relative flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="shoes" 
            className="pl-10 pr-10 py-2 w-full rounded-full bg-gray-100 border-none" 
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5">
            ⨯
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={toggleChat}
        >
          <MessagesSquare className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Heart className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <ShoppingCart className="h-5 w-5" />
        </Button>
        <Button variant="link" className="text-black">Sign in</Button>
      </div>
    </header>
  );
};

export default Header;
