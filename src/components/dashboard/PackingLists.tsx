import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PackingList {
  id: number;
  name: string;
  items: number;
  totalWeight: string;
}

export function PackingLists() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lists, setLists] = useState<PackingList[]>([
    { id: 1, name: "Weekend Camping", items: 12, totalWeight: "8.5 kg" },
    { id: 2, name: "Day Hike", items: 8, totalWeight: "3.2 kg" },
    { id: 3, name: "Winter Trek", items: 15, totalWeight: "12.1 kg" },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<PackingList>({
    id: 0,
    name: "",
    items: 0,
    totalWeight: "",
  });

  const handleEdit = (list: PackingList) => {
    setEditingId(list.id);
    setEditForm(list);
  };

  const handleSave = () => {
    setLists((prev) =>
      prev.map((list) => (list.id === editingId ? editForm : list))
    );
    setEditingId(null);
    toast({
      title: "List Updated",
      description: "Your packing list has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
    toast({
      title: "List Deleted",
      description: "Your packing list has been deleted.",
    });
  };

  const handleAdd = () => {
    const newList = {
      id: Math.max(...lists.map((list) => list.id)) + 1,
      name: "New List",
      items: 0,
      totalWeight: "0 kg",
    };
    setLists((prev) => [...prev, newList]);
    handleEdit(newList);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Packing Lists</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          New List
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lists.map((list) => (
          <Card key={list.id} className="relative">
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                {editingId === list.id ? (
                  <Input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full"
                  />
                ) : (
                  <span>{list.name}</span>
                )}
                <div className="flex gap-2">
                  {editingId === list.id ? (
                    <Button onClick={handleSave} size="sm">
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(list)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(list.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingId === list.id ? (
                <div className="space-y-2">
                  <Input
                    type="number"
                    value={editForm.items}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        items: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Number of items"
                  />
                  <Input
                    value={editForm.totalWeight}
                    onChange={(e) =>
                      setEditForm({ ...editForm, totalWeight: e.target.value })
                    }
                    placeholder="Total weight"
                  />
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500">Items: {list.items}</p>
                  <p className="text-sm text-gray-500">
                    Total Weight: {list.totalWeight}
                  </p>
                  <Button
                    variant="ghost"
                    className="absolute bottom-4 right-4"
                    onClick={() => navigate(`/dashboard/lists/${list.id}`)}
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}