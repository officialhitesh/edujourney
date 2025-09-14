import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  Target,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Degree {
  id: string;
  name: string;
  code: string;
  description: string;
  duration_years: number;
}

interface Specialization {
  id: string;
  degree_id: string;
  name: string;
  code: string;
  description: string;
}

export default function Streams() {
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [selectedDegree, setSelectedDegree] = useState<string>("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDegrees();
  }, []);

  useEffect(() => {
    if (selectedDegree) {
      fetchSpecializations(selectedDegree);
      setSelectedSpecialization(""); // Reset specialization when degree changes
    }
  }, [selectedDegree]);

  const fetchDegrees = async () => {
    try {
      const { data, error } = await supabase
        .from('degrees')
        .select('*')
        .order('name');

      if (error) throw error;
      setDegrees(data || []);
    } catch (error) {
      console.error("Error fetching degrees:", error);
      toast({
        title: "Error",
        description: "Failed to load degrees. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecializations = async (degreeId: string) => {
    try {
      const { data, error } = await supabase
        .from('specializations')
        .select('*')
        .eq('degree_id', degreeId)
        .order('name');

      if (error) throw error;
      setSpecializations(data || []);
    } catch (error) {
      console.error("Error fetching specializations:", error);
      toast({
        title: "Error",
        description: "Failed to load specializations. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!selectedDegree || !selectedSpecialization) {
      toast({
        title: "Missing Selection",
        description: "Please select both degree and specialization.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Save user selection for authenticated users
        const { error } = await supabase
          .from('user_roadmaps')
          .insert({
            user_id: user.id,
            degree_id: selectedDegree,
            specialization_id: selectedSpecialization,
            roadmap_id: null // Will be updated when roadmap is found
          });

        if (error) {
          console.error("Error saving user selection:", error);
          // Continue anyway - show roadmap even if saving fails
        }
      }

      // Navigate to roadmap with selected IDs
      navigate(`/roadmap?degree=${selectedDegree}&specialization=${selectedSpecialization}`);
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDegreeData = degrees.find(d => d.id === selectedDegree);
  const selectedSpecializationData = specializations.find(s => s.id === selectedSpecialization);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading academic streams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Explore Academic Streams
            </h1>
            <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover your perfect career path with personalized roadmaps, entry-level opportunities, 
            and industry insights tailored to your academic choices.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 shadow-lg bg-gradient-to-r from-card to-card/80">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Choose Your Academic Path</CardTitle>
                  <CardDescription>
                    Select your degree and specialization to get a personalized career roadmap
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Degree Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <label className="text-lg font-semibold">Select Your Degree</label>
                </div>
                <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Choose your degree program" />
                  </SelectTrigger>
                  <SelectContent>
                    {degrees.map((degree) => (
                      <SelectItem key={degree.id} value={degree.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{degree.name} ({degree.code})</span>
                          <span className="text-sm text-muted-foreground">{degree.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedDegreeData && (
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">
                        {selectedDegreeData.duration_years} Year Program
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedDegreeData.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Specialization Selection */}
              {selectedDegree && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <label className="text-lg font-semibold">Select Your Specialization</label>
                  </div>
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger className="w-full h-12 text-base">
                      <SelectValue placeholder="Choose your specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((specialization) => (
                        <SelectItem key={specialization.id} value={specialization.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{specialization.name}</span>
                            <span className="text-sm text-muted-foreground">{specialization.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedSpecializationData && (
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium text-primary mb-2">
                        {selectedSpecializationData.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedSpecializationData.description}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              {selectedDegree && selectedSpecialization && (
                <div className="flex justify-center pt-6 animate-in slide-in-from-bottom-4">
                  <Button 
                    onClick={handleSubmit}
                    disabled={submitting}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300 min-w-[200px]"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Generating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Generate Roadmap</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="border shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <Target className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold">Skills Roadmap</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get a step-by-step learning path with skills, certifications, and projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-tertiary/20 rounded-lg">
                    <Users className="h-5 w-5 text-tertiary" />
                  </div>
                  <h3 className="font-semibold">Career Opportunities</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Discover entry-level roles, salary ranges, and top hiring companies.
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <BookOpen className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold">Future Pathways</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Explore higher education options and alternative career paths.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}