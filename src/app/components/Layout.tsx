import { Outlet, Link, useLocation } from "react-router";
import { Home, Wallet, CalendarDays, Users } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "홈", icon: Home },
    { path: "/budget", label: "가계부", icon: Wallet },
    { path: "/calendar", label: "일정", icon: CalendarDays },
    { path: "/family", label: "가족", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Main Content */}
      <main className="max-w-md mx-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-md mx-auto flex items-center justify-around h-16">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? "text-[#FFB3D9]" : "text-gray-500"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
