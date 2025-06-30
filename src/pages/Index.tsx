import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import EcoAssistant from '@/components/EcoAssistant';
import EcoDashboard from '@/components/EcoDashboard';
import NetZeroMode from '@/components/NetZeroMode';
import CarbonTooltip from '@/components/CarbonTooltip';
import SustainabilityFilters from '@/components/SustainabilityFilters';
import VendorSustainabilityDashboard from '@/components/VendorSustainabilityDashboard';

interface CartItemType {
  id: string;
  name: string;
  price: number;
  image: string;
  co2: number;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: '1',
      name: 'Leather Crossbody Bag',
      price: 89.99,
      image: '/placeholder.svg',
      co2: 3.2,
      quantity: 1
    },
    {
      id: '2',
      name: 'Standard Sneakers',
      price: 124.99,
      image: '/placeholder.svg',
      co2: 2.8,
      quantity: 1
    },
    {
      id: '3',
      name: 'Cotton T-Shirt',
      price: 24.99,
      image: '/placeholder.svg',
      co2: 2.4,
      quantity: 1
    }
  ]);

  const [ecoMode, setEcoMode] = useState(true);
  const [showAssistant, setShowAssistant] = useState(false);
  const [ecoPoints, setEcoPoints] = useState(340);
  const [netZeroMode, setNetZeroMode] = useState(false);
  const [sustainabilityFilters, setSustainabilityFilters] = useState({
    maxCO2: 5,
    recycledMaterials: false,
    sustainablePackaging: false,
    carbonNeutral: false,
    ecoFriendlyVendors: false,
  });

  const [userStats] = useState({
    totalCO2Saved: 34.2,
    currentTier: 'Silver',
    offsetHistory: 28.5,
    monthlyGoal: 50,
  });

  const [vendorData] = useState([
    {
      name: 'EcoFashion Co',
      sustainabilityScore: 92,
      avgCO2: 1.2,
      sustainablePackaging: true,
      carbonNeutral: true,
      products: 156
    },
    {
      name: 'Green Threads',
      sustainabilityScore: 78,
      avgCO2: 2.1,
      sustainablePackaging: true,
      carbonNeutral: false,
      products: 89
    },
    {
      name: 'Standard Fashion',
      sustainabilityScore: 45,
      avgCO2: 4.2,
      sustainablePackaging: false,
      carbonNeutral: false,
      products: 234
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCo2 = cartItems.reduce((sum, item) => sum + (item.co2 * item.quantity), 0);

  const ecoSuggestions = [
    {
      originalItem: 'Leather Crossbody Bag',
      suggestedItem: 'Recycled Material Tote',
      co2Savings: 2.1,
      priceChange: 0
    },
    {
      originalItem: 'Standard Sneakers',
      suggestedItem: 'Eco Knit Runners',
      co2Savings: 1.5,
      priceChange: 0
    }
  ];

  useEffect(() => {
    if (ecoMode && cartItems.length > 0) {
      const timer = setTimeout(() => {
        setShowAssistant(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [ecoMode, cartItems.length]);

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart"
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateCartWithEcoSwaps = () => {
    setCartItems(items => items.map(item => {
      if (item.name === 'Leather Crossbody Bag') {
        return {
          ...item,
          name: 'Recycled Material Tote',
          co2: 1.1
        };
      }
      if (item.name === 'Standard Sneakers') {
        return {
          ...item,
          name: 'Eco Knit Runners',
          co2: 1.3
        };
      }
      return item;
    }));
    
    setEcoPoints(prev => prev + 60);
    setShowAssistant(false);
    
    toast({
      title: "🌱 Cart updated!",
      description: "You've earned +60 EcoPoints for choosing sustainable options!"
    });
  };

  const handleCheckout = () => {
    let message = "Thanks for shopping sustainably! 🌱";
    if (netZeroMode) {
      message += " Your order will be automatically carbon offset.";
    }
    toast({
      title: "Proceeding to checkout...",
      description: message
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Your Shopping Cart 🛍️
            </h1>
            <p className="text-gray-600 mt-1">
              {cartItems.length} items • Making every choice count
            </p>
          </div>
          
          <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm border">
            <span className="text-sm font-medium text-gray-700">Eco-Assistant</span>
            <Switch 
              checked={ecoMode} 
              onCheckedChange={setEcoMode}
            />
            <span className="text-xs text-green-600">🌱</span>
          </div>
        </div>

        <Tabs defaultValue="cart" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
            <TabsTrigger value="dashboard">Eco Dashboard</TabsTrigger>
            <TabsTrigger value="filters">Sustainability</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="cart" className="space-y-6">
            <NetZeroMode
              isEnabled={netZeroMode}
              onToggle={setNetZeroMode}
              estimatedCost={totalCo2 * 0.02}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <CarbonTooltip key={item.id} co2Amount={item.co2}>
                    <div>
                      <CartItem
                        {...item}
                        onRemove={removeItem}
                        onQuantityChange={updateQuantity}
                      />
                    </div>
                  </CarbonTooltip>
                ))}
                
                {cartItems.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <Button className="mt-4">Continue Shopping</Button>
                  </div>
                )}
              </div>

              <div>
                <CartSummary
                  subtotal={subtotal}
                  totalCo2={Number(totalCo2.toFixed(1))}
                  ecoPoints={ecoPoints}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <EcoDashboard
              totalCO2Saved={userStats.totalCO2Saved}
              currentTier={userStats.currentTier}
              ecoPoints={ecoPoints}
              offsetHistory={userStats.offsetHistory}
              monthlyGoal={userStats.monthlyGoal}
            />
          </TabsContent>

          <TabsContent value="filters">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SustainabilityFilters
                filters={sustainabilityFilters}
                onFiltersChange={setSustainabilityFilters}
              />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Filter Results</h3>
                <p className="text-sm text-gray-600">
                  Products matching your sustainability criteria will appear here.
                  Current filters would show {Math.floor(Math.random() * 50) + 10} products.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vendors">
            <VendorSustainabilityDashboard
              vendors={vendorData}
              currentVendor="EcoFashion Co"
            />
          </TabsContent>
        </Tabs>

        {/* Eco Assistant Modal */}
        <EcoAssistant
          isOpen={showAssistant}
          onClose={() => setShowAssistant(false)}
          totalCo2={Number(totalCo2.toFixed(1))}
          suggestions={ecoSuggestions}
          onUpdateCart={updateCartWithEcoSwaps}
          ecoPoints={60}
        />
      </div>
    </div>
  );
};

export default Index;
