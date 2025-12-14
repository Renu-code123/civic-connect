import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Menu, 
  X, 
  Home, 
  Map, 
  PlusCircle, 
  List, 
  LayoutDashboard,
  LogIn,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/issues', label: 'Issues', icon: List },
  { href: '/report', label: 'Report', icon: PlusCircle },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero shadow-md group-hover:shadow-glow transition-all duration-300">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">
            Civic<span className="text-primary">Report</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link key={link.href} to={link.href}>
                <Button 
                  variant={isActive ? "secondary" : "ghost"} 
                  size="sm"
                  className={cn(
                    "gap-2",
                    isActive && "bg-primary/10 text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="hero" size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background animate-slide-down">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button 
                    variant={isActive ? "secondary" : "ghost"} 
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive && "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
            <div className="h-px bg-border my-2" />
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <LogIn className="h-5 w-5" />
                Login
              </Button>
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>
              <Button variant="hero" className="w-full justify-start gap-3">
                <UserPlus className="h-5 w-5" />
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
