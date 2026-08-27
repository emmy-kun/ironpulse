import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../../assets/logos/logo.png";

import Button from "../ui/Button";
import Container from "../ui/Container";
import ScrollLink from "../ui/ScrollLink";
import AuthModal from "../auth/AuthModal";
import { scrollToSection } from "../../lib/lenis";
import { getSession, logOut } from "../../lib/auth";

const navLinks = [
  { name: "Programs", to: "programs" },
  { name: "Dashboard", to: "dashboard" },
  { name: "Schedule", to: "schedule" },
  { name: "Coaches", to: "coaches" },
  { name: "Recovery", to: "recovery" },
  { name: "Membership", to: "membership" },
  { name: "FAQ", to: "faq" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [authOpen, setAuthOpen] = useState(false);
  const [session, setSession] = useState(() => getSession());

  const handleLogout = () => {
    logOut();
    setSession(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...navLinks.map((item) => item.to)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#0B0B0D]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <Container>
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}

            <Link to="/" className="cursor-pointer">
              <img
                src={logo}
                alt="IronPulse"
                className="h-11 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((item) => (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  className={`
                    cursor-pointer
                    text-sm
                    font-medium
                    tracking-wide
                    transition-all
                    duration-300
                    hover:text-white
                    ${
                      activeId === item.to
                        ? "text-blue-500"
                        : "text-zinc-300"
                    }
                  `}
                >
                  {item.name}
                </ScrollLink>
              ))}
            </nav>

            {/* Desktop Button */}

            <div className="hidden items-center gap-5 lg:flex">
              {session ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-300">
                    Hi, {session.name.split(" ")[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  Log In
                </button>
              )}

              <Button onClick={() => scrollToSection("membership")}>
                Join Club
              </Button>
            </div>

            {/* Mobile Button */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="text-white lg:hidden"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.25 }}
            className="
              fixed
              top-20
              left-0
              z-40
              w-full
              border-t
              border-white/10
              bg-[#111315]
              lg:hidden
            "
          >
            <Container>
              <div className="flex flex-col py-8">
                {navLinks.map((item) => (
                  <ScrollLink
                    key={item.name}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="
                      border-b
                      border-white/5
                      py-4
                      text-zinc-300
                      transition
                      hover:text-blue-500
                    "
                  >
                    {item.name}
                  </ScrollLink>
                ))}

                {session ? (
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-zinc-300">
                      Hi, {session.name.split(" ")[0]}
                    </span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="text-sm text-zinc-500 hover:text-white"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setAuthOpen(true);
                    }}
                    className="mt-6 text-left text-sm font-medium text-zinc-300 hover:text-white"
                  >
                    Log In
                  </button>
                )}

                <Button
                  className="mt-6 w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToSection("membership");
                  }}
                >
                  Join Club
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthenticated={setSession}
      />
    </>
  );
}

export default Navbar;
