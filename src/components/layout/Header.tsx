import { Link, useLocation } from "react-router-dom";
import { Home, Search, User, PlusCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export function Header() {
  const location = useLocation();
  const { user } = useAuth();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">G</span>
          </div>
          <span className="font-display font-bold text-lg text-gold-gradient">
            Galerivo
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <NavLink to="/" icon={Home} active={location.pathname === "/"} />
          <NavLink to="/explore" icon={Search} active={location.pathname === "/explore"} />
          {user && (
            <NavLink to="/upload" icon={PlusCircle} active={location.pathname === "/upload"} />
          )}
          <NavLink 
            to={user ? "/profile" : "/auth"} 
            icon={User} 
            active={location.pathname === "/profile" || location.pathname === "/auth"} 
          />
        </nav>
      </div>
    </header>
  );
}

interface NavLinkProps {
  to: string;
  icon: React.ElementType;
  active: boolean;
}

function NavLink({ to, icon: Icon, active }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "p-2 rounded-lg transition-colors",
        active 
          ? "text-primary bg-primary/10" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      <Icon className="w-5 h-5" />
    </Link>
  );
}
