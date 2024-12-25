import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GearItem {
  id: number;
  name: string;
  weight: string;
  category: string;
}

export function GearList() {
  const { toast } = useToast();
  const [gear, setGear] = useState<GearItem[]>([
    { id: 1, name: "Tent", weight: "2.5 kg", category: "Shelter" },
    { id: 2, name: "Sleeping Bag", weight: "1.2 kg", category: "Sleep System" },
    { id: 3, name: "Backpack", weight: "1.8 kg", category: "Carrying" },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<GearItem>({
    id: 0,
    name: "",
    weight: "",
    category: "",
  });

  const handleEdit = (item: GearItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSave = () => {
    setGear((prev) =>
      prev.map((item) => (item.id === editingId ? editForm : item))
    );
    setEditingId(null);
    toast({
      title: "Item Updated",
      description: "Your gear item has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setGear((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "Your gear item has been deleted.",
    });
  };

  const handleAdd = () => {
    const newItem = {
      id: Math.max(...gear.map((item) => item.id)) + 1,
      name: "New Item",
      weight: "0 kg",
      category: "Other",
    };
    setGear((prev) => [...prev, newItem]);
    handleEdit(newItem);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Gear</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Gear
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gear.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                {editingId === item.id ? (
                  <Input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full"
                  />
                ) : (
                  <span>{item.name}</span>
                )}
                <div className="flex gap-2">
                  {editingId === item.id ? (
                    <Button onClick={handleSave} size="sm">
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingId === item.id ? (
                <div className="space-y-2">
                  <Input
                    value={editForm.weight}
                    onChange={(e) =>
                      setEditForm({ ...editForm, weight: e.target.value })
                    }
                    placeholder="Weight"
                  />
                  <Input
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    placeholder="Category"
                  />
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500">Weight: {item.weight}</p>
                  <p className="text-sm text-gray-500">
                    Category: {item.category}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}