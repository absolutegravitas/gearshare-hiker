import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Github, Google } from "lucide-react";

const Waitlist = () => {
  const { toast } = useToast();

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks for joining!",
      description: "We'll notify you when we launch.",
    });
  };

  const handleSocialSignup = (provider: string) => {
    toast({
      title: "Coming Soon",
      description: `${provider} signup will be available shortly.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest to-forest-light">
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side - Copy */}
        <div className="flex-1 text-white space-y-6 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Track Your Gear.
            <br />
            Pack Smarter.
            <br />
            Adventure Further.
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Join the waitlist for early access to the ultimate backpacking gear management platform. Be the first to experience a smarter way to organize your outdoor adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <span className="text-2xl font-bold">500+</span>
              <span className="text-sm opacity-90">Adventurers<br />Waiting</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <span className="text-2xl font-bold">14</span>
              <span className="text-sm opacity-90">Days Until<br />Launch</span>
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <Card className="flex-1 max-w-md w-full p-6 bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Join the Waitlist</h2>
              <p className="text-sm text-gray-600 mt-1">
                Get early access and exclusive offers
              </p>
            </div>

            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-sky hover:bg-sky-light">
                <Mail className="mr-2 h-4 w-4" />
                Join with Email
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialSignup("Google")}
              >
                <Google className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialSignup("Github")}
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with Github
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Waitlist;