import Link from "next/link";
import { COLLEGE_INFO } from "@/lib/constants";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Careers & Placements", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white font-serif leading-none">
                PEACE
              </span>
              <span className="text-xs font-semibold tracking-widest text-yellow-500 uppercase">
                College of Management
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              Empowering students with industry-relevant skills, strategic thinking, and leadership capabilities for successful business careers. Approved by AICTE, offering elite MBA specializations.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4 md:pl-8">
            <h3 className="text-white font-semibold text-lg border-b border-slate-800 pb-2">
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-yellow-500 flex items-center transition-colors duration-150"
                  >
                    <ChevronRight className="w-4 h-4 text-red-500 mr-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold text-lg border-b border-slate-800 pb-2">
              Contact Information
            </h3>
            <div className="space-y-4 text-sm">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-yellow-500">
                    Campus Address
                  </h4>
                  <p className="text-slate-400">{COLLEGE_INFO.campusAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-yellow-500">
                    City Office Address
                  </h4>
                  <p className="text-slate-400">{COLLEGE_INFO.officeAddress}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-yellow-500">
                    Phone / WhatsApp
                  </h4>
                  <a
                    href={`tel:${COLLEGE_INFO.phoneRaw}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {COLLEGE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-yellow-500">
                    Email Support
                  </h4>
                  <a
                    href={`mailto:${COLLEGE_INFO.email}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {COLLEGE_INFO.email}
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {currentYear} Peace College of Management. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/terms-and-conditions" className="hover:underline">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:underline">
              Disclaimer
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:underline text-red-500 font-semibold">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
