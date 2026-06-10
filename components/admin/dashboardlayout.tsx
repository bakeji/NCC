'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Headphones,
  Video,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Blogs', href: '/admin/blog', icon: FileText },
    { name: 'Events', href: '/admin/event', icon: Calendar },
    { name: 'Sermons', href: '/admin/sermons', icon: Video },
    { name: 'Audio Messages', href: '/admin/audio', icon: Headphones },
    { name: 'Members', href: '/admin/members', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-linear-to-b from-purple-900 to-purple-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex shrink-0 items-center px-4">
              <h1 className="text-2xl font-bold text-white">NCC Admin</h1>
            </div>
            <nav className="mt-8 flex-1 space-y-1 px-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? 'bg-purple-700 text-white shadow-lg'
                        : 'text-purple-100 hover:bg-purple-700/50 hover:text-white'
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 shrink-0 ${
                        isActive(item.href) ? 'text-white' : 'text-purple-200'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div className={`lg:hidden ${sidebarOpen ? 'relative z-50' : ''}`}>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-900/80"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-linear-to-b from-purple-900 to-purple-800 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-2xl font-bold text-white">NCC Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-purple-100 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-8 space-y-1 px-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-purple-700 text-white shadow-lg'
                      : 'text-purple-100 hover:bg-purple-700/50 hover:text-white'
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 shrink-0 ${
                      isActive(item.href) ? 'text-white' : 'text-purple-200'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex h-16 shrink-0 border-b border-gray-200 bg-white shadow-sm">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1 items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Content Management
              </h2>
            </div>
            <div className="ml-4 flex items-center">
              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <span className="hidden sm:block">Admin User</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <Link
                      href="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        setUserMenuOpen(false);
                        // Add logout logic here
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;