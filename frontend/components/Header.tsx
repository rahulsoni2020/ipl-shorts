'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const getLinkClass = (href: string) => {
    const baseClass = "hover:text-blue-600 transition";
    const activeClass = "text-blue-600 font-semibold";
    return `${baseClass} ${pathname === href ? activeClass : ""}`;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
                  <Link href="/" className="flex items-center gap-2">
                      <img src="/assets/Images/logo.png" alt="Brand Logo" className="h-8 w-auto" />
                      <span>IPL Shorts</span>
                  </Link>
              </div>

        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/results" className={getLinkClass("/results")}>
            Results
          </Link>
          <Link href="/points-table" className={getLinkClass("/points-table")}>
            Points Table
          </Link>
        </nav>

        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            <img src={`/assets/icons/${mobileOpen?'cancel':'menu'}.svg`} alt="" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700 font-medium">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block hover:text-blue-600">Home</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} className="block hover:text-blue-600">About</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="block hover:text-blue-600">Contact</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
