
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

interface CarbonTooltipProps {
  co2Amount: number;
  children: React.ReactNode;
}

const CarbonTooltip = ({ co2Amount, children }: CarbonTooltipProps) => {
  const getDrivingEquivalent = (co2: number) => Math.round(co2 * 3.9);
  const getTreeEquivalent = (co2: number) => Math.round(co2 * 0.04);
  const getPhoneChargeEquivalent = (co2: number) => Math.round(co2 * 180);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <p className="font-medium">Carbon Impact: {co2Amount}kg CO₂</p>
            <div className="space-y-1 text-sm">
              <p>🚗 = {getDrivingEquivalent(co2Amount)}km driving</p>
              <p>🌳 = {getTreeEquivalent(co2Amount)} trees needed for 1 year</p>
              <p>📱 = {getPhoneChargeEquivalent(co2Amount)} phone charges</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CarbonTooltip;
