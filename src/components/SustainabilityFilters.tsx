
import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Leaf, Recycle, Package, Award } from 'lucide-react';

interface SustainabilityFiltersProps {
  filters: {
    maxCO2: number;
    recycledMaterials: boolean;
    sustainablePackaging: boolean;
    carbonNeutral: boolean;
    ecoFriendlyVendors: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

const SustainabilityFilters = ({ filters, onFiltersChange }: SustainabilityFiltersProps) => {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="p-4 bg-green-50 border-green-200">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Leaf className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-green-900">Sustainability Filters</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Max Carbon Footprint: {filters.maxCO2}kg CO₂
            </label>
            <Slider
              value={[filters.maxCO2]}
              onValueChange={(value) => updateFilter('maxCO2', value[0])}
              max={10}
              min={0.5}
              step={0.5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="recycled"
                checked={filters.recycledMaterials}
                onCheckedChange={(checked) => updateFilter('recycledMaterials', checked)}
              />
              <label htmlFor="recycled" className="text-sm flex items-center space-x-1">
                <Recycle className="w-4 h-4 text-blue-600" />
                <span>Recycled Materials</span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="packaging"
                checked={filters.sustainablePackaging}
                onCheckedChange={(checked) => updateFilter('sustainablePackaging', checked)}
              />
              <label htmlFor="packaging" className="text-sm flex items-center space-x-1">
                <Package className="w-4 h-4 text-green-600" />
                <span>Sustainable Packaging</span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="neutral"
                checked={filters.carbonNeutral}
                onCheckedChange={(checked) => updateFilter('carbonNeutral', checked)}
              />
              <label htmlFor="neutral" className="text-sm flex items-center space-x-1">
                <Leaf className="w-4 h-4 text-green-600" />
                <span>Carbon Neutral</span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vendors"
                checked={filters.ecoFriendlyVendors}
                onCheckedChange={(checked) => updateFilter('ecoFriendlyVendors', checked)}
              />
              <label htmlFor="vendors" className="text-sm flex items-center space-x-1">
                <Award className="w-4 h-4 text-yellow-600" />
                <span>Eco-Certified Vendors</span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-green-200">
          <p className="text-xs text-green-700">
            {Object.values(filters).filter(Boolean).length} filter(s) active
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SustainabilityFilters;
