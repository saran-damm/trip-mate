import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Icon from "../common/IconProvider";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { name: "Home", path: "/home", icon: "home" as const },
  { name: "My Trips", path: "/saved-trips", icon: "plane" as const },
  { name: "Profile", path: "/profile", icon: "user" as const },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`
        bg-surface border-b border-neutral/10
        px-6 py-4 flex justify-between items-center sticky top-0 z-50
        transition-all duration-300
        ${scrolled ? "shadow-md py-3" : "py-4"}
      `}
    >
      {/* Logo */}
      <Link to="/home" className="flex items-center gap-2 group">
        <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold transform transition-transform group-hover:rotate-12">
          T
        </div>
        <h1 className="text-xl font-bold">
          <span className="text-primary">Trip</span>
          <span className="text-dark">Mate</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {/* Nav Links */}
        <div className="flex gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-1.5 px-2 py-1 rounded-button
                  transition-all duration-300
                  ${isActive 
                    ? "text-primary font-semibold bg-primary/10" 
                    : "text-neutral hover:text-primary hover:bg-light"}
                `}
              >
                <Icon icon={item.icon} className="text-sm" />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex items-center gap-1.5"
            aria-label="Logout"
          >
            <Icon icon={"sign-out-alt" as const} />
            <span>Logout</span>
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            aria-label="Logout"
          >
            <Icon icon={"sign-out-alt" as const} />
          </button>
        )}
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-neutral hover:text-primary transition-colors"
        >
          {mobileMenuOpen ? <Icon icon={"times" as const} /> : <Icon icon={"bars" as const} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface shadow-lg py-4 px-6 flex flex-col gap-4 slide-up">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-2 py-2 px-3 rounded-button
                  ${isActive 
                    ? "text-primary font-semibold bg-primary/10" 
                    : "text-neutral hover:text-primary hover:bg-light"}
                `}
              >
                <Icon icon={item.icon} />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
