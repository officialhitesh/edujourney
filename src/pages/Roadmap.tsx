import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  GraduationCap, 
  BookOpen, 
  Building2, 
  Award,
  ArrowLeft,
  Download,
  ChevronDown,
  ChevronRight,
  Target,
  Lightbulb,
  Briefcase,
  TrendingUp,
  Users,
  Code,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

interface CareerRoadmap {
  id: string;
  specialization_id: string;
  skills: any;
  certifications: any;
  projects: any;
  higher_studies: any;
  entry_roles: any;
  avg_salary_min: number;
  avg_salary_max: number;
  top_companies: any;
}

export default function Roadmap() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const roadmapRef = useRef<HTMLDivElement>(null);
  
  const [degree, setDegree] = useState<Degree | null>(null);
  const [specialization, setSpecialization] = useState<Specialization | null>(null);
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    skills: true,
    roles: true,
    salary: true,
    companies: true,
    certifications: false,
    projects: false,
    studies: false
  });

  const degreeId = searchParams.get('degree');
  const specializationId = searchParams.get('specialization');

  useEffect(() => {
    if (degreeId && specializationId) {
      fetchRoadmapData();
    } else {
      navigate('/streams');
    }
  }, [degreeId, specializationId]);

  const fetchRoadmapData = async () => {
    try {
      // Fetch degree data
      const { data: degreeData, error: degreeError } = await supabase
        .from('degrees')
        .select('*')
        .eq('id', degreeId)
        .single();

      if (degreeError) throw degreeError;
      setDegree(degreeData);

      // Fetch specialization data
      const { data: specializationData, error: specializationError } = await supabase
        .from('specializations')
        .select('*')
        .eq('id', specializationId)
        .single();

      if (specializationError) throw specializationError;
      setSpecialization(specializationData);

      // Fetch roadmap data
      const { data: roadmapData, error: roadmapError } = await supabase
        .from('career_roadmaps')
        .select('*')
        .eq('specialization_id', specializationId)
        .single();

      if (roadmapError) {
        console.error("Roadmap error:", roadmapError);
        toast({
          title: "No Roadmap Available",
          description: "Career roadmap for this specialization is not available yet.",
          variant: "destructive",
        });
        return;
      }
      
      setRoadmap(roadmapData);
    } catch (error) {
      console.error("Error fetching roadmap data:", error);
      toast({
        title: "Error",
        description: "Failed to load roadmap data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const generatePDF = async () => {
    if (!roadmapRef.current || !degree || !specialization) return;

    try {
      const canvas = await html2canvas(roadmapRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${degree.code}_${specialization.code}_Career_Roadmap.pdf`);
      
      toast({
        title: "Download Complete",
        description: "Your career roadmap has been downloaded as a PDF.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your career roadmap...</p>
        </div>
      </div>
    );
  }

  if (!degree || !specialization || !roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Roadmap Not Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find a roadmap for the selected specialization.
            </p>
            <Button onClick={() => navigate('/streams')}>
              Choose Different Stream
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/streams")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Streams
          </Button>
          <Button
            onClick={generatePDF}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-glow"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div ref={roadmapRef} className="space-y-8">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
              Career Roadmap
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Badge variant="secondary" className="text-base px-4 py-2">
                {degree.name}
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                {specialization.name}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your personalized career pathway with skills, opportunities, and growth prospects
            </p>
          </div>

          {/* Skills Roadmap */}
          <Card className="border-2 shadow-lg">
            <Collapsible open={expandedSections.skills} onOpenChange={() => toggleSection('skills')}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Skills Development Roadmap</CardTitle>
                        <CardDescription>Step-by-step learning progression</CardDescription>
                      </div>
                    </div>
                    {expandedSections.skills ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-6">
                    {roadmap.skills.map((phase: any, index: number) => (
                      <div key={index} className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <h3 className="text-lg font-semibold text-primary">{phase.phase}</h3>
                        </div>
                        <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {phase.skills.map((skill: string, skillIndex: number) => (
                            <div key={skillIndex} className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                              <Target className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                        {index < roadmap.skills.length - 1 && (
                          <div className="absolute left-4 top-12 w-0.5 h-8 bg-primary/30"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Entry-Level Roles */}
          <Card className="border-2 shadow-lg">
            <Collapsible open={expandedSections.roles} onOpenChange={() => toggleSection('roles')}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Briefcase className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Entry-Level Career Opportunities</CardTitle>
                        <CardDescription>Roles you can apply for as a fresher</CardDescription>
                      </div>
                    </div>
                    {expandedSections.roles ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roadmap.entry_roles.map((role: any, index: number) => (
                      <Card key={index} className="border">
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-3">
                            <Award className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-secondary mb-1">{role.role}</h4>
                              <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Salary Information */}
          <Card className="border-2 shadow-lg">
            <Collapsible open={expandedSections.salary} onOpenChange={() => toggleSection('salary')}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-tertiary/10 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-tertiary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Salary Expectations</CardTitle>
                        <CardDescription>Average compensation in India (INR)</CardDescription>
                      </div>
                    </div>
                    {expandedSections.salary ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-tertiary to-tertiary/80 bg-clip-text text-transparent mb-2">
                        ₹{(roadmap.avg_salary_min / 100000).toFixed(1)}L - ₹{(roadmap.avg_salary_max / 100000).toFixed(1)}L
                      </div>
                      <p className="text-muted-foreground">Per Annum (Entry Level)</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Top Companies */}
          <Card className="border-2 shadow-lg">
            <Collapsible open={expandedSections.companies} onOpenChange={() => toggleSection('companies')}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Building2 className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Top Hiring Companies</CardTitle>
                        <CardDescription>Leading employers in this field</CardDescription>
                      </div>
                    </div>
                    {expandedSections.companies ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {roadmap.top_companies.map((company: any, index: number) => (
                      <div key={index} className="text-center p-4 bg-secondary/5 rounded-lg border">
                        <div className="font-medium text-accent mb-1">{company.name}</div>
                        <Badge variant="outline" className="text-xs">
                          {company.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Certifications */}
          <Card className="border-2 shadow-lg">
            <Collapsible open={expandedSections.certifications} onOpenChange={() => toggleSection('certifications')}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Recommended Certifications</CardTitle>
                        <CardDescription>Industry-recognized credentials</CardDescription>
                      </div>
                    </div>
                    {expandedSections.certifications ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-4">
                    {roadmap.certifications.map((cert: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border">
                        <span className="font-medium">{cert.name}</span>
                        <Badge variant={cert.importance === 'High' ? 'default' : 'secondary'}>
                          {cert.importance} Priority
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Projects */}
          <Card className="border-2 shadow-lg">
            <Collapsible open={expandedSections.projects} onOpenChange={() => toggleSection('projects')}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Portfolio Projects</CardTitle>
                        <CardDescription>Build these projects to showcase your skills</CardDescription>
                      </div>
                    </div>
                    {expandedSections.projects ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-4">
                    {roadmap.projects.map((project: any, index: number) => (
                      <Card key={index} className="border">
                        <CardContent className="pt-4">
                          <h4 className="font-medium text-secondary mb-2">{project.name}</h4>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Higher Studies */}
          <Card className="border-2 shadow-lg">
            <Collapsible open={expandedSections.studies} onOpenChange={() => toggleSection('studies')}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-tertiary/10 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-tertiary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Higher Education Options</CardTitle>
                        <CardDescription>Advance your career with further studies</CardDescription>
                      </div>
                    </div>
                    {expandedSections.studies ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-4">
                    {roadmap.higher_studies.map((study: any, index: number) => (
                      <Card key={index} className="border">
                        <CardContent className="pt-4">
                          <h4 className="font-medium text-tertiary mb-2">{study.option}</h4>
                          <p className="text-sm text-muted-foreground">{study.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

        {/* Action Section */}
        <div className="mt-12 text-center">
          <Card className="border-2 shadow-lg bg-gradient-to-r from-primary/5 to-primary-glow/5">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Journey?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Use this roadmap as your guide to build a successful career in {specialization.name}. 
                Start with the foundation skills and work your way up!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={generatePDF}
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Roadmap
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/streams")}
                >
                  Explore Other Streams
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}