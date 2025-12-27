"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Hotel,
  Calendar,
  Shield,
  Users,
  Tag,
  FileText,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { logoutAction } from "@/actions/auth";
import Button from "../ui/Button";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";

export default function Header() {
  const pathname = usePathname();
  const { user, setUser, initializeFromCookies } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize auth state from cookies on mount
  useEffect(() => {
    initializeFromCookies();
  }, [initializeFromCookies]);

  const handleLogout = async () => {
    await logoutAction();
    setUser(null);
  };

  const navigation = [
    { name: "Hotels", href: "/hotels" },
    { name: "Destinations", href: "/destinations" },
  ];

  const userInitial = user?.fullName?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
            <Hotel className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-neutral-900">TravelHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                pathname === item.href ? "text-primary-600" : "text-neutral-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-neutral-100 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary-100 text-primary-600 text-sm font-semibold">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.fullName}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/my-bookings" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                {user.roles?.includes("ROLE_SELLER") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/seller/dashboard"
                        className="flex items-center gap-2"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Seller Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/seller/hotels"
                        className="flex items-center gap-2"
                      >
                        <Hotel className="h-4 w-4" />
                        My Hotels
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user.roles?.includes("ROLE_ADMIN") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/users"
                        className="flex items-center gap-2"
                      >
                        <Users className="h-4 w-4" />
                        Manage Users
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/discounts"
                        className="flex items-center gap-2"
                      >
                        <Tag className="h-4 w-4" />
                        Discount Codes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/audit-logs"
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Audit Logs
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-error flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  pathname === item.href
                    ? "bg-primary-50 text-primary-600"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 border-t space-y-2">
              {user ? (
                <>
                  <Link
                    href="/my-bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                  >
                    My Bookings
                  </Link>
                  {user.roles?.includes("ROLE_SELLER") && (
                    <>
                      <Link
                        href="/seller/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                      >
                        Seller Dashboard
                      </Link>
                      <Link
                        href="/seller/hotels"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                      >
                        My Hotels
                      </Link>
                    </>
                  )}
                  {user.roles?.includes("ROLE_ADMIN") && (
                    <>
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                      >
                        Admin Dashboard
                      </Link>
                      <Link
                        href="/admin/users"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                      >
                        Manage Users
                      </Link>
                      <Link
                        href="/admin/discounts"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                      >
                        Discount Codes
                      </Link>
                      <Link
                        href="/admin/audit-logs"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                      >
                        Audit Logs
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-error hover:bg-error/10"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" fullWidth>
                      Log in
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="primary" size="sm" fullWidth>
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
