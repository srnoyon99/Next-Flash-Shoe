'use client';

import lightLogo from "../../images/icon_light.png" ;
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
  User,
  UserPlus,
  ShoppingBag,
  XCircle,
  Star,
  LogOut,
  ChevronDown,
  ContactRound,
} from 'lucide-react';
import Image from 'next/image';


export default function Navbar({
  currentUser = null,
  onLogout,
  wishlistCount = 0,
  cartCount = 0,
}) {
  const navbarRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);
  const [mobileMoodOpen, setMobileMoodOpen] = useState(false);

  const accountMenuRef = useRef(null);
  const mobileAccountRef = useRef(null);
  const mobileMoodRef = useRef(null);

  // ---- theme handling -----------------------------------------------
  useEffect(() => {
    const html = document.querySelector('html');
    html.classList.remove('light', 'dark');
    html.classList.add(isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // ---- sticky header on scroll ---------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        navbarRef.current?.classList.add('shadow-md');
      } else {
        navbarRef.current?.classList.remove('shadow-md');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---- close dropdowns on outside click -------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
      if (mobileAccountRef.current && !mobileAccountRef.current.contains(event.target)) {
        setMobileAccountOpen(false);
      }
      if (mobileMoodRef.current && !mobileMoodRef.current.contains(event.target)) {
        setMobileMoodOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      if (onLogout) await onLogout();
      setIsMobileMenuOpen(false);
      setAccountMenuOpen(false);
      setMobileAccountOpen(false);
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Discounted Product' },
    { href: '/about', label: 'Sneaker Studio' },
    { href: '/about', label: 'Brands' },
    { href: '/about', label: 'MEN' },
    { href: '/about', label: 'WOMEN' },
    { href: '/about', label: 'CHILDREN' },
    { href: '/about', label: 'ACCESSORIES' },
    ...(currentUser ? [] : [{ href: '/auth/signup', label: 'Sign Up' }]),
  ];

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <>
      {/* ---------------- Top promo bar (desktop) ---------------- */}


      {/* ---------------- Top promo bar (mobile) ---------------- */}
      <div className="block lg:hidden bg-gray-600 py-[15px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] text-amber-50 truncate">
              Summer Sale Free Delivery - OFF 50%!
            </p>
            <Link
              href="/shop"
              className="shrink-0 text-[13px] font-semibold text-amber-50 underline underline-offset-1"
            >
              Shop Now
            </Link>
            <select className="self-end bg-white dark:bg-black text-amber-50 text-xs shrink-0">
              <option className="bg-white dark:bg-black text-amber-50" value="english">
                EN
              </option>
              <option className="bg-white dark:bg-black text-amber-50" value="bengali">
                BN
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* ---------------- Main navbar ---------------- */}
      <nav
        ref={navbarRef}
        className="relative z-50 max-w-full border-b border-gray-200 bg-white transition-shadow dark:border-gray-700 dark:bg-black"
      >
        <div className="container mx-auto px-4">
          {/* ---- Mobile row ---- */}
          <div className="flex items-center justify-between py-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 dark:text-amber-50" />
              ) : (
                <Menu className="h-6 w-6 dark:text-amber-50" />
              )}
            </button>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="text-xl font-bold text-black dark:text-amber-50 md:text-2xl">
                Exclusive
              </span>
            </Link>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => setIsSearchOpen((v) => !v)}
                className="rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Search"
              >
                <Search size={24} className="text-black dark:stroke-white" />
              </button>

              <Link
                href="/wishlist"
                className="relative rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Heart size={24} className="text-black dark:stroke-white" strokeWidth={2} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {wishlistCount}
                </span>
              </Link>

              <Link
                href="/cart"
                className="relative rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={24} className="text-black dark:stroke-white" strokeWidth={2} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>

          {/* ---- Desktop row ---- */}
          <div className="hidden items-center justify-between gap-12 lg:flex">

            <div className=' flex items-center gap-2' >
              <ContactRound size={36} color="#ffffff" />
              <h1 className=' text-30 text-amber-50 font-extrabold leading-6' > Customer care: 09666200300 </h1>
            </div>

            <Link href="/" className="text-2xl font-bold text-amber-50 leading-6">
              <Image className=" h-28 w-40 py-2 " src={lightLogo} alt='img'/>
            </Link>

            <div className="flex items-center gap-6">
              {/* Search box */}
              <div className="relative">
                <input
                  type="search"
                  placeholder="What are you looking for?"
                  className="w-56 rounded-lg border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-sm focus:border-black focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-amber-50"
                />
                <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>

              <div className="flex items-center gap-4">
                <Link href="/wishlist" className="relative rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Heart size={28} className="text-black dark:stroke-white" strokeWidth={2} />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {wishlistCount}
                  </span>
                </Link>

                <Link href="/cart" className="relative rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Shopping cart">
                  <ShoppingCart size={28} className="text-black dark:stroke-white" strokeWidth={2} />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartCount}
                  </span>
                </Link>

                {/* Account dropdown (desktop) */}
                <div className="relative" ref={accountMenuRef}>
                  <button
                    onClick={() => setAccountMenuOpen((v) => !v)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${accountMenuOpen ? 'bg-black text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    aria-label="Account menu"
                  >
                    <User size={22} className={accountMenuOpen ? 'text-white' : 'dark:text-amber-50'} />
                  </button>

                  {accountMenuOpen && (
                    <div className="absolute right-0 mt-2 min-w-56 space-y-3 rounded-xl border-none bg-black/50 py-4 pl-5 pr-3 text-white backdrop-blur-[100px]">
                      {currentUser ? (
                        <>
                          <p className="text-sm text-gray-300">{currentUser.email}</p>
                          <Link href="/account" className="flex items-center gap-4" onClick={() => setAccountMenuOpen(false)}>
                            <User size={22} /> Manage My Account
                          </Link>
                          <Link href="/orders" className="flex items-center gap-4" onClick={() => setAccountMenuOpen(false)}>
                            <ShoppingBag size={22} /> My Order
                          </Link>
                          <Link href="/cancellations" className="flex items-center gap-4" onClick={() => setAccountMenuOpen(false)}>
                            <XCircle size={22} /> My Cancellation
                          </Link>
                          <Link href="/reviews" className="flex items-center gap-4" onClick={() => setAccountMenuOpen(false)}>
                            <Star size={22} /> My Reviews
                          </Link>
                          <button onClick={handleLogout} className="flex w-full items-center gap-4 cursor-pointer">
                            <LogOut size={22} /> Log Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href="/auth/login" className="flex items-center gap-4" onClick={() => setAccountMenuOpen(false)}>
                            <User size={22} /> Sign In
                          </Link>
                          <Link href="/auth/signup" className="flex items-center gap-4" onClick={() => setAccountMenuOpen(false)}>
                            <UserPlus size={22} /> Create Account
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Dark mode toggle (desktop, top-right) ---- */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="absolute right-5 top-2 hidden lg:flex"
        >
          <span className="relative block h-8 w-14 rounded-full bg-gray-600">
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
          </span>
        </button>

        {/* ---------------- Mobile menu dropdown ---------------- */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:hidden">
            <div className="container mx-auto px-4 py-4">
              <div className="mb-3 flex justify-between gap-3">
                {/* Mood dropdown */}
                <div className="relative w-1/2" ref={mobileMoodRef}>
                  <button
                    onClick={() => setMobileMoodOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:text-amber-50"
                  >
                    Mood <ChevronDown size={16} />
                  </button>
                  {mobileMoodOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                      <button
                        onClick={() => {
                          setIsDark(false);
                          setMobileMoodOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:text-amber-50 dark:hover:bg-gray-800"
                      >
                        Light
                      </button>
                      <button
                        onClick={() => {
                          setIsDark(true);
                          setMobileMoodOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:text-amber-50 dark:hover:bg-gray-800"
                      >
                        Dark
                      </button>
                    </div>
                  )}
                </div>

                {/* Account dropdown */}
                <div className="relative w-1/2" ref={mobileAccountRef}>
                  <button
                    onClick={() => setMobileAccountOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:text-amber-50"
                  >
                    Account <ChevronDown size={16} />
                  </button>
                  {mobileAccountOpen && (
                    <div className="absolute right-0 z-10 mt-1 min-w-56 space-y-3 rounded-xl border-none bg-black/50 py-4 pl-5 pr-3 text-white backdrop-blur-[100px]">
                      {currentUser ? (
                        <>
                          <p className="text-sm text-gray-300">{currentUser.email}</p>
                          <Link href="/account" className="flex items-center gap-4" onClick={() => setMobileAccountOpen(false)}>
                            <User size={20} /> Manage My Account
                          </Link>
                          <Link href="/orders" className="flex items-center gap-4" onClick={() => setMobileAccountOpen(false)}>
                            <ShoppingBag size={20} /> My Order
                          </Link>
                          <Link href="/cancellations" className="flex items-center gap-4" onClick={() => setMobileAccountOpen(false)}>
                            <XCircle size={20} /> My Cancellation
                          </Link>
                          <Link href="/reviews" className="flex items-center gap-4" onClick={() => setMobileAccountOpen(false)}>
                            <Star size={20} /> My Reviews
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link href="/auth/login" className="flex items-center gap-4" onClick={() => setMobileAccountOpen(false)}>
                            <User size={20} /> Sign In
                          </Link>
                          <Link href="/auth/signup" className="flex items-center gap-4" onClick={() => setMobileAccountOpen(false)}>
                            <UserPlus size={20} /> Create Account
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block rounded-lg px-4 py-3 text-base font-semibold transition-colors hover:bg-gray-100 dark:text-amber-50 dark:hover:bg-gray-800 ${isActive(link.href) ? 'dark:bg-slate-600 bg-gray-100' : ''
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {currentUser && (
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full rounded-lg border border-red-700 bg-red-700 py-2 font-semibold text-white transition-colors hover:bg-red-600 dark:border-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        )}

        {/* ---------------- Mobile search dropdown ---------------- */}
        {isSearchOpen && (
          <div className="border-b border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 lg:hidden">
            <div className="container mx-auto px-4 py-6">
              <div className="mx-auto max-w-2xl">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="What are you looking for?"
                    className="w-full rounded-full border-2 border-gray-300 px-6 py-4 pr-12 text-lg focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-amber-50 dark:placeholder-gray-400"
                    autoFocus
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Search"
                  >
                    <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((term) => (
                      <button
                        key={term}
                        className="rounded-full bg-gray-100 px-4 py-2 text-sm transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-amber-50 dark:hover:bg-gray-700"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="hidden lg:block bg-black dark:bg-slate-800 py-[15px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[16px] font-medium leading-6 transition-colors hover:text-gray-500 dark:text-amber-50 ${isActive(link.href) ? 'border-b-2 border-black dark:border-amber-50' : ''
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </div>

    </>
  );
}