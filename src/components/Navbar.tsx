import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-primary">
          <GraduationCap className="h-8 w-8" />
          <span>EduJourney</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/assessment" className="text-muted-foreground hover:text-primary transition-smooth">
            Take Assessment
          </Link>
          <Link to="/colleges" className="text-muted-foreground hover:text-primary transition-smooth">
            Find Colleges
          </Link>
          <Link to="/streams" className="text-muted-foreground hover:text-primary transition-smooth">
            Explore Streams
          </Link>
          <Link to="/career-pulse" className="text-muted-foreground hover:text-primary transition-smooth">
            Career Pulse
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth">
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button variant="hero" size="default">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg animate-slide-up">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/assessment" 
              className="text-muted-foreground hover:text-primary transition-smooth py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Take Assessment
            </Link>
            <Link 
              to="/colleges" 
              className="text-muted-foreground hover:text-primary transition-smooth py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Colleges
            </Link>
            <Link 
              to="/streams" 
              className="text-muted-foreground hover:text-primary transition-smooth py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Streams
            </Link>
            <Link 
              to="/career-pulse" 
              className="text-muted-foreground hover:text-primary transition-smooth py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Career Pulse
            </Link>
            <Link 
              to="/about" 
              className="text-muted-foreground hover:text-primary transition-smooth py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full">Sign In</Button>
              </Link>
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;