import type { ReactNode } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-light min-h-screen transition-colors duration-300">
      <Navbar />
      <div className="flex">
        <main className="flex-1 max-w-5xl mx-auto px-6 py-6 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
