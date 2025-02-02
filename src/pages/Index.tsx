import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { List, Package, Share } from "lucide-react";
import { DashboardPreview } from "@/components/DashboardPreview";

const Index = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Thanks for your interest!",
      description: "We'll notify you when early access is available.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold mb-6 text-white">
              Your Ultimate Hiking Gear Management Platform
            </h1>
            <p className="text-xl mb-4 text-gray-300">
              Building on the legacy of LighterPack.com, TrailKit takes gear management
              to the next level with advanced features and modern design.
            </p>
            <p className="text-lg mb-8 text-gray-400">
              Experience everything you loved about LighterPack, plus:
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Smart gear recommendations based on weather and trail conditions</li>
                <li>Real-time weight distribution analysis</li>
                <li>Collaborative packing lists for group hikes</li>
                <li>Gear maintenance tracking and reminders</li>
              </ul>
            </p>
            <form onSubmit={handleEarlyAccess} className="flex gap-4 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 text-white placeholder:text-white/60 border-white/20"
              />
              <Button type="submit" className="bg-sky hover:bg-sky-light text-white">
                Get Early Access
              </Button>
            </form>
          </div>
          <div className="lg:w-1/2 animate-float">
            <DashboardPreview />
          </div>
        </div>

        {/* How it Works Section */}
        <div className="mt-24 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How TrailKit Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <div className="bg-sky/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Track Your Gear</h3>
              <p className="text-gray-300">
                Add and organize all your hiking equipment in one place. Keep track of weights, maintenance, and details.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <div className="bg-sky/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <List className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Create Lists</h3>
              <p className="text-gray-300">
                Build custom packing lists for different types of hikes. Calculate total weight and never forget essentials.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <div className="bg-sky/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Share & Learn</h3>
              <p className="text-gray-300">
                Share your lists with fellow hikers, discover new gear combinations, and learn from the community.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-white">Gear Management</h3>
            <p className="text-gray-300">Keep track of all your hiking gear in one place. Add details, categories, and maintenance records.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-white">Packing Lists</h3>
            <p className="text-gray-300">Create custom packing lists for different types of hikes. Never forget essential gear again.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-white">Share & Collaborate</h3>
            <p className="text-gray-300">Share your packing lists with friends and learn from experienced hikers in the community.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;