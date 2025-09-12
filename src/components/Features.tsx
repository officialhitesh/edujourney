import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  MapPin, 
  Target, 
  Calendar, 
  Lightbulb, 
  Users,
  TrendingUp,
  Shield
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Assessment",
      description: "Advanced algorithms analyze your interests, skills, and personality to provide accurate recommendations.",
      color: "primary"
    },
    {
      icon: Target,
      title: "Personalized Recommendations", 
      description: "Get tailored suggestions for streams, courses, and colleges based on your unique profile.",
      color: "secondary"
    },
    {
      icon: MapPin,
      title: "College Discovery",
      description: "Explore 2000+ government colleges with detailed information, facilities, and admission requirements.",
      color: "tertiary"
    },
    {
      icon: Calendar,
      title: "Timeline Management",
      description: "Never miss important deadlines with our comprehensive academic and admission calendar.",
      color: "accent"
    },
    {
      icon: TrendingUp,
      title: "Career Path Mapping",
      description: "Visualize your future career opportunities and growth prospects for each educational path.",
      color: "primary"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Access insights from career counselors and education experts to make informed decisions.",
      color: "secondary"
    },
    {
      icon: Lightbulb,
      title: "Smart Insights",
      description: "Receive data-driven insights about job market trends and emerging career opportunities.",
      color: "tertiary"
    },
    {
      icon: Shield,
      title: "Trusted Platform",
      description: "Government-endorsed platform ensuring accurate and up-to-date educational information.",
      color: "accent"
    }
  ];

  const getIconBg = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary text-primary-foreground';
      case 'secondary': return 'bg-secondary text-secondary-foreground';
      case 'tertiary': return 'bg-tertiary text-tertiary-foreground';
      case 'accent': return 'bg-accent text-accent-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for Your 
            <span className="text-primary"> Educational Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and information you need to make 
            confident decisions about your academic and career future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-gradient border-0 shadow-lg hover:shadow-xl transition-smooth hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${getIconBg(feature.color)} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;