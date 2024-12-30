import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface GearItem {
  id: number;
  name: string;
  weight: string;
  category: string;
}

interface WeightSummaryChartProps {
  gear: GearItem[];
}

const COLORS = ['#2D5A27', '#8B7355', '#75A5B7', '#3B7A35', '#A68E6A', '#9DBFCD'];

export function WeightSummaryChart({ gear }: WeightSummaryChartProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const parseWeight = (weight: string): number => {
    const numericWeight = parseFloat(weight.replace(/[^\d.-]/g, ''));
    return isNaN(numericWeight) ? 0 : numericWeight;
  };

  const categoryData = gear.reduce((acc: { [key: string]: number }, item) => {
    const weight = parseWeight(item.weight);
    acc[item.category] = (acc[item.category] || 0) + weight;
    return acc;
  }, {});

  const itemsByCategory = gear.reduce((acc: { [key: string]: GearItem[] }, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    items: itemsByCategory[name],
  }));

  const detailedData = gear.map(item => ({
    name: item.name,
    weight: parseWeight(item.weight),
    category: item.category,
    percentage: (parseWeight(item.weight) / Object.values(categoryData).reduce((a, b) => a + b, 0) * 100).toFixed(1)
  }));

  const totalWeight = Object.values(categoryData).reduce((a, b) => a + b, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      const categoryItems = data.items || [];
      const categoryTotal = data.value;

      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-bold mb-2">{data.name}</p>
          <p className="text-sm text-gray-600">Total: {categoryTotal.toFixed(2)} kg</p>
          {categoryItems.length > 0 && (
            <div className="mt-2 border-t pt-2">
              {categoryItems.map((item: GearItem) => {
                const itemWeight = parseWeight(item.weight);
                const percentage = (itemWeight / categoryTotal * 100).toFixed(1);
                return (
                  <div key={item.id} className="text-sm">
                    <span className="font-medium">{item.name}:</span>
                    <span className="text-gray-600"> {itemWeight.toFixed(2)} kg ({percentage}%)</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Weight Distribution</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {!isExpanded ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={(data) => setSelectedCategory(data.name)}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={detailedData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit="kg" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip
                  formatter={(value: number, name, item: any) => [
                    `${value.toFixed(2)} kg (${item.payload.percentage}%)`,
                    item.payload.category,
                  ]}
                />
                <Bar
                  dataKey="weight"
                  fill="#2D5A27"
                  className="cursor-pointer hover:opacity-80"
                >
                  {detailedData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[
                        pieData.findIndex(cat => cat.name === detailedData[index].category) % COLORS.length
                      ]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="text-sm text-muted-foreground mt-4 text-center">
          Total Weight: {totalWeight.toFixed(2)} kg
        </div>
      </CardContent>
    </Card>
  );
}