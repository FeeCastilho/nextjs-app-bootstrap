"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar,
  Home,
  LineChart,
  Package,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users,
  User,
  LogOut,
  Scissors,
  Clock,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "admin" | "barber" | "customer";
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items based on role
  const getNavItems = () => {
    switch (role) {
      case "admin":
        return [
          { name: "Dashboard", href: "/admin/dashboard", icon: Home },
          { name: "Barbers", href: "/admin/barbers", icon: Scissors },
          { name: "Customers", href: "/admin/customers", icon: Users },
          { name: "Appointments", href: "/admin/appointments", icon: Calendar },
          { name: "Services", href: "/admin/services", icon: Package },
          { name: "Analytics", href: "/admin/analytics", icon: LineChart },
          { name: "Settings", href: "/admin/settings", icon: Settings },
        ];
      case "barber":
        return [
          { name: "Dashboard", href: "/barber/dashboard", icon: Home },
          { name: "Schedule", href: "/barber/schedule", icon: Calendar },
          { name: "Appointments", href: "/barber/appointments", icon: Clock },
          { name: "Profile", href: "/barber/profile", icon: User },
          { name: "Settings", href: "/barber/settings", icon: Settings },
        ];
      case "customer":
        return [
          { name: "Dashboard", href: "/customer/dashboard", icon: Home },
          { name: "Book Appointment", href: "/customer/book", icon: Calendar },
          { name: "My Appointments", href: "/customer/appointments", icon: Clock },
          { name: "Barbers", href: "/customer/barbers", icon: Scissors },
          { name: "Profile", href: "/customer/profile", icon: User },
          { name: "Settings", href: "/customer/settings", icon: Settings },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("userRole");
    // Redirect to login
    router.push("/login");
  };

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r border-gray-800 bg-gray-950 md:flex flex-col">
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-700"></div>
            <span>Barber Shop Pro</span>
          </div>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-amber-600 text-black font-medium"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </a>
              );
            })}
          </div>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-500 border-gray-800 hover:bg-red-500/10 hover:text-red-500"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-50 md:hidden border-gray-800 bg-gray-900 text-white"
          >
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-gray-950 border-gray-800 text-white sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-700"></div>
              <span>Barber Shop Pro</span>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-amber-600 text-black font-medium"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </a>
              );
            })}
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-500 border-gray-800 hover:bg-red-500/10 hover:text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-950/50 p-4 md:hidden">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-700"></div>
            <span>Barber Shop Pro</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
