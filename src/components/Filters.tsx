
import React from 'react';
import { ChevronDown, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";

const FilterItem = ({ 
  label, 
  isActive = false, 
  hasChevron = true, 
  className = "",
  children
}: { 
  label: string, 
  isActive?: boolean,
  hasChevron?: boolean,
  className?: string,
  children?: React.ReactNode
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`${className} ${isActive ? 'bg-gray-100' : 'bg-white'} border-gray-300`}
        >
          {label}
          {hasChevron && <ChevronDown className="h-4 w-4 ml-1" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {children || (
          <>
            <DropdownMenuItem>Option 1</DropdownMenuItem>
            <DropdownMenuItem>Option 2</DropdownMenuItem>
            <DropdownMenuItem>Option 3</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Filters = () => {
  return (
    <div className="filters-container max-w-[1800px] mx-auto flex items-center gap-2 py-4 px-6 overflow-x-auto">
      <Button variant="outline" size="icon" className="border-gray-300">
        <ArrowDownUp className="h-4 w-4" />
      </Button>
      
      <FilterItem label="Category" />
      
      <FilterItem label="On sale" hasChevron={false} isActive />
      
      <FilterItem label="Ratings" />
      
      <FilterItem label="Gender" />
      
      <FilterItem label="Ships to - IN" />
      
      <FilterItem label="Size" />
      
      <FilterItem label="Color" />
      
      <div className="flex items-center gap-2">
        <span className="text-sm">Price $0</span>
        <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center px-1">
            <div className="w-full h-0.5 bg-shop-purple rounded-full relative">
              <div className="absolute w-2 h-2 rounded-full bg-shop-purple -top-[3px] left-1/2"></div>
            </div>
          </div>
        </div>
      </div>
      
      <FilterItem label="$600+" />
      
      <FilterItem label="Sort by" />
    </div>
  );
};

export default Filters;
