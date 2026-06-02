"use client";

import Sidebar from "./Sidebar";

export default function ParentLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#E8FAF6] dot-grid">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
