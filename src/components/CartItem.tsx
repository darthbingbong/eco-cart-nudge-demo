
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  co2: number;
  quantity: number;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItem = ({ id, name, price, image, co2, quantity, onRemove, onQuantityChange }: CartItemProps) => {
  return (
    <Card className="p-4 flex items-center space-x-4 relative group hover:shadow-md transition-all duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="absolute -top-2 -right-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
          {co2}kg CO₂
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-lg font-bold text-gray-900">${price}</p>
        <div className="flex items-center space-x-3 mt-2">
          <label className="text-sm text-gray-600">Qty:</label>
          <select 
            value={quantity}
            onChange={(e) => onQuantityChange(id, parseInt(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </Button>
    </Card>
  );
};

export default CartItem;
