"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COLLEGE_INFO } from "@/lib/constants";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Careers & Placements", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Blinking Top Bar */}
      <div className="bg-slate-900 text-white text-xs md:text-sm py-2 px-4 flex justify-between items-center border-b border-yellow-500/20 z-50 relative">
        <span className="font-semibold text-yellow-400 animate-pulse hidden sm:inline">
          ✨ Admissions Open for MBA 2026-27
        </span>
        <span className="font-semibold text-yellow-400 animate-pulse sm:hidden">
          ✨ MBA Admissions 2026
        </span>
        
        {/* Blinking Call Now Button */}
        <a
          href={`tel:${COLLEGE_INFO.phoneRaw}`}
          className="animate-pulse-gold bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-all text-xs md:text-sm"
        >
          <Phone className="w-3.5 h-3.5 fill-slate-900" />
          <span>Call Now</span>
        </a>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-blue-900 font-serif leading-none">
                  PEACE
                </span>
                <span className="text-xxs md:text-xs font-semibold tracking-widest text-red-700 uppercase">
                  College of Management
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm lg:text-base font-semibold transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-red-700 border-b-2 border-red-700 pb-1"
                      : "text-slate-600 hover:text-blue-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href="/contact"
                className="bg-red-700 text-white font-bold px-5 py-2.5 rounded hover:bg-red-800 transition-colors duration-200 text-sm shadow-sm"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-blue-900 p-2 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-base font-medium rounded-md px-3 ${
                  isActive(link.href)
                    ? "text-red-700 bg-red-50 font-bold"
                    : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 px-3">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-red-700 text-white font-bold py-3 rounded hover:bg-red-800 transition-colors shadow-sm"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
