import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackpackVisualization } from "@/components/dashboard/BackpackVisualization";
import { Plus } from "lucide-react";

interface PackingListDemoProps {
  currentStep: number;
  onStepComplete: () => void;
  isDemoComplete: boolean;
}

export function PackingListDemo({ currentStep, onStepComplete, isDemoComplete }: PackingListDemoProps) {
  const [items, setItems] = useState<any[]>([]);
  const [listName, setListName] = useState("");

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      name: "Tent",
      weight: "2.5 kg",
      category: "Shelter",
      quantity: 1,
    };
    setItems([...items, newItem]);
    onStepComplete();
  };

  const handleCreateList = () => {
    if (listName) {
      onStepComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div id="create-list" className="space-y-4">
        <Input
          placeholder="Weekend Camping Trip"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
        />
        <Button
          onClick={handleCreateList}
          disabled={!listName}
          className="bg-sky hover:bg-sky-light text-white"
        >
          Create List
        </Button>
      </div>

      {currentStep >= 1 && (
        <div id="add-items" className="space-y-4">
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Select gear" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tent">Tent</SelectItem>
                <SelectItem value="sleeping-bag">Sleeping Bag</SelectItem>
                <SelectItem value="backpack">Backpack</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddItem} className="bg-sky hover:bg-sky-light">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>
      )}

      {currentStep >= 2 && (
        <div id="organize-items" className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 bg-white/5 rounded-lg text-white"
            >
              <span>{item.name}</span>
              <div className="flex gap-4">
                <span>{item.weight}</span>
                <span className="text-sky-light">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentStep >= 3 && (
        <div id="visualize" className="mt-8">
          <BackpackVisualization items={items} />
        </div>
      )}
    </div>
  );
}