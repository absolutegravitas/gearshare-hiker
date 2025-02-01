import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mountain, Download, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const MainNav = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const { toast } = useToast();

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

  return (
    <nav className="flex justify-between items-center px-4 py-6 bg-gradient-to-b from-forest to-forest-light">
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
  );
};