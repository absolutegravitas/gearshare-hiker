import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function SocialSection() {
  const { toast } = useToast();

  const handleSocialLink = (provider: string) => {
    toast({
      title: "Coming Soon",
      description: `${provider} integration will be available shortly.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Google</span>
          <Button variant="outline" onClick={() => handleSocialLink("Google")}>
            Connect
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span>Facebook</span>
          <Button variant="outline" onClick={() => handleSocialLink("Facebook")}>
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}