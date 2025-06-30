
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Leaf, Award, Target, TrendingUp } from 'lucide-react';

interface EcoDashboardProps {
  totalCO2Saved: number;
  currentTier: string;
  ecoPoints: number;
  offsetHistory: number;
  monthlyGoal: number;
}

const EcoDashboard = ({ 
  totalCO2Saved, 
  currentTier, 
  ecoPoints, 
  offsetHistory, 
  monthlyGoal 
}: EcoDashboardProps) => {
  const tierProgress = (totalCO2Saved / 50) * 100; // Example: 50kg for next tier
  const monthlyProgress = (totalCO2Saved / monthlyGoal) * 100;
  
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Gold': return 'bg-yellow-500';
      case 'Silver': return 'bg-gray-400';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total CO₂ Saved</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{totalCO2Saved}kg</div>
            <p className="text-xs text-gray-600">≈ {Math.round(totalCO2Saved * 3.9)}km driving saved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eco Tier</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge className={`${getTierColor(currentTier)} text-white`}>
                {currentTier}
              </Badge>
            </div>
            <Progress value={tierProgress} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">{Math.round(50 - totalCO2Saved)}kg to next tier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EcoPoints</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{ecoPoints}</div>
            <p className="text-xs text-gray-600">${(ecoPoints / 100).toFixed(2)} in rewards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Goal</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <Progress value={monthlyProgress} className="mb-2" />
            <div className="text-sm font-medium">{totalCO2Saved}/{monthlyGoal}kg</div>
            <p className="text-xs text-gray-600">{Math.round(monthlyProgress)}% complete</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Carbon Offset History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium">Tree Planting Project</p>
                <p className="text-sm text-gray-600">Offset: 12.5kg CO₂</p>
              </div>
              <Badge variant="secondary">Complete</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">Renewable Energy</p>
                <p className="text-sm text-gray-600">Offset: 8.2kg CO₂</p>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcoDashboard;
