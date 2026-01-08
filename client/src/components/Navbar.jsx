import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon, Heart } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle body scroll lock when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Handle background change on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Theaters", path: "/theaters" },
    { name: "Releases", path: "/releases" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-16 lg:px-36 py-4 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10 py-3"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between max-w-360 mx-auto">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="z-50">
          <img
            src={assets.logo}
            alt="Logo"
            className="h-8 md:h-10 object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 px-8 py-2.5 rounded-full backdrop-blur-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <SearchIcon className="hidden md:block w-5 h-5 text-gray-300 cursor-pointer hover:text-white transition-colors" />
          <Link to="/favorite" className="relative group">
            <Heart
              className={`w-5 h-5 transition-colors ${
                location.pathname === "/favorite"
                  ? "fill-primary text-primary"
                  : "text-gray-300 group-hover:text-white"
              }`}
            />
          </Link>

          {!user ? (
            <button
              onClick={openSignIn}
              className="px-6 py-2 bg-primary hover:bg-[#AF2529] text-white text-sm transition-all rounded-full font-bold shadow-lg shadow-primary/20"
            >
              Login
            </button>
          ) : (
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TicketPlus width={15} />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}

          <button
            className="md:hidden z-50 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XIcon className="w-7 h-7" />
            ) : (
              <MenuIcon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-white hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
