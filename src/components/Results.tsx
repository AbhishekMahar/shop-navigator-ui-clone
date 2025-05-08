
import React from 'react';
import { Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden">
      {product.discount && (
        <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded z-10">
          {product.discount}
        </div>
      )}
      <div className="relative h-52 bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 flex flex-col gap-2">
          <Button variant="outline" size="icon" className="h-7 w-7 bg-white rounded-full">
            <Search className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7 bg-white rounded-full">
            <Heart className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="p-3">
        <div className="text-sm mb-1">
          <span className="font-medium">{product.brand}</span>
        </div>
        <h3 className="font-medium text-sm mb-1">{product.name}</h3>
        <div className="flex items-center mb-1">
          <div className="flex">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? "text-black" : "text-gray-300"}>
                {star}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">US${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-500 text-sm line-through ml-2">
              US${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Results = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "The Original (Obsidian)",
      brand: "Amberjack",
      price: 189.00,
      rating: 4.8,
      reviewCount: 927,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "The Original (Honey)",
      brand: "Amberjack",
      price: 189.00,
      rating: 4.7,
      reviewCount: 895,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "adidas Adizero EVO SL Mens Running Shoes - White",
      brand: "Start Fitness",
      price: 129.90,
      originalPrice: 220.99,
      rating: 5.0,
      reviewCount: 50,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Women's Savage 1 (Coral Fade)",
      brand: "Born Primitive",
      price: 139.00,
      rating: 4.9,
      reviewCount: 8,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Men's Savage 1 (Black/Black)",
      brand: "Born Primitive",
      price: 139.00,
      rating: 5.0,
      reviewCount: 221,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Ryka Women's Hydro Sport Water Shoes",
      brand: "SwimOutlet.com",
      price: 69.99,
      originalPrice: 99.99,
      rating: 4.8,
      reviewCount: 126,
      image: "/placeholder.svg",
      discount: "30% off"
    }
  ];

  return (
    <div className="px-6 py-2">
      <h2 className="text-lg font-medium mb-4">Results</h2>
      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pb-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Results;
