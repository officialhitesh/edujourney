import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const assessmentSchema = z.object({
  qualification: z.string().min(1, "Please select your academic qualification"),
  subjects: z.string().min(1, "Please select your preferred subjects"),
  performance: z.string().min(1, "Please select your academic performance"),
  interests: z.string().min(1, "Please select your career interests"),
  learning: z.string().min(1, "Please select your preferred learning environment"),
  goal: z.string().min(1, "Please select your long-term career goal"),
  relocate: z.string().min(1, "Please select your relocation preference"),
  exams: z.string().min(1, "Please select your exam preference"),
  mode: z.string().min(1, "Please select your preferred learning mode"),
  motivation: z.string().min(1, "Please select your primary motivation"),
});

const questions = [
  {
    id: "qualification",
    title: "What is your current academic qualification?",
    options: [
      { value: "class10", label: "Class 10" },
      { value: "class12", label: "Class 12" },
      { value: "undergraduate", label: "Undergraduate Degree" },
      { value: "postgraduate", label: "Postgraduate Degree" },
    ],
  },
  {
    id: "subjects",
    title: "Which subjects do you enjoy the most?",
    options: [
      { value: "math-science", label: "Mathematics & Science" },
      { value: "computer-it", label: "Computer Science & IT" },
      { value: "commerce", label: "Commerce & Accounts" },
      { value: "arts-languages", label: "Arts & Languages" },
    ],
  },
  {
    id: "performance",
    title: "What is your average academic performance?",
    options: [
      { value: "excellent", label: "90% or above (Excellent)" },
      { value: "good", label: "75-90% (Good)" },
      { value: "average", label: "60-75% (Average)" },
      { value: "improvement", label: "Below 60% (Needs Improvement)" },
    ],
  },
  {
    id: "interests",
    title: "What are your primary career interests?",
    options: [
      { value: "engineering", label: "Engineering & Technology" },
      { value: "medicine", label: "Medicine & Healthcare" },
      { value: "business", label: "Business & Finance" },
      { value: "government", label: "Government & Civil Services" },
    ],
  },
  {
    id: "learning",
    title: "What type of learning environment do you prefer?",
    options: [
      { value: "practical", label: "Practical/Hands-on" },
      { value: "theoretical", label: "Theoretical/Research-based" },
      { value: "both", label: "Both equally" },
      { value: "self-paced", label: "Self-paced learning" },
    ],
  },
  {
    id: "goal",
    title: "What is your long-term career goal?",
    options: [
      { value: "corporate", label: "Corporate Job" },
      { value: "entrepreneurship", label: "Entrepreneurship" },
      { value: "research", label: "Higher Studies & Research" },
      { value: "public-service", label: "Public Service" },
    ],
  },
  {
    id: "relocate",
    title: "Are you willing to relocate for higher education?",
    options: [
      { value: "anywhere", label: "Yes, anywhere in India" },
      { value: "nearby", label: "Yes, to a nearby state" },
      { value: "local", label: "No, prefer local colleges" },
      { value: "unsure", label: "Not sure, open to options" },
    ],
  },
  {
    id: "exams",
    title: "Which competitive exams are you most interested in preparing for?",
    options: [
      { value: "jee-neet", label: "JEE/NEET (Science)" },
      { value: "cuet", label: "CUET (All Streams)" },
      { value: "upsc-ssc", label: "UPSC/SSC (Government)" },
      { value: "cat-gmat", label: "CAT/GMAT (Management)" },
    ],
  },
  {
    id: "mode",
    title: "What is your preferred mode of learning?",
    options: [
      { value: "classroom", label: "Classroom Learning" },
      { value: "online", label: "Online Learning" },
      { value: "hybrid", label: "Hybrid (Both)" },
      { value: "self-study", label: "Self-study with mentors" },
    ],
  },
  {
    id: "motivation",
    title: "What is your primary motivation for your career choice?",
    options: [
      { value: "salary", label: "High salary & job security" },
      { value: "passion", label: "Passion for the field" },
      { value: "social-impact", label: "Making a social impact" },
      { value: "growth", label: "Personal growth & learning" },
    ],
  },
];

type FormData = z.infer<typeof assessmentSchema>;

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      qualification: "",
      subjects: "",
      performance: "",
      interests: "",
      learning: "",
      goal: "",
      relocate: "",
      exams: "",
      mode: "",
      motivation: "",
    },
  });

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Submit to Supabase
      console.log("Assessment data:", data);
      toast({
        title: "Assessment Completed!",
        description: "Your responses have been saved. Generating recommendations...",
      });
      // Navigate to results page
    } catch (error) {
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
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            {questions[currentQuestion].options.map((option) => (
                              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/20 transition-colors">
                                <RadioGroupItem 
                                  value={option.value} 
                                  id={option.value}
                                  className="text-primary"
                                />
                                <FormLabel 
                                  htmlFor={option.value}
                                  className="flex-1 cursor-pointer font-normal"
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

                {currentQuestion === totalQuestions - 1 ? (
                  <Button
                    type="submit"
                    disabled={!isCurrentQuestionAnswered || isSubmitting}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-glow"
                  >
                    <CheckCircle className="h-4 w-4" />
                    {isSubmitting ? "Submitting..." : "Complete Assessment"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextQuestion}
                    disabled={!isCurrentQuestionAnswered}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
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