'use client';

import lightLogo from "../../images/icon_light.png" ;
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  Moon,
  Sun,
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
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);
  const [mobileMoodOpen, setMobileMoodOpen] = useState(false);

  const accountMenuRef = useRef(null);
  const mobileAccountRef = useRef(null);
  const mobileMoodRef = useRef(null);

  // ---- theme handling -----------------------------------------------
  useLayoutEffect(() => {
    const html = document.documentElement;
    const storedTheme = window.localStorage.getItem('theme');
    const theme = storedTheme === 'dark'
      ? 'dark'
      : storedTheme === 'light'
      ? 'light'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    setIsDark(theme === 'dark');
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
    window.localStorage.setItem('theme', theme);
    setIsThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (!isThemeLoaded) return;
    const html = document.documentElement;
    const theme = isDark ? 'dark' : 'light';
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
    window.localStorage.setItem('theme', theme);
  }, [isDark, isThemeLoaded]);

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
    { href: '/discountedproduct', label: 'Discounted Product' },
    { href: '/sneakerstudio', label: 'Sneaker Studio' },
    { href: '/brands', label: 'Brands' },
    { href: '/men', label: 'MEN' },
    { href: '/women', label: 'WOMEN' },
    { href: '/children', label: 'CHILDREN' },
    { href: '/accessories', label: 'ACCESSORIES' },
    ...(currentUser ? [] : [{ href: '/auth/signup', label: 'Sign Up' }]),
  ];

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));
  const themeText = isDark ? 'text-white' : 'text-black';
  const themeIcon = isDark ? 'text-white' : 'text-black';

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
            <select className="self-end bg-gray-500 dark:bg-gray-500 text-amber-50 text-xs shrink-0">
              <option className="bg-white dark:bg-black text-black dark:text-amber-50" value="english">
                EN
              </option>
              <option className="bg-white dark:bg-black text-black dark:text-amber-50" value="bengali">
                BN
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* ---------------- Main navbar ---------------- */}
      <nav
        ref={navbarRef}
        className={`relative z-50 max-w-full border-b transition-shadow ${isDark ? 'border-gray-700 bg-black' : 'border-gray-200 bg-white'}`}
      >
        <div className="container mx-auto px-4">
          {/* ---- Mobile row ---- */}
          <div className="flex items-center justify-between py-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="rounded-lg p-2 transition-colors bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${themeIcon}`} />
              ) : (
                <Menu className={`h-6 w-6 ${themeIcon}`} />
              )}
            </button>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className={`text-xl font-bold md:text-2xl ${themeText}`}>
                Exclusive
              </span>
            </Link>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => setIsSearchOpen((v) => !v)}
                className="rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Search"
              >
                <Search size={24} className={themeIcon} />
              </button>

              <Link
                href="/wishlist"
                className="relative rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Heart fill="#ff0000" size={24} className={themeIcon} strokeWidth={2} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {wishlistCount}
                </span>
              </Link>

              <Link
                href="/cart"
                className="relative rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={24} className={themeIcon} strokeWidth={2} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>

          {/* ---- Desktop row ---- */}
          <div className="hidden items-center justify-between gap-12 lg:flex">

            <div className=' flex items-center gap-2' >
              <ContactRound className="hidden dark:block" size={36} color={isDark ? '#ffffff' : '#000000'} />
              <ContactRound className=" dark:hidden" size={36} color={isDark ? '#ffffff' : '#000000'} />
              <h1 className={`text-30 ${themeText} font-extrabold leading-6`} > Customer care: 09666200300 </h1>
            </div>

            <Link href="/" className={`text-2xl font-bold leading-6 ${themeText}`}>
              <Image className=" h-28 w-40 py-2 " src={lightLogo} alt='img'/>
            </Link>

            <div className="flex items-center gap-6">
              {/* Search box */}
              <div className="relative">
                <input
                  type="search"
                  placeholder="What are you looking for?"
                  className="w-56 rounded-lg border border-gray-30 py-2 pl-4 pr-10 text-sm focus:border-black  dark:border-gray-600"
                />
                <Search size={20} className={`absolute right-2 top-1/2 -translate-y-1/2 ${themeIcon}`} />
              </div>

              <div className="flex items-center gap-4">
                <Link href="/wishlist" className="relative rounded-lg p-2 transition-colors hover:bg-gray-300 dark:hover:bg-gray-800">
                  <Heart fill="#ff0000" size={28} className={themeIcon} strokeWidth={2} />
                  
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {wishlistCount}
                  </span>
                </Link>

                <Link href="/cart" className="relative rounded-lg p-2 transition-colors hover:bg-gray-300 dark:hover:bg-gray-800" aria-label="Shopping cart">
                  <ShoppingCart size={28} className={themeIcon} strokeWidth={2} />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartCount}
                  </span>
                </Link>

                {/* Account dropdown (desktop) */}
                <div className="relative" ref={accountMenuRef}>
                  <button
                    onClick={() => setAccountMenuOpen((v) => !v)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${accountMenuOpen ? (isDark ? 'bg-black text-white' : 'bg-white text-black') : 'hover:bg-gray-300 dark:hover:bg-gray-800'} ${themeIcon}`}
                    aria-label="Account menu"
                  >
                    <User size={22} className={themeIcon} />
                  </button>
                  {accountMenuOpen && (
                    <div className={`absolute right-0 mt-2 min-w-56 space-y-3 rounded-xl border-none py-4 pl-5 pr-3 backdrop-blur-[100px] ${isDark ? 'bg-black/50 text-white' : 'bg-white/80 text-black'}`}>
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

                <button
                  onClick={toggleTheme}
                  className={`inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 cursor-pointer ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
                  aria-label="Toggle light and dark mode"
                >
                  {isDark ? <Moon className={`h-4 w-4 ${themeIcon}`} /> : <Sun className={`h-4 w-4 ${themeIcon}`} />}
                  {isDark ? 'Dark mode' : 'Light mode'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* ---------------- Mobile menu dropdown ---------------- */}
        {isMobileMenuOpen && (
          <div className="border-t lg:hidden ${isDark ? 'border-gray-700 bg-black' : 'border-gray-200 bg-white'}">
            <div className="container mx-auto px-4 py-4">
              <div className="mb-3 flex justify-between gap-3">
                {/* Mood dropdown */}
                <div className="relative w-1/2" ref={mobileMoodRef}>
                  <button
                    onClick={() => setMobileMoodOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Mood <ChevronDown size={16} />
                  </button>
                  {mobileMoodOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white dark-bg-black py-1 shadow-lg dark:border-gray-700 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-800 ">
                      <button
                        onClick={() => {
                          setIsDark(false);
                          setMobileMoodOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-200 hover:dark:bg-gray-600`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => {
                          setIsDark(true);
                          setMobileMoodOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-200 hover:dark:bg-gray-600`}
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
                    className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:text-white"
                  >
                    Account <ChevronDown size={16} />
                  </button>
                  {mobileAccountOpen && (
                    <div className={`absolute right-0 z-10 mt-1 min-w-56 space-y-3 rounded-xl border-none  backdrop-blur-[100px] border-0 bg-gray-100 dark:bg-black/50 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900`}>
                      {currentUser ? (
                        <>
                          <p className="text-sm text-gray-300">{currentUser.email}</p>
                          <Link href="/account" className="flex items-center gap-4 hover:bg-gray-400 hover:dark:bg-gray-700 p-2 rounded-2xl " onClick={() => setMobileAccountOpen(false)}>
                            <User size={20} /> Manage My Account
                          </Link>
                          <Link href="/orders" className="flex items-center gap-4 hover:bg-gray-400 hover:dark:bg-gray-700 p-2 rounded-2xl " onClick={() => setMobileAccountOpen(false)}>
                            <ShoppingBag size={20} /> My Order
                          </Link>
                          <Link href="/cancellations" className="flex items-center gap-4 hover:bg-gray-400 hover:dark:bg-gray-700 p-2 rounded-2xl " onClick={() => setMobileAccountOpen(false)}>
                            <XCircle size={20} /> My Cancellation
                          </Link>
                          <Link href="/reviews" className="flex items-center gap-4 hover:bg-gray-400 hover:dark:bg-gray-700 p-2 rounded-2xl " onClick={() => setMobileAccountOpen(false)}>
                            <Star size={20} /> My Reviews
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link href="/auth/login" className="flex items-center gap-4 hover:bg-gray-400 hover:dark:bg-gray-700 p-2 rounded-2xl " onClick={() => setMobileAccountOpen(false)}>
                            <User size={20} /> Sign In
                          </Link>
                          <Link href="/auth/signup" className="flex items-center gap-4 hover:bg-gray-400 hover:dark:bg-gray-700 p-2 rounded-2xl " onClick={() => setMobileAccountOpen(false)}>
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
                      className={`block rounded-lg px-4 py-3 text-base font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-500 ${themeText} ${isActive(link.href) ? 'dark:bg-slate-600 bg-gray-100' : ''}`}
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
                    className="w-full rounded-full border-2 border-gray-300 px-6 py-4 pr-12 text-lg focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    autoFocus
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Search"
                  >
                    <Search className={`h-6 w-6 ${themeIcon}`} />
                  </button>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((term) => (
                      <button
                        key={term}
                        className="rounded-full bg-gray-100 px-4 py-2 text-sm transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
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

      <div className={`hidden lg:block py-[15px] ${isDark ? 'bg-slate-800' : 'bg-gray-300'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[16px] font-medium leading-6 transition-colors hover:text-gray-500 ${themeText} ${isActive(link.href) ? `border-b-2 ${isDark ? 'border-white' : 'border-black'}` : ''}`}
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