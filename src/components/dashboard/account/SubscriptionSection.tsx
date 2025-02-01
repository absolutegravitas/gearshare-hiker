import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function SubscriptionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Current Plan: Monthly</p>
            <p className="text-sm text-gray-500">Next billing date: June 1, 2024</p>
          </div>
          <Button variant="outline" onClick={() => window.open("#", "_blank")}>
            Manage Subscription
          </Button>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <span>View Billing History</span>
          <Button
            variant="ghost"
            onClick={() => window.open("#", "_blank")}
            className="flex items-center gap-2"
          >
            View Invoices
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}