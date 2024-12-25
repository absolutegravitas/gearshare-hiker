import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockLists = [
  { id: 1, name: "Weekend Camping", items: 12, totalWeight: "8.5 kg" },
  { id: 2, name: "Day Hike", items: 8, totalWeight: "3.2 kg" },
  { id: 3, name: "Winter Trek", items: 15, totalWeight: "12.1 kg" },
];

export function PackingLists() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Packing Lists</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New List
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockLists.map((list) => (
          <Card key={list.id}>
            <CardHeader>
              <CardTitle className="text-lg">{list.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Items: {list.items}</p>
              <p className="text-sm text-gray-500">Total Weight: {list.totalWeight}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}