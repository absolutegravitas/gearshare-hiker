import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Mountain, Download, List, Package, Share, MessageSquare } from "lucide-react";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIOS && !isStandalone) {
      setIsInstallable(true);
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    } else {
      toast({
        title: "Install Instructions",
        description: "To install, tap the share button and select 'Add to Home Screen'",
      });
    }
  };

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-forest to-forest-light">
      <nav className="flex justify-between items-center px-4 py-6">
        <div className="flex items-center space-x-2 text-white">
          <Mountain className="h-8 w-8" />
          <span className="text-2xl font-bold">TrailKit</span>
        </div>
        <div className="space-x-4">
          {isInstallable && (
            <Button
              onClick={handleInstall}
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <Download className="mr-2 h-4 w-4" />
              Install App
            </Button>
          )}
          <Link to="/features" className="text-white hover:text-sky-light">
            <MessageSquare className="inline-block mr-1 h-4 w-4" />
            Feature Requests
          </Link>
          <Link to="/about" className="text-white hover:text-sky-light">
            About
          </Link>
          <Link to="/pricing" className="text-white hover:text-sky-light">
            Pricing
          </Link>
          <Link to="/login" className="text-white hover:text-sky-light">
            Login
          </Link>
        </div>
      </nav>

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
      <Footer />
    </div>
  );
};

export default Index;