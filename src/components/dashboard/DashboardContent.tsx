import { Routes, Route } from "react-router-dom";
import { GearList } from "./GearList";
import { PackingLists } from "./PackingLists";
import { Settings } from "./Settings";

export function DashboardContent() {
  return (
    <main className="flex-1 p-6 bg-gray-50">
      <Routes>
        <Route path="/gear" element={<GearList />} />
        <Route path="/lists" element={<PackingLists />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </main>
  );
}