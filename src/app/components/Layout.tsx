import { Outlet, Link, useLocation } from "react-router";
import { Home, Wallet, CalendarDays, Users } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "??", icon: Home },
    { path: "/budget", label: "媛怨꾨?", icon: Wallet },
    { path: "/calendar", label: "?쇱젙", icon: CalendarDays },
    { path: "/family", label: "媛議?", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ef_0%,_#faebf4_42%,_#f6f7fb_100%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-24 pt-4 lg:flex-row lg:gap-8 lg:px-6 lg:pb-8 lg:pt-8">
        <aside className="hidden lg:sticky lg:top-8 lg:flex lg:h-[calc(100vh-4rem)] lg:w-72 lg:flex-col lg:justify-between lg:rounded-[2rem] lg:border lg:border-white/60 lg:bg-white/75 lg:p-6 lg:shadow-[0_24px_80px_rgba(255,179,217,0.18)] lg:backdrop-blur">
          <div>
            <div className="mb-10">
              <p className="text-sm font-medium text-gray-500">All in One Life</p>
              <h1 className="mt-2 text-3xl font-semibold text-gray-900">Family Flow</h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                吏? ?쇱젙, 媛議?猷⑦떞?????붾㈃?먯꽌 李⑤텇?섍쾶 愿由ы빐蹂댁꽭??
              </p>
            </div>

            <nav className="space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#FFB3D9] to-[#B3D9FF] text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#FFB3D9] to-[#FFE4B3] p-5 text-white shadow-lg">
            <p className="text-sm font-medium opacity-90">?ㅻ뒛??吏묒쨷 ?ъ씤??</p>
            <p className="mt-2 text-lg font-semibold leading-7">
              媛??以묒슂???쇰????섎굹???뺣━?섎㈃ ?섎（媛 ?⑥뵮 媛踰쇱썙吏묐땲??
            </p>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <Outlet />
          </div>
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex h-full flex-1 flex-col items-center justify-center transition-colors ${
                  isActive ? "text-[#FFB3D9]" : "text-gray-500"
                }`}
              >
                <Icon className="mb-1 h-5 w-5" />
                <span className="text-xs">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
