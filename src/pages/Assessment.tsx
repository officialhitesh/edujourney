import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const assessmentSchema = z.object({
  q1: z.string().min(1, "Please select an option"),
  q2: z.string().min(1, "Please select an option"),
  q3: z.string().min(1, "Please select an option"),
  q4: z.string().min(1, "Please select an option"),
  q5: z.string().min(1, "Please select an option"),
  q6: z.string().min(1, "Please select an option"),
  q7: z.string().min(1, "Please select an option"),
  q8: z.string().min(1, "Please select an option"),
  q9: z.string().min(1, "Please select an option"),
});

const questions = [
  {
    id: "q1",
    title: "Which subject do you enjoy the most?",
    options: [
      { value: "mathematics", label: "Mathematics" },
      { value: "science", label: "Science (Physics, Chemistry, Biology)" },
      { value: "commerce", label: "Commerce & Business Studies" },
      { value: "arts", label: "Arts, Languages & Humanities" },
    ],
  },
  {
    id: "q2",
    title: "What type of work excites you the most?",
    options: [
      { value: "problem-solving", label: "Solving problems & logical reasoning" },
      { value: "research", label: "Research, experiments & innovation" },
      { value: "business", label: "Managing business, finance & trade" },
      { value: "creative", label: "Creative activities (writing, design, media, art)" },
    ],
  },
  {
    id: "q3",
    title: "What is your long-term career preference?",
    options: [
      { value: "government", label: "Government Job (UPSC, SSC, Banking, Defence, State Exams)" },
      { value: "private", label: "Private Sector (IT, Corporate Jobs, Startups)" },
      { value: "research-higher", label: "Research & Higher Studies (Scientist, Professor, PhD)" },
      { value: "entrepreneur", label: "Entrepreneurship / Creative Career" },
    ],
  },
  {
    id: "q4",
    title: "Do you prefer theoretical or practical learning?",
    options: [
      { value: "theoretical", label: "Mostly Theoretical (reading, concepts, analysis)" },
      { value: "practical", label: "Mostly Practical (hands-on, experiments, fieldwork)" },
      { value: "balanced", label: "Balanced mix of both" },
      { value: "depends", label: "Depends on subject area" },
    ],
  },
  {
    id: "q5",
    title: "What motivates you the most in choosing a career?",
    options: [
      { value: "security", label: "Job Security & Stability" },
      { value: "salary", label: "High Salary & Growth Opportunities" },
      { value: "social-impact", label: "Social Impact / Serving the Nation" },
      { value: "passion", label: "Passion, Creativity & Personal Interest" },
    ],
  },
  {
    id: "q6",
    title: "Which type of exams are you most interested in?",
    options: [
      { value: "civil-services", label: "Civil Services & Govt Exams (UPSC, SSC, Railways, Banking)" },
      { value: "technical-medical", label: "Technical/Medical Exams (JEE, NEET, GATE, CDS)" },
      { value: "management-commerce", label: "Management & Commerce Exams (CA, CS, CAT, MBA)" },
      { value: "creative-humanities", label: "Creative & Humanities Exams (Law, Mass Comm, Fine Arts, UPSC-Arts)" },
    ],
  },
  {
    id: "q7",
    title: "What kind of work environment do you prefer?",
    options: [
      { value: "people", label: "Working with People (teaching, social service, management)" },
      { value: "technology", label: "Working with Technology (computers, machines, engineering)" },
      { value: "ideas", label: "Working with Ideas (research, writing, design)" },
      { value: "combination", label: "Combination of all three" },
    ],
  },
  {
    id: "q8",
    title: "What type of college do you prefer for higher studies?",
    options: [
      { value: "government", label: "Government Colleges / Universities" },
      { value: "private", label: "Private Colleges / Universities" },
      { value: "distance", label: "Distance / Online Learning (IGNOU, Online Platforms)" },
      { value: "no-preference", label: "No specific preference" },
    ],
  },
  {
    id: "q9",
    title: "What type of career roadmap would you find most useful?",
    options: [
      { value: "exam-prep", label: "Step-by-step exam preparation guide" },
      { value: "courses-colleges", label: "Courses & College recommendations" },
      { value: "job-opportunities", label: "Future job roles & career opportunities" },
      { value: "all", label: "All of the above" },
    ],
  },
];

type FormData = z.infer<typeof assessmentSchema>;

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
    },
  });

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to submit your assessment.",
          variant: "destructive",
        });
        return;
      }

      // Insert assessment data
      const { error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          user_id: user.id,
          assessment_type: 'career_survey',
          questions: questions.map(q => q.title),
          answers: data,
          scores: {},
          personality_traits: {},
        });

      if (assessmentError) {
        console.error("Error inserting assessment:", assessmentError);
      }

      // Also update student_form for backward compatibility
      const { error: formError } = await supabase
        .from('student_form')
        .upsert({
          user_id: user.id,
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          class: '12th', // Default value
          interests: data.q1,
          weak_subjects: '',
          marks: 'good',
          career_interest: data.q3,
          stream: data.q1 === 'science' ? 'Science' : data.q1 === 'commerce' ? 'Commerce' : 'Arts',
          exam_preference: data.q6,
        });

      if (formError) {
        console.error("Error updating student form:", formError);
      }

      toast({
        title: "Assessment Completed!",
        description: "Your responses have been saved. View your results now!",
      });
      
      navigate("/survey-report");
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast({
        title: "Error",
        description: "Failed to submit assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentField = questions[currentQuestion].id as keyof FormData;
  const isCurrentQuestionAnswered = form.watch(currentField);

  // Auto-advance to next question when an option is selected
  const handleOptionSelect = (value: string) => {
    form.setValue(currentField, value);
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Student Assessment
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help us understand your interests and goals to provide personalized education and career recommendations.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Assessment Form */}
        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="border-2 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-semibold">
                    {questions[currentQuestion].title}
                  </CardTitle>
                  <CardDescription>
                    Please select the option that best describes you
                  </CardDescription>
                </CardHeader>
                 <CardContent className="pt-4">
                   <FormField
                     control={form.control}
                     name={currentField}
                     render={({ field }) => (
                       <FormItem>
                         <FormControl>
                           <RadioGroup
                             onValueChange={handleOptionSelect}
                             value={field.value}
                             className="space-y-3"
                           >
                             {questions[currentQuestion].options?.map((option) => (
                               <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/20 transition-colors cursor-pointer">
                                 <RadioGroupItem 
                                   value={option.value} 
                                   id={option.value}
                                   className="text-primary"
                                 />
                                 <FormLabel 
                                   htmlFor={option.value}
                                   className="flex-1 cursor-pointer font-normal text-base"
                                 >
                                   {option.label}
                                 </FormLabel>
                               </div>
                             ))}
                           </RadioGroup>
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                 </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {currentQuestion === totalQuestions - 1 && (
                  <Button
                    type="submit"
                    disabled={!isCurrentQuestionAnswered || isSubmitting}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-glow"
                  >
                    <CheckCircle className="h-4 w-4" />
                    {isSubmitting ? "Submitting..." : "Complete Assessment"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>

        {/* Question Navigator */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {questions.map((_, index) => {
              const fieldName = questions[index].id as keyof FormData;
              const isAnswered = !!form.watch(fieldName);
              const isCurrent = index === currentQuestion;
              
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : isAnswered
                      ? "bg-secondary-glow text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}