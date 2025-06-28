
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  subtotal: number;
  totalCo2: number;
  ecoPoints: number;
  onCheckout: () => void;
}

const CartSummary = ({ subtotal, totalCo2, ecoPoints, onCheckout }: CartSummaryProps) => {
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <Card className="p-6 h-fit sticky top-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-orange-900">Carbon Footprint</span>
          <span className="font-bold text-orange-800">{totalCo2} kg CO₂</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-full bg-orange-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalCo2 / 15) * 100, 100)}%` }}
            ></div>
          </div>
          <span className="text-xs text-orange-700">🌍</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-purple-900">EcoPoints Balance</span>
          <span className="font-bold text-purple-800">{ecoPoints} pts 💚</span>
        </div>
        <p className="text-xs text-purple-700 mt-1">
          Earn more points with eco-friendly choices!
        </p>
      </div>

      <Button 
        onClick={onCheckout}
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
      >
        Proceed to Checkout
      </Button>
    </Card>
  );
};

export default CartSummary;
