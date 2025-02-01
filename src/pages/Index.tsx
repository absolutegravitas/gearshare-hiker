import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { List, Package, Share } from "lucide-react";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Footer } from "@/components/Footer";

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
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-white">
            <h1 className="text-5xl font-bold mb-6">
              Your Ultimate Hiking Gear Management Platform
            </h1>
            <p className="text-xl mb-8">
              Organize your gear, create packing lists, and share with fellow hikers.
              Never forget essential equipment again.
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
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-white text-center">
              <div className="bg-sky/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Track Your Gear</h3>
              <p className="text-white/80">
                Add and organize all your hiking equipment in one place. Keep track of weights, maintenance, and details.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-white text-center">
              <div className="bg-sky/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <List className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Create Lists</h3>
              <p className="text-white/80">
                Build custom packing lists for different types of hikes. Calculate total weight and never forget essentials.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-white text-center">
              <div className="bg-sky/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Share & Learn</h3>
              <p className="text-white/80">
                Share your lists with fellow hikers, discover new gear combinations, and learn from the community.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8 text-white">
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Gear Management</h3>
            <p>Keep track of all your hiking gear in one place. Add details, categories, and maintenance records.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Packing Lists</h3>
            <p>Create custom packing lists for different types of hikes. Never forget essential gear again.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Share & Collaborate</h3>
            <p>Share your packing lists with friends and learn from experienced hikers in the community.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
