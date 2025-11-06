"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Dumbbell, Users, Star, Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/members", label: "회원 관리", icon: Users },
    { href: "/reviews", label: "트레이너 평가", icon: Star },
  ];

  return (
    <motion.nav
      className="glass-effect border-b border-white/10 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-2 group">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Dumbbell className="h-8 w-8 text-primary-400 group-hover:text-primary-300 transition-colors" />
                </motion.div>
                <span className="text-xl font-bold text-white">FitNexus</span>
              </Link>
            </motion.div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-primary-400 border-b-2 border-primary-400"
                          : "text-gray-300 hover:text-white hover:border-b-2 hover:border-gray-400"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
