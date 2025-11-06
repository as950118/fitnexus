"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Users, Star, Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/members", label: "회원 관리", icon: Users },
    { href: "/reviews", label: "트레이너 평가", icon: Star },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">FitNexus</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary-600 border-b-2 border-primary-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
