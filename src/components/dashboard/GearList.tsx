import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockGear = [
  { id: 1, name: "Tent", weight: "2.5 kg", category: "Shelter" },
  { id: 2, name: "Sleeping Bag", weight: "1.2 kg", category: "Sleep System" },
  { id: 3, name: "Backpack", weight: "1.8 kg", category: "Carrying" },
];

export function GearList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Gear</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Gear
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockGear.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-lg">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Weight: {item.weight}</p>
              <p className="text-sm text-gray-500">Category: {item.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}