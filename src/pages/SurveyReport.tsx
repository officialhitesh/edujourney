import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, User, BookOpen, Briefcase, GraduationCap, ArrowRight, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Assessment {
  answers: any;
  created_at: string;
}

export default function SurveyReport() {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchLatestAssessment();
  }, []);

  const fetchLatestAssessment = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: assessments, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching assessment:", error);
        toast({
          title: "Error",
          description: "Failed to load your survey results.",
          variant: "destructive",
        });
        return;
      }

      if (assessments && assessments.length > 0) {
        setAssessment(assessments[0]);
      } else {
        navigate("/assessment");
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = () => {
    if (!assessment?.answers) return null;

    const { q1, q2, q3, q6 } = assessment.answers;

    // Determine recommended stream/field
    let recommendedStream = "General";
    let streamColor = "bg-secondary";
    
    if (q1 === "mathematics") {
      recommendedStream = "Engineering & Technology";
      streamColor = "bg-blue-500";
    } else if (q1 === "science") {
      recommendedStream = "Medical & Life Sciences";
      streamColor = "bg-green-500";
    } else if (q1 === "commerce") {
      recommendedStream = "Business & Commerce";
      streamColor = "bg-orange-500";
    } else if (q1 === "arts") {
      recommendedStream = "Arts & Humanities";
      streamColor = "bg-purple-500";
    }

    // Determine career path
    let careerPath = "";
    if (q3 === "government") {
      careerPath = "Government Service";
    } else if (q3 === "private") {
      careerPath = "Private Sector";
    } else if (q3 === "research-higher") {
      careerPath = "Research & Academia";
    } else if (q3 === "entrepreneur") {
      careerPath = "Entrepreneurship";
    }

    // Determine exam recommendations
    let examRecommendations: string[] = [];
    if (q6 === "civil-services") {
      examRecommendations = ["UPSC Civil Services", "SSC CGL", "State PSC", "Banking Exams"];
    } else if (q6 === "technical-medical") {
      examRecommendations = ["JEE Main/Advanced", "NEET", "GATE", "CDS"];
    } else if (q6 === "management-commerce") {
      examRecommendations = ["CA Foundation", "CS Executive", "CAT", "XAT"];
    } else if (q6 === "creative-humanities") {
      examRecommendations = ["CLAT", "CUET", "BFA Entrance", "Mass Communication"];
    }

    // College recommendations based on preferences
    let collegeTypes: string[] = [];
    if (q1 === "mathematics" || q1 === "science") {
      collegeTypes = ["IITs", "NITs", "AIIMS", "Government Engineering Colleges"];
    } else if (q1 === "commerce") {
      collegeTypes = ["IIMs", "Delhi University", "Shri Ram College", "Government Commerce Colleges"];
    } else if (q1 === "arts") {
      collegeTypes = ["JNU", "BHU", "Delhi University", "State Universities"];
    }

    return {
      recommendedStream,
      streamColor,
      careerPath,
      examRecommendations,
      collegeTypes
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your survey results...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">No survey results found.</p>
            <Button onClick={() => navigate("/assessment")}>Take Assessment</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recommendations = getRecommendations();
  const completionDate = new Date(assessment.created_at).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500 mr-3" />
            <h1 className="text-4xl font-bold text-foreground">
              Survey Complete!
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Here are your personalized career recommendations based on your responses
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Completed on {completionDate}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 max-w-6xl mx-auto mb-8">
          {/* Main Recommendation */}
          {recommendations && (
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  Recommended Academic Stream
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className={`inline-block px-6 py-3 rounded-full ${recommendations.streamColor} text-white text-xl font-semibold mb-4`}>
                  {recommendations.recommendedStream}
                </div>
                <p className="text-muted-foreground">
                  Based on your subject preferences and interests, this stream aligns best with your goals.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Career Path & Exams */}
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations?.careerPath && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Career Path
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-3">
                    {recommendations.careerPath}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    This career path matches your long-term preferences and motivation factors.
                  </p>
                </CardContent>
              </Card>
            )}

            {recommendations?.examRecommendations && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Recommended Exams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recommendations.examRecommendations.map((exam, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2">
                        {exam}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* College Recommendations */}
          {recommendations?.collegeTypes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Recommended Institution Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {recommendations.collegeTypes.map((college, index) => (
                    <div key={index} className="p-3 rounded-lg bg-secondary/50 text-center">
                      <span className="font-medium text-sm">{college}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Survey Answers Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Your Survey Responses</CardTitle>
              <CardDescription>A summary of your assessment answers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm font-medium">Favorite Subject</span>
                  <Badge variant="secondary">{assessment.answers.q1}</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm font-medium">Work Preference</span>
                  <Badge variant="secondary">{assessment.answers.q2}</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm font-medium">Career Goal</span>
                  <Badge variant="secondary">{assessment.answers.q3}</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">Exam Interest</span>
                  <Badge variant="secondary">{assessment.answers.q6}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Button 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/recommendations")}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <ArrowRight className="h-4 w-4" />
            Explore More
          </Button>
        </div>
      </div>
    </div>
  );
}