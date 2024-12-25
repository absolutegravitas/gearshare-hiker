import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function Account() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    address: "123 Trail Street",
    city: "Mountain View",
    state: "CA",
    zip: "94040",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name">Full Name</label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="address">Address</label>
                <Input
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="city">City</label>
                <Input
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="state">State</label>
                <Input
                  id="state"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="zip">ZIP Code</label>
                <Input
                  id="zip"
                  name="zip"
                  value={profile.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button type="submit" className="mt-4">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}