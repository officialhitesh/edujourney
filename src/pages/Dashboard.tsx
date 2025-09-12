import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  GraduationCap, 
  MapPin, 
  Calendar,
  TrendingUp,
  BookOpen,
  Users,
  LogOut
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Sign Out Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while signing out.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-primary">EduJourney</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.user_metadata?.name || user.email}
            </span>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard!</h1>
          <p className="text-muted-foreground">
            Let's start building your educational journey together.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-gradient border-0 shadow-lg hover:shadow-xl transition-smooth hover:scale-105 animate-slide-up">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-2">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Take Assessment</CardTitle>
              <CardDescription>Discover your strengths and interests</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="default" 
                className="w-full" 
                onClick={() => navigate('/assessment')}
              >
                Start Now
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 shadow-lg hover:shadow-xl transition-smooth hover:scale-105 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Explore Streams</CardTitle>
              <CardDescription>Learn about different academic paths</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate('/streams')}
              >
                Explore
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 shadow-lg hover:shadow-xl transition-smooth hover:scale-105 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-tertiary rounded-lg flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Find Colleges</CardTitle>
              <CardDescription>Search for colleges near you</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="education" 
                className="w-full"
                onClick={() => navigate('/colleges')}
              >
                Search
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 shadow-lg hover:shadow-xl transition-smooth hover:scale-105 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-2">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Important Dates</CardTitle>
              <CardDescription>Track admission deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/timeline')}
              >
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 card-gradient border-0 shadow-lg animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Your Progress
              </CardTitle>
              <CardDescription>Complete these steps to get personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Profile Setup</span>
                  <span className="text-muted-foreground">0/4 completed</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Aptitude Assessment</span>
                  <span className="text-muted-foreground">Not started</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Stream Selection</span>
                  <span className="text-muted-foreground">Pending assessment</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 shadow-lg animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-secondary" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Complete Your Assessment</h4>
                <p className="text-xs text-muted-foreground">
                  Take our 15-minute assessment to get personalized stream recommendations.
                </p>
              </div>
              
              <div className="p-4 bg-secondary/10 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Explore Government Colleges</h4>
                <p className="text-xs text-muted-foreground">
                  Browse over 2000+ government colleges with detailed information.
                </p>
              </div>
              
              <div className="p-4 bg-tertiary/10 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Track Important Dates</h4>
                <p className="text-xs text-muted-foreground">
                  Stay updated with admission deadlines and entrance exam dates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;