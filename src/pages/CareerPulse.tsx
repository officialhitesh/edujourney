import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus, Brain, Code, Database, Palette, DollarSign, Globe } from "lucide-react";

// Sample data for timeline trends
const timelineData = [
  { year: '2020', Python: 85, JavaScript: 92, Java: 78, React: 65, 'AI/ML': 45 },
  { year: '2021', Python: 88, JavaScript: 94, Java: 75, React: 72, 'AI/ML': 58 },
  { year: '2022', Python: 92, JavaScript: 95, Java: 73, React: 78, 'AI/ML': 69 },
  { year: '2023', Python: 94, JavaScript: 96, Java: 70, React: 82, 'AI/ML': 78 },
  { year: '2024', Python: 96, JavaScript: 97, Java: 68, React: 85, 'AI/ML': 86 },
];

// Sample data for top skills by domain
const topSkillsByDomain = {
  Engineering: [
    { name: 'Python', demand: 96, trend: 'up', change: '+12%', industries: ['Data Science', 'AI/ML', 'Backend'], prediction: 'High Growth' },
    { name: 'JavaScript', demand: 97, trend: 'up', change: '+8%', industries: ['Frontend', 'Full-stack', 'Mobile'], prediction: 'Stable' },
    { name: 'React', demand: 85, trend: 'up', change: '+15%', industries: ['Frontend', 'Web Dev', 'Mobile'], prediction: 'High Growth' },
    { name: 'AI/ML', demand: 86, trend: 'up', change: '+18%', industries: ['Data Science', 'Automation', 'Healthcare'], prediction: 'High Growth' },
  ],
  IT: [
    { name: 'Cloud Computing', demand: 89, trend: 'up', change: '+22%', industries: ['DevOps', 'Infrastructure', 'Enterprise'], prediction: 'High Growth' },
    { name: 'Cybersecurity', demand: 91, trend: 'up', change: '+19%', industries: ['Security', 'Finance', 'Government'], prediction: 'High Growth' },
    { name: 'DevOps', demand: 84, trend: 'up', change: '+16%', industries: ['Operations', 'Automation', 'Enterprise'], prediction: 'Stable' },
    { name: 'Docker/Kubernetes', demand: 78, trend: 'up', change: '+20%', industries: ['DevOps', 'Cloud', 'Microservices'], prediction: 'High Growth' },
  ],
  Commerce: [
    { name: 'Digital Marketing', demand: 82, trend: 'up', change: '+14%', industries: ['E-commerce', 'Retail', 'Startups'], prediction: 'Stable' },
    { name: 'Data Analytics', demand: 88, trend: 'up', change: '+17%', industries: ['Business Intelligence', 'Finance', 'Marketing'], prediction: 'High Growth' },
    { name: 'E-commerce Platforms', demand: 75, trend: 'stable', change: '+5%', industries: ['Retail', 'Online Business', 'Logistics'], prediction: 'Stable' },
    { name: 'Financial Tech', demand: 79, trend: 'up', change: '+13%', industries: ['Banking', 'Fintech', 'Investment'], prediction: 'High Growth' },
  ],
  Design: [
    { name: 'UI/UX Design', demand: 81, trend: 'up', change: '+11%', industries: ['Tech', 'Startups', 'Digital Agencies'], prediction: 'Stable' },
    { name: 'Figma', demand: 86, trend: 'up', change: '+25%', industries: ['Design', 'Product', 'Collaboration'], prediction: 'High Growth' },
    { name: 'Motion Graphics', demand: 68, trend: 'stable', change: '+3%', industries: ['Media', 'Advertising', 'Entertainment'], prediction: 'Stable' },
    { name: 'Design Systems', demand: 74, trend: 'up', change: '+18%', industries: ['Product Design', 'Enterprise', 'SaaS'], prediction: 'High Growth' },
  ],
  Marketing: [
    { name: 'Content Marketing', demand: 77, trend: 'stable', change: '+6%', industries: ['Media', 'E-commerce', 'B2B'], prediction: 'Stable' },
    { name: 'SEO/SEM', demand: 83, trend: 'up', change: '+9%', industries: ['Digital Marketing', 'E-commerce', 'Agencies'], prediction: 'Stable' },
    { name: 'Social Media', demand: 80, trend: 'up', change: '+12%', industries: ['Brand Marketing', 'Influencer', 'E-commerce'], prediction: 'Stable' },
    { name: 'Marketing Automation', demand: 72, trend: 'up', change: '+15%', industries: ['B2B', 'SaaS', 'Enterprise'], prediction: 'High Growth' },
  ],
};

const futureTrends = [
  { name: 'Generative AI', growth: '+45%', description: 'AI tools for content creation, coding assistance' },
  { name: 'Web3 & Blockchain', growth: '+35%', description: 'Decentralized applications, smart contracts' },
  { name: 'Quantum Computing', growth: '+28%', description: 'Advanced computing for complex problems' },
  { name: 'AR/VR Development', growth: '+32%', description: 'Immersive experiences, metaverse applications' },
  { name: 'Edge Computing', growth: '+30%', description: 'Distributed computing, IoT applications' },
  { name: 'Sustainable Tech', growth: '+26%', description: 'Green technology, carbon footprint reduction' },
];

const domainIcons = {
  Engineering: Code,
  IT: Database,
  Commerce: DollarSign,
  Design: Palette,
  Marketing: Globe,
};

const CareerPulse = () => {
  const [selectedDomain, setSelectedDomain] = useState('Engineering');

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'High Growth':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Stable':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Declining':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="head-title text-4xl font-bold mb-4">
            Career Pulse
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track the heartbeat of future-ready skills. Discover trending technologies, 
            market demands, and career opportunities across multiple domains.
          </p>
        </div>

        {/* Timeline Graph */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Market Trend Timeline
            </CardTitle>
            <CardDescription>
              Track how demand for key technologies has evolved over the years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Python" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="JavaScript" stroke="#f59e0b" strokeWidth={3} />
                  <Line type="monotone" dataKey="React" stroke="#10b981" strokeWidth={3} />
                  <Line type="monotone" dataKey="AI/ML" stroke="#8b5cf6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Domain Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Explore by Domain</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(topSkillsByDomain).map((domain) => {
              const IconComponent = domainIcons[domain as keyof typeof domainIcons];
              return (
                <Button
                  key={domain}
                  variant={selectedDomain === domain ? "default" : "outline"}
                  onClick={() => setSelectedDomain(domain)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {domain}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Skill Spotlight Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedDomain} Skills Spotlight
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSkillsByDomain[selectedDomain as keyof typeof topSkillsByDomain].map((skill, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(skill.trend)}
                      <span className={`text-sm font-medium ${skill.trend === 'up' ? 'text-green-600' : skill.trend === 'down' ? 'text-red-600' : 'text-yellow-600'}`}>
                        {skill.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.demand}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground">{skill.demand}% demand</span>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">Industries:</p>
                      <div className="flex flex-wrap gap-1">
                        {skill.industries.map((industry, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Badge className={getPredictionColor(skill.prediction)}>
                        {skill.prediction}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Future Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Future Tech Predictions
            </CardTitle>
            <CardDescription>
              Emerging technologies expected to dominate the job market
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {futureTrends.map((trend, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{trend.name}</h3>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {trend.growth}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{trend.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerPulse;