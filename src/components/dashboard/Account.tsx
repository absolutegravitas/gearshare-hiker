import { ProfileSection } from "./account/ProfileSection";
import { SocialSection } from "./account/SocialSection";
import { SubscriptionSection } from "./account/SubscriptionSection";
import { PreferencesSection } from "./account/PreferencesSection";
import { AccountManagementSection } from "./account/AccountManagementSection";

export function Account() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
      <ProfileSection />
      <SocialSection />
      <SubscriptionSection />
      <PreferencesSection />
      <AccountManagementSection />
    </div>
  );
}