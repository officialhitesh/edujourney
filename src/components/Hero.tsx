import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Students learning and growing" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 hero-gradient opacity-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 50,000+ Students
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Career Journey 
              <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent"> 
                Starts Here
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Discover your perfect stream, find the right college, and build a successful career 
              with our AI-powered guidance platform designed for Classes 10-12 students.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/assessment">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Take Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/colleges">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Explore Colleges
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Students Guided</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">2000+</div>
                <div className="text-sm text-muted-foreground">Colleges Listed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-tertiary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Cards */}
          <div className="hidden lg:block relative">
            <div className="grid gap-6">
              {/* Assessment Card */}
              <div className="card-gradient p-6 rounded-xl shadow-lg hover:shadow-xl transition-smooth animate-float">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-card-foreground">Aptitude Assessment</h3>
                    <p className="text-sm text-muted-foreground">Discover your strengths</p>
                  </div>
                </div>
                <div className="w-full bg-border rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full w-3/4 animate-pulse"></div>
                </div>
                <p className="text-xs text-muted-foreground">15 min assessment</p>
              </div>

              {/* Recommendation Card */}
              <div className="card-gradient p-6 rounded-xl shadow-lg hover:shadow-xl transition-smooth animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-card-foreground">Smart Recommendations</h3>
                    <p className="text-sm text-muted-foreground">AI-powered suggestions</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Science Stream</span>
                    <span className="text-primary font-medium">95% match</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Engineering</span>
                    <span className="text-secondary font-medium">88% match</span>
                  </div>
                </div>
              </div>

              {/* College Card */}
              <div className="card-gradient p-6 rounded-xl shadow-lg hover:shadow-xl transition-smooth animate-float" style={{ animationDelay: '2s' }}>
                <h3 className="font-semibold text-card-foreground mb-2">Nearby Colleges</h3>
                <p className="text-sm text-muted-foreground mb-4">IIT Delhi - 2.5km away</p>
                <Button variant="education" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;