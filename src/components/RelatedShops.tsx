
import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Shop = {
  id: number;
  name: string;
  rating: number;
  reviewCount: string;
  image: string;
};

const ShopCard = ({ shop }: { shop: Shop }) => {
  return (
    <div className="min-w-[160px] max-w-[180px] p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
      <div className="h-32 bg-gray-100 rounded-lg mb-2 overflow-hidden">
        <img 
          src={shop.image} 
          alt={shop.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-medium text-sm truncate">{shop.name}</h3>
      <div className="flex items-center text-xs">
        <span className="flex items-center">
          ★<span className="ml-1">{shop.rating}</span>
        </span>
        <span className="text-gray-500 ml-1">({shop.reviewCount})</span>
      </div>
      <div className="text-xs text-gray-500">Visit shop</div>
    </div>
  );
};

const RelatedShops = () => {
  const shops: Shop[] = [
    {
      id: 1,
      name: "Amberjack",
      rating: 4.5,
      reviewCount: "6.9K",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Extra Butter",
      rating: 4.8,
      reviewCount: "4.1K",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Merinos",
      rating: 4.4,
      reviewCount: "9.2K",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Paulgreeneshoes.com",
      rating: 4.6,
      reviewCount: "624",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Bared Footwear",
      rating: 4.8,
      reviewCount: "2.7K",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Tassel Children Shoes",
      rating: 4.5,
      reviewCount: "40",
      image: "/placeholder.svg"
    },
    {
      id: 7,
      name: "Mezlan Warehouse",
      rating: 4.9,
      reviewCount: "372",
      image: "/placeholder.svg"
    },
    {
      id: 8,
      name: "cliziashoes",
      rating: 4.5,
      reviewCount: "254",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="px-6 py-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Related shops</h2>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-300">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-300">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {shops.map(shop => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default RelatedShops;
