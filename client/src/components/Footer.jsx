import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { assets } from "../assets/assets";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  MapPin,
  Mail,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black pt-20 pb-10 px-6 md:px-16 lg:px-36 border-t border-white/5 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <img src={assets.logo} alt="Logo" className="h-9 object-contain" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Your ultimate destination for booking movie tickets. Experience
              the latest blockbusters with the best seating and seamless
              booking.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: "#E62429" }}
                  className="text-gray-500 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="md:pl-10">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              {[
                "Now Showing",
                "Coming Soon",
                "Theaters",
                "Offers",
                "My Bookings",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-primary text-sm transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
              Stay Updated
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <MapPin size={16} className="text-primary" />
                <span>Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <Mail size={16} className="text-primary" />
                <span>support@quickshow.com</span>
              </div>
            </div>

            {/* Glassmorphic Newsletter */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-600">
          <p>© {currentYear} QuickShow India. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
