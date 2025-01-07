import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar/>
      <main className="nondashboard-layout__main">
        {children}
      </main>
    </div>
  );
}
