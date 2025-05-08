import React, { useState, useEffect, useRef } from 'react';
import { Search, MessagesSquare, Heart, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeaderProps = {
  toggleChat: () => void;
};

const Header = ({ toggleChat }: HeaderProps) => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Show suggestions after delay when focused and no text
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFocused && searchText === '') {
      timer = setTimeout(() => {
        setShowSuggestions(true);
      }, 2500);
    } else {
      setShowSuggestions(false);
    }
    return () => clearTimeout(timer);
  }, [isFocused, searchText]);

  const handleClearSearch = () => {
    setSearchText('');
    // Keep focus on the input after clearing
    inputRef.current?.focus();
  };

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
            ref={inputRef}
            type="text" 
            placeholder=""
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // Small delay to allow clicking on suggestions
              setTimeout(() => setIsFocused(false), 200);
            }}
            className="pl-10 pr-10 py-2 w-full rounded-full bg-gray-100 border-none" 
          />
          {searchText && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 -mt-0.5" 
              onClick={handleClearSearch}
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          {/* Search suggestions - shown after 2.5 seconds when focused with no text */}
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              <div className="px-3 py-2 text-sm text-gray-500 border-b">Popular searches</div>
              <div className="py-1">
                <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">shoes</div>
                <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">t-shirts</div>
                <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">headphones</div>
                <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">watches</div>
              </div>
            </div>
          )}
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
