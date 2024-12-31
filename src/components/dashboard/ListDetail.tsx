import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WeightSummaryChart } from "./WeightSummaryChart";

interface GearItem {
  id: number;
  name: string;
  weight: string;
  category: string;
}

interface ListItem extends GearItem {
  quantity: number;
}

interface PackingList {
  id: number;
  name: string;
  items: ListItem[];
}

export function ListDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [list, setList] = useState<PackingList | null>(null);
  const [availableGear, setAvailableGear] = useState<GearItem[]>([
    { id: 1, name: "Tent", weight: "2.5 kg", category: "Shelter" },
    { id: 2, name: "Sleeping Bag", weight: "1.2 kg", category: "Sleep System" },
    { id: 3, name: "Backpack", weight: "1.8 kg", category: "Carrying" },
  ]);
  const [selectedGearId, setSelectedGearId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    setList({
      id: Number(id),
      name: "Weekend Camping",
      items: [
        { id: 1, name: "Tent", weight: "2.5 kg", category: "Shelter", quantity: 1 },
        { id: 2, name: "Sleeping Bag", weight: "1.2 kg", category: "Sleep System", quantity: 1 },
      ],
    });
  }, [id]);

  const parseWeight = (weight: string): number => {
    return parseFloat(weight.replace(/[^\d.-]/g, ""));
  };

  const calculateTotalWeight = (items: ListItem[]): string => {
    const total = items.reduce((sum, item) => {
      return sum + parseWeight(item.weight) * item.quantity;
    }, 0);
    return `${total.toFixed(2)} kg`;
  };

  const handleAddItem = () => {
    if (!selectedGearId || !list) return;

    const gearItem = availableGear.find(
      (item) => item.id === Number(selectedGearId)
    );
    if (!gearItem) return;

    const newItem: ListItem = {
      ...gearItem,
      quantity,
    };

    setList({
      ...list,
      items: [...list.items, newItem],
    });

    setSelectedGearId("");
    setQuantity(1);

    toast({
      title: "Item Added",
      description: "The item has been added to your packing list.",
    });
  };

  if (!list) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/lists")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Lists
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">{list.name}</h1>
      </div>

      {list.items.length > 0 && <WeightSummaryChart gear={list.items} />}

      <Card>
        <CardHeader>
          <CardTitle>Add Gear</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select
              value={selectedGearId}
              onValueChange={setSelectedGearId}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select gear to add" />
              </SelectTrigger>
              <SelectContent>
                {availableGear.map((gear) => (
                  <SelectItem key={gear.id} value={gear.id.toString()}>
                    {gear.name} ({gear.weight})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24"
              placeholder="Qty"
            />
            <Button onClick={handleAddItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-lg">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity}
              </p>
              <p className="text-sm text-gray-500">
                Weight per item: {item.weight}
              </p>
              <p className="text-sm text-gray-500">
                Total weight: {(parseWeight(item.weight) * item.quantity).toFixed(2)} kg
              </p>
              <p className="text-sm text-gray-500">
                Category: {item.category}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-sm text-muted-foreground mt-4">
        Total List Weight: {calculateTotalWeight(list.items)}
      </div>
    </div>
  );
}