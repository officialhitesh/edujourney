import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  GraduationCap, 
  MapPin, 
  Calendar,
  TrendingUp,
  BookOpen,
  Users,
  LogOut,
  Award,
  Building2,
  FileText,
  Target
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const generateRecommendations = (answers: any) => {
    const degreeMap: Record<string, string[]> = {
      mathematics: ["B.Tech Computer Science", "B.Sc Mathematics", "B.Tech Engineering", "BCA"],
      science: ["MBBS", "B.Tech", "B.Sc Physics/Chemistry/Biology", "B.Pharmacy"],
      commerce: ["B.Com", "BBA", "CA", "CS", "B.Com (Hons)"],
      arts: ["BA English", "BA History", "BA Political Science", "BA Psychology", "Mass Communication"]
    };

    const examMap: Record<string, string[]> = {
      "civil-services": ["UPSC CSE", "SSC CGL", "SSC CHSL", "State PSC"],
      "technical-medical": ["JEE Main/Advanced", "NEET", "GATE", "CDS"],
      "management-commerce": ["CAT", "XAT", "MAT", "CA Foundation", "CS Executive"],
      "creative-humanities": ["CLAT", "AILET", "JMI Mass Communication", "NID", "NIFT"]
    };

    const collegeMap: Record<string, string[]> = {
      mathematics: ["IIT Delhi", "IIT Bombay", "Delhi University", "JNU"],
      science: ["AIIMS Delhi", "IIT Kharagpur", "BHU", "Jamia Millia Islamia"],
      commerce: ["SRCC", "LSR", "Hindu College", "Shri Ram College"],
      arts: ["JNU", "Delhi University", "BHU", "Jadavpur University"]
    };

    const skillsMap: Record<string, string[]> = {
      mathematics: ["Problem Solving", "Analytical Thinking", "Programming", "Statistics"],
      science: ["Research Skills", "Critical Thinking", "Laboratory Techniques", "Data Analysis"],
      commerce: ["Financial Analysis", "Communication", "Leadership", "Business Strategy"],
      arts: ["Creative Writing", "Communication", "Research", "Cultural Understanding"]
    };

    const primaryInterest = answers.q1 || 'mathematics';
    const examInterest = answers.q6 || 'technical-medical';

    return {
      degrees: degreeMap[primaryInterest] || degreeMap.mathematics,
      exams: examMap[examInterest] || examMap["technical-medical"],
      colleges: collegeMap[primaryInterest] || collegeMap.mathematics,
      skills: skillsMap[primaryInterest] || skillsMap.mathematics,
      careerPath: answers.q3 || 'private',
      motivation: answers.q5 || 'passion'
    };
  };

  const fetchAssessmentData = async (userId: string) => {
    try {
      const { data: assessment, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', userId)
        .eq('assessment_type', 'career_survey')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching assessment:", error);
        return;
      }

      if (assessment) {
        setAssessmentData(assessment);
        const recs = generateRecommendations(assessment.answers);
        setRecommendations(recs);
      }
    } catch (error) {
      console.error("Error in fetchAssessmentData:", error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        } else {
          fetchAssessmentData(session.user.id);
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
      } else {
        fetchAssessmentData(session.user.id);
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

        {/* Survey Summary - only show if user has completed assessment */}
        {assessmentData && (
          <div className="mb-8">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Your Survey Summary
                </CardTitle>
                <CardDescription>
                  Based on your recent assessment. <button onClick={() => navigate("/survey-report")} className="text-primary hover:underline">View full report →</button>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-secondary/30">
                    <div className="text-sm font-medium text-muted-foreground">Career Path</div>
                    <div className="text-lg font-semibold capitalize">{recommendations?.careerPath?.replace('-', ' ') || 'Not specified'}</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/30">
                    <div className="text-sm font-medium text-muted-foreground">Motivation</div>
                    <div className="text-lg font-semibold capitalize">{recommendations?.motivation?.replace('-', ' ') || 'Not specified'}</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/30">
                    <div className="text-sm font-medium text-muted-foreground">Recommended Degrees</div>
                    <div className="text-sm font-medium">{recommendations?.degrees?.slice(0, 2).join(', ') || 'Not available'}</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/30">
                    <div className="text-sm font-medium text-muted-foreground">Assessment Date</div>
                    <div className="text-sm font-medium">{new Date(assessmentData.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {/* Progress Overview */}
        <div className="grid lg:grid-cols-3 gap-6">
          {!assessmentData && (
            <Card className="lg:col-span-3 card-gradient border-0 shadow-lg animate-slide-up text-center py-12">
              <CardContent>
                <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Get Your Personalized Recommendations</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Take our comprehensive 9-question assessment to receive personalized degree recommendations, 
                  government exam suggestions, college options, and skill development guidance.
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary-glow"
                  onClick={() => navigate('/assessment')}
                >
                  Take Assessment Now
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;