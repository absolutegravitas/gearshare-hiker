import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Mountains } from "lucide-react";

const Index = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // In a real app, this would connect to your backend
    toast({
      title: "Thanks for your interest!",
      description: "We'll notify you when early access is available.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest to-forest-light">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2 text-white">
            <Mountains className="h-8 w-8" />
            <span className="text-2xl font-bold">TrailKit</span>
          </div>
          <div className="space-x-4">
            <Link to="/about" className="text-white hover:text-sky-light">
              About
            </Link>
            <Link to="/login" className="text-white hover:text-sky-light">
              Login
            </Link>
          </div>
        </nav>

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
            <img
              src="/placeholder.svg"
              alt="Hiking Gear Illustration"
              className="w-full max-w-lg mx-auto"
            />
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