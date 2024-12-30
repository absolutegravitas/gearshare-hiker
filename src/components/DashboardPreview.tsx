import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Package, List, User } from "lucide-react";

export function DashboardPreview() {
  const mockGearItems = [
    { name: "Tent", weight: "2.5 kg", category: "Shelter" },
    { name: "Sleeping Bag", weight: "1.2 kg", category: "Sleep" },
    { name: "Backpack", weight: "1.8 kg", category: "Carrying" },
  ];

  const mockPackingList = [
    { name: "Weekend Trip", items: 12, weight: "8.5 kg" },
    { name: "Day Hike", items: 8, weight: "3.2 kg" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between mb-4 text-white/90">
        <div className="flex items-center gap-2">
          <Mountain className="h-6 w-6" />
          <h2 className="text-xl font-semibold">Trail Gear Dashboard</h2>
        </div>
        <div className="flex gap-4">
          <Package className="h-5 w-5" />
          <List className="h-5 w-5" />
          <User className="h-5 w-5" />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-3 text-white/90">My Gear</h3>
            <div className="space-y-2">
              {mockGearItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 rounded bg-white/5 text-white/80"
                >
                  <span>{item.name}</span>
                  <div className="flex gap-4">
                    <span className="text-sm">{item.weight}</span>
                    <span className="text-sm text-sky-light">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-3 text-white/90">Packing Lists</h3>
            <div className="space-y-2">
              {mockPackingList.map((list, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 rounded bg-white/5 text-white/80"
                >
                  <span>{list.name}</span>
                  <div className="flex gap-4">
                    <span className="text-sm">{list.items} items</span>
                    <span className="text-sm text-sky-light">{list.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}