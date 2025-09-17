import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Target, Compass, ArrowRight, ExternalLink } from "lucide-react";

const About = () => {
  const teamMembers = [
    "Hitesh Kumar",
    "Rajat Kumar", 
    "Aditya Chourasia",
    "Yashvi Agrawal",
    "Anshika Bansal",
    "Sneha Jha"
  ];

  const missionPoints = [
    {
      icon: Target,
      text: "To make career planning accessible and understandable for every student."
    },
    {
      icon: Compass,
      text: "To reduce confusion by offering data-driven guidance and real options."
    },
    {
      icon: Star,
      text: "To help you discover paths you might not have considered."
    },
    {
      icon: Users,
      text: "To empower you to make informed decisions about your education and future."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">EJ</span>
              </div>
              <span className="font-bold text-lg">EduJourney</span>
            </div>
            <Button variant="outline" asChild>
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
              About EduJourney
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your smart, intuitive education & career advisor built for students who want clarity, direction, and confidence in their future.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90" asChild>
              <a href="https://preview--youredujourney.lovable.app" target="_blank" rel="noopener noreferrer">
                Explore EduJourney
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </section>

        {/* What is EduJourney Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-r from-background to-muted/50">
              <CardContent className="p-0">
                <h2 className="text-3xl font-bold text-center mb-6">What is EduJourney</h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-center">
                  EduJourney is a smart, intuitive education & career advisor built for students who want clarity, direction, and confidence in their future. With personalized recommendations on courses, colleges, and skill sets, EduJourney helps you map your educational journey—one decision at a time.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why EduJourney Exists</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {missionPoints.map((point, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0 flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <point.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{point.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
            <div className="text-center mb-8">
              <p className="text-lg font-medium text-primary mb-6">Developed by Team CodeCrew</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-foreground font-bold text-lg">
                        {member.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground">{member}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Preview/CTA Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-to-r from-primary/5 to-primary-glow/5">
              <CardContent className="p-0">
                <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Discover your potential with personalized recommendations, college guidance, and career mapping tools designed just for you.
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-lg px-8 py-3"
                  asChild
                >
                  <a href="https://preview--youredujourney.lovable.app" target="_blank" rel="noopener noreferrer">
                    Try EduJourney Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2024 EduJourney. Built with ❤️ by Team CodeCrew.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default About;