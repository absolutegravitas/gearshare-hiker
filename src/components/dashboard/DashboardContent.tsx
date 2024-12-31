import { Routes, Route } from "react-router-dom";
import { GearList } from "./GearList";
import { PackingLists } from "./PackingLists";
import { ListDetail } from "./ListDetail";
import { Settings } from "./Settings";
import { Account } from "./Account";

export function DashboardContent() {
  return (
    <main className="flex-1 p-6 bg-gray-50">
      <Routes>
        <Route path="gear" element={<GearList />} />
        <Route path="lists" element={<PackingLists />} />
        <Route path="lists/:id" element={<ListDetail />} />
        <Route path="account" element={<Account />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </main>
  );
}