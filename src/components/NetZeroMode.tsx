
import React from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Leaf, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NetZeroModeProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  estimatedCost: number;
}

const NetZeroMode = ({ isEnabled, onToggle, estimatedCost }: NetZeroModeProps) => {
  return (
    <TooltipProvider>
      <Card className="p-4 border-2 border-dashed border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-green-900">Net Zero Mode</h3>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-green-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Automatically offset the carbon footprint of every order</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-green-700">
                Auto-offset every purchase • ~${estimatedCost.toFixed(2)}/order
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isEnabled && <Badge className="bg-green-600">Active</Badge>}
            <Switch checked={isEnabled} onCheckedChange={onToggle} />
          </div>
        </div>
        {isEnabled && (
          <div className="mt-3 p-3 bg-green-100 rounded-lg">
            <p className="text-sm text-green-800">
              🌱 Great choice! Your purchases will automatically be carbon neutral.
            </p>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};

export default NetZeroMode;
