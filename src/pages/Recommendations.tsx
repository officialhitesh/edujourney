import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  BookOpen, 
  Building2, 
  FileText, 
  ArrowLeft,
  Sparkles,
  Target,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface StudentFormData {
  id: string;
  name: string;
  class: string;
  interests: string;
  weak_subjects: string | null;
  marks: string;
  career_interest: string;
  stream: string | null;
  exam_preference: string;
  created_at: string;
}

interface Recommendation {
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
  color: string;
}

export default function Recommendations() {
  const [studentData, setStudentData] = useState<StudentFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view your recommendations.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from('student_form')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast({
            title: "No Assessment Found",
            description: "Please complete the assessment first to get recommendations.",
            variant: "destructive",
          });
          navigate("/assessment");
          return;
        }
        throw error;
      }

      setStudentData(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
      toast({
        title: "Error",
        description: "Failed to load your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = (): Recommendation[] => {
    if (!studentData) return [];

    const recommendations: Recommendation[] = [];

    // Recommended Stream
    let streamRecommendation = "Science Stream";
    if (studentData.interests === "commerce" || studentData.career_interest === "business") {
      streamRecommendation = "Commerce Stream";
    } else if (studentData.interests === "arts-languages" || studentData.career_interest === "government") {
      streamRecommendation = "Arts Stream";
    }

    recommendations.push({
      title: "Recommended Stream",
      description: "Based on your interests and career goals",
      items: [streamRecommendation],
      icon: <GraduationCap className="h-6 w-6" />,
      color: "bg-gradient-to-br from-primary to-primary-glow"
    });

    // Suitable Courses
    let courses: string[] = [];
    if (studentData.career_interest === "engineering") {
      courses = ["B.Tech Engineering", "B.E. Engineering", "Polytechnic Diploma"];
    } else if (studentData.career_interest === "medicine") {
      courses = ["MBBS", "BDS", "BAMS", "Nursing"];
    } else if (studentData.career_interest === "business") {
      courses = ["B.Com", "BBA", "CA Foundation", "CS Foundation"];
    } else if (studentData.career_interest === "government") {
      courses = ["B.A.", "B.Sc.", "B.Com", "Public Administration"];
    } else {
      courses = ["B.Sc.", "B.A.", "B.Com", "BCA"];
    }

    recommendations.push({
      title: "Suitable Courses",
      description: "Courses that align with your career interests",
      items: courses,
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-gradient-to-br from-secondary to-secondary-glow"
    });

    // Government Colleges (based on performance and stream)
    let colleges: string[] = [];
    if (studentData.marks === "excellent") {
      colleges = ["IIT Delhi", "NIT Warangal", "Delhi University", "JNU New Delhi"];
    } else if (studentData.marks === "good") {
      colleges = ["State Engineering College", "Government College", "Central University"];
    } else {
      colleges = ["Local Government College", "State University", "Community College"];
    }

    recommendations.push({
      title: "Suggested Government Colleges",
      description: "Top colleges based on your academic performance",
      items: colleges,
      icon: <Building2 className="h-6 w-6" />,
      color: "bg-gradient-to-br from-tertiary to-tertiary-glow"
    });

    // Relevant Government Exams
    let exams: string[] = [];
    if (studentData.exam_preference === "jee-neet") {
      exams = ["JEE Main", "JEE Advanced", "NEET", "BITSAT"];
    } else if (studentData.exam_preference === "cuet") {
      exams = ["CUET UG", "CUET PG", "University Entrance Exams"];
    } else if (studentData.exam_preference === "upsc-ssc") {
      exams = ["UPSC CSE", "SSC CGL", "SSC CHSL", "State PSC"];
    } else if (studentData.exam_preference === "cat-gmat") {
      exams = ["CAT", "XAT", "SNAP", "GMAT"];
    }

    recommendations.push({
      title: "Relevant Government Exams",
      description: "Competitive exams that match your preferences",
      items: exams,
      icon: <FileText className="h-6 w-6" />,
      color: "bg-gradient-to-br from-accent to-accent/80"
    });

    return recommendations;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No assessment data found.</p>
          <Button onClick={() => navigate("/assessment")} className="mt-4">
            Take Assessment
          </Button>
        </div>
      </div>
    );
  }

  const recommendations = generateRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Your Personalized Recommendations
            </h1>
            <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hello <span className="font-semibold text-foreground">{studentData.name}</span>! 
            Based on your assessment, we've created personalized recommendations to guide your educational journey.
          </p>
        </div>

        {/* Student Summary */}
        <Card className="mb-8 border-2 shadow-lg bg-gradient-to-r from-card to-card/80">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Assessment Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Academic Level</p>
                <Badge variant="secondary" className="text-sm">
                  {studentData.class === "class10" ? "Class 10" : 
                   studentData.class === "class12" ? "Class 12" :
                   studentData.class === "undergraduate" ? "Undergraduate" : "Postgraduate"}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Performance</p>
                <Badge variant="secondary" className="text-sm">
                  {studentData.marks === "excellent" ? "Excellent (90%+)" :
                   studentData.marks === "good" ? "Good (75-90%)" :
                   studentData.marks === "average" ? "Average (60-75%)" : "Needs Improvement"}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Career Interest</p>
                <Badge variant="secondary" className="capitalize text-sm">
                  {studentData.career_interest.replace("-", " & ")}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recommendations.map((recommendation, index) => (
            <Card 
              key={index} 
              className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <CardHeader className={`${recommendation.color} text-white relative`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {recommendation.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {recommendation.title}
                    </CardTitle>
                    <CardDescription className="text-white/90">
                      {recommendation.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 transform translate-x-16 -translate-y-8 group-hover:scale-110 transition-transform duration-300"></div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {recommendation.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
                    >
                      <Award className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Section */}
        <div className="mt-12 text-center">
          <Card className="border-2 shadow-lg bg-gradient-to-r from-primary/5 to-primary-glow/5">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                These recommendations are tailored specifically for you. Take the next step by exploring colleges, 
                preparing for exams, or connecting with educational counselors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary-glow"
                  onClick={() => navigate("/dashboard")}
                >
                  Explore More Resources
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/assessment")}
                >
                  Retake Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}