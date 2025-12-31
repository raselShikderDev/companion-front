import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/adminSidebar";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage users, trips, and matchs",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
        <ToastContainer />
      </main>
    </div>
  );
}
