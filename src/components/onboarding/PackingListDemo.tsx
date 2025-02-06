import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackpackVisualization } from "@/components/dashboard/BackpackVisualization";
import { Plus, Download, ArrowRight, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import jsPDF from "jspdf";

interface PackingListDemoProps {
  currentStep: number;
  onStepComplete: () => void;
  isDemoComplete: boolean;
}

export function PackingListDemo({ currentStep, onStepComplete, isDemoComplete }: PackingListDemoProps) {
  const [items, setItems] = useState<any[]>([]);
  const [listName, setListName] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isVisualizationOpen, setIsVisualizationOpen] = useState(true);

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
      // Only call onStepComplete if we haven't already completed this step
      if (currentStep === 0) {
        onStepComplete();
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
    // Only trigger handleCreateList if we have a value
    if (e.target.value) {
      handleCreateList();
    }
  };

  const handleReset = () => {
    setItems([]);
    setListName("");
    toast({
      title: "List Reset",
      description: "Your packing list has been cleared.",
    });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(listName || "Packing List", 20, 20);
    
    // Add items
    doc.setFontSize(12);
    items.forEach((item, index) => {
      const yPosition = 40 + (index * 10);
      doc.text(`${item.quantity}x ${item.name} (${item.weight}) - ${item.category}`, 20, yPosition);
    });
    
    // Add total weight
    const totalWeight = items.reduce((sum, item) => {
      const weight = parseFloat(item.weight);
      return sum + (weight * item.quantity);
    }, 0);
    
    doc.text(`Total Weight: ${totalWeight.toFixed(2)} kg`, 20, 40 + (items.length * 10) + 10);
    
    // Add watermark for free version
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Created with Trail Gear - Get premium features at trailgear.app", 20, doc.internal.pageSize.height - 20);
    
    doc.save("packing-list.pdf");
    
    toast({
      title: "PDF Exported!",
      description: "Your packing list has been downloaded. Sign up for premium features!",
    });
  };

  const MainContent = () => (
    <div className="space-y-6">
      <div id="create-list" className="space-y-4">
        <Input
          placeholder="Weekend Camping Trip"
          value={listName}
          onChange={handleNameChange}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 transition-all duration-300 focus:scale-105"
        />
        <div className="flex gap-2">
          <Button
            onClick={handleCreateList}
            disabled={!listName}
            className="bg-sky hover:bg-sky-light text-white transition-all duration-300 hover:scale-105"
          >
            Create List
            <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {currentStep >= 1 && (
        <div id="add-items" className="space-y-4 animate-fade-in">
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="bg-white/5 border-white/20 text-white transition-all duration-300 hover:border-sky">
                <SelectValue placeholder="Select gear" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tent">Tent</SelectItem>
                <SelectItem value="sleeping-bag">Sleeping Bag</SelectItem>
                <SelectItem value="backpack">Backpack</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddItem} className="bg-sky hover:bg-sky-light group">
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Add Item
            </Button>
          </div>
        </div>
      )}

      {currentStep >= 2 && (
        <div id="organize-items" className="space-y-4 animate-fade-in">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 150}ms` }}
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
    </div>
  );

  const VisualizationPanel = () => (
    <div className="w-full lg:w-1/2 lg:pl-6">
      <BackpackVisualization items={items} />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="lg:flex lg:gap-6">
        <div className="w-full lg:w-1/2">
          <MainContent />
        </div>
        
        {isMobile ? (
          <Collapsible
            open={isVisualizationOpen}
            onOpenChange={setIsVisualizationOpen}
            className="w-full mt-6 lg:mt-0"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                {isVisualizationOpen ? "Hide" : "Show"} Pack Visualization
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <VisualizationPanel />
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <VisualizationPanel />
        )}
      </div>

      {currentStep >= 3 && (
        <div className="mt-12 space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <Button
              onClick={exportToPDF}
              className="bg-earth hover:bg-earth-light text-white group transition-all duration-300 hover:scale-105"
            >
              <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
              Export as PDF
            </Button>
          </div>
          
          <div className="text-center space-y-4 p-6 rounded-lg bg-white/5 backdrop-blur">
            <h3 className="text-xl font-semibold text-white">Ready to Take Your Adventure Further?</h3>
            <p className="text-white/80">
              Unlock premium features like custom categories, weight tracking, and collaborative lists.
            </p>
            <Button
              className="bg-sky hover:bg-sky-light text-white group transition-all duration-300 hover:scale-105"
              size="lg"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
