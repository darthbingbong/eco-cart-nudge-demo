
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingDown, Award, Package, Leaf } from 'lucide-react';

interface VendorData {
  name: string;
  sustainabilityScore: number;
  avgCO2: number;
  sustainablePackaging: boolean;
  carbonNeutral: boolean;
  products: number;
}

interface VendorSustainabilityDashboardProps {
  vendors: VendorData[];
  currentVendor?: string;
}

const VendorSustainabilityDashboard = ({ vendors, currentVendor }: VendorSustainabilityDashboardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const sortedVendors = [...vendors].sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{sortedVendors[0]?.name}</div>
            <Badge className="bg-green-600 text-white mt-1">
              {sortedVendors[0]?.sustainabilityScore}% Score
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Carbon Footprint</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(vendors.reduce((sum, v) => sum + v.avgCO2, 0) / vendors.length).toFixed(1)}kg
            </div>
            <p className="text-xs text-gray-600">Across all vendors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sustainable Packaging</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((vendors.filter(v => v.sustainablePackaging).length / vendors.length) * 100)}%
            </div>
            <p className="text-xs text-gray-600">Vendors using eco packaging</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Sustainability Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Avg CO₂/Product</TableHead>
                <TableHead>Certifications</TableHead>
                <TableHead>Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVendors.map((vendor, index) => (
                <TableRow 
                  key={vendor.name}
                  className={currentVendor === vendor.name ? 'bg-blue-50' : ''}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <span>#{index + 1}</span>
                      <span>{vendor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={vendor.sustainabilityScore} className="w-16" />
                      <Badge className={getScoreColor(vendor.sustainabilityScore)}>
                        {vendor.sustainabilityScore}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.avgCO2}kg</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {vendor.sustainablePackaging && (
                        <Badge variant="secondary" className="text-xs">
                          <Package className="w-3 h-3 mr-1" />
                          Packaging
                        </Badge>
                      )}
                      {vendor.carbonNeutral && (
                        <Badge variant="secondary" className="text-xs">
                          <Leaf className="w-3 h-3 mr-1" />
                          Carbon Neutral
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{vendor.products}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorSustainabilityDashboard;
