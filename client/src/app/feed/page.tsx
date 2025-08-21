"use client";

import { Feed } from "@/components/feed/feed"; 
import { Header } from "@/components/layout/header";

export default function App() {
  const handleLogout = () => {
    console.log("User logged out.");
  };

  const handleFilterToggle = (isAll: boolean) => {
    console.log(`Toggling filter to ${isAll ? "all" : "mine"}`);
  };

  return (
    <div className="bg-neutral-900 min-h-screen font-sans">
      <Header onLogout={handleLogout} onToggleFilter={handleFilterToggle} />
      <Feed />
    </div>
  );
}
