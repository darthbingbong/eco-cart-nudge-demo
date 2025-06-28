
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface EcoSuggestion {
  originalItem: string;
  suggestedItem: string;
  co2Savings: number;
  priceChange: number;
}

interface EcoAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  totalCo2: number;
  suggestions: EcoSuggestion[];
  onUpdateCart: () => void;
  ecoPoints: number;
}

const EcoAssistant = ({ 
  isOpen, 
  onClose, 
  totalCo2, 
  suggestions, 
  onUpdateCart, 
  ecoPoints 
}: EcoAssistantProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const totalSavings = suggestions.reduce((sum, s) => sum + s.co2Savings, 0);
  const drivingDistance = Math.round(totalCo2 * 3.9); // Rough conversion to km

  if (showDetails) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>💡</span>
              <span>Making a Difference</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🌍 Your Impact</h3>
              <p className="text-sm text-green-700">
                In the past month, customers like you helped save over <strong>18 tons of CO₂</strong> through sustainable swaps.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">🎁 EcoRewards</h3>
              <p className="text-sm text-purple-700">
                You've earned <strong>+{ecoPoints} EcoPoints</strong> for your green choices!
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Redeemable for discounts on future purchases
              </p>
            </div>

            <div className="flex space-x-2">
              <Button onClick={onUpdateCart} className="flex-1 bg-green-600 hover:bg-green-700">
                Update My Cart
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Continue Shopping
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>👋</span>
            <span>Hey Alex! Great choices today.</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="text-orange-900">
              Your current cart emits <strong>{totalCo2} kg CO₂</strong> — that's like driving a car for <strong>{drivingDistance} km</strong> 🚗💨
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
              <span>🌱</span>
              <span>Want to make your cart even greener?</span>
            </h3>
            
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="p-3 bg-green-50 border-green-200">
                  <p className="text-sm text-green-800">
                    Replace <strong>"{suggestion.originalItem}"</strong> with <strong>"{suggestion.suggestedItem}"</strong>
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-green-700 font-medium">→ save {suggestion.co2Savings} kg CO₂</span>
                    {suggestion.priceChange === 0 && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Same Price
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border">
            <p className="text-sm font-medium text-green-800">
              🎯 Total potential savings: <strong>{totalSavings} kg CO₂</strong>
            </p>
          </div>

          <div className="flex space-x-2">
            <Button onClick={onUpdateCart} className="flex-1 bg-green-600 hover:bg-green-700">
              ✅ Update My Cart
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowDetails(true)}
              className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              💡 Tell Me More
            </Button>
          </div>
          
          <Button variant="ghost" onClick={onClose} className="w-full text-gray-600">
            ❌ No Thanks
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EcoAssistant;
