'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Hotel, LogOut, Calendar, LayoutDashboard, User, Menu } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { logoutAction } from '@/actions/auth';
import Button from './ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, setUser, logout } = useAuthStore();

  useEffect(() => {
    const userCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user-info='));
    
    if (userCookie) {
      try {
        const userInfo = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        setUser(userInfo);
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }
  }, [setUser]);

  const handleLogout = async () => {
    logout();
    await logoutAction();
  };

  const isSeller = user?.roles.includes('ROLE_SELLER');
  const isCustomer = user?.roles.includes('ROLE_CUSTOMER');

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-neutral-900 group">
            <div className="bg-primary-50 p-2 rounded-xl group-hover:bg-primary-100 transition-colors">
              <Hotel className="w-6 h-6 text-primary-500" />
            </div>
            <span className="text-xl font-bold tracking-tight">TravelHub</span>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
             <Link href="/hotels">
               <Button variant="ghost" size="sm">Hotels</Button>
             </Link>
             <Link href="/destinations">
               <Button variant="ghost" size="sm">Destinations</Button>
             </Link>
             <Link href="/deals">
               <Button variant="ghost" size="sm">Deals</Button>
             </Link>
          </div>

          {/* Right Side - Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 pl-2 rounded-full border-neutral-200">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xs">
                       {user?.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate hidden sm:inline-block">{user?.fullName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {isCustomer && (
                    <DropdownMenuItem asChild>
                      <Link href="/my-bookings" className="w-full cursor-pointer">
                        <Calendar className="mr-2 h-4 w-4" />
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  {isSeller && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="w-full cursor-pointer">
                         <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem asChild>
                     <Link href="/profile" className="w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                     </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm" className="rounded-full px-5">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
