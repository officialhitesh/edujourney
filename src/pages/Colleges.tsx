import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  MapPin, 
  GraduationCap, 
  Trophy, 
  Building2, 
  Star,
  Users,
  TrendingUp,
  Filter,
  SortAsc,
  Phone,
  Mail,
  Globe,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

interface College {
  id: string;
  name: string;
  location_city: string;
  location_state: string;
  location_district: string;
  address: string;
  image_url: string;
  is_government: boolean;
  rating: number;
  courses_offered: string[];
  facilities: string[];
  website: string;
  contact_email: string;
  contact_phone: string;
}

interface CollegeRanking {
  id: string;
  college_id: string;
  all_india_rank: number;
  state_rank: number;
  placement_performance: number;
  research_output: number;
  industry_integration: number;
  overall_index_score: number;
  average_package_lpa: number;
  highest_package_lpa: number;
  placement_percentage: number;
}

interface CollegeWithRanking extends College {
  ranking?: CollegeRanking;
}

export default function Colleges() {
  const [colleges, setColleges] = useState<CollegeWithRanking[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<CollegeWithRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState<"course" | "location">("course");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [governmentOnly, setGovernmentOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"rank" | "placement" | "overall">("rank");
  const { toast } = useToast();

  const courses = ["B.Tech", "MBA", "B.Com", "BBA", "M.Tech", "PhD", "B.A.", "B.Sc.", "PGDM"];
  const states = ["Maharashtra", "Delhi", "Tamil Nadu", "Karnataka", "West Bengal", "Gujarat", "Rajasthan", "Uttar Pradesh", "Telangana"];

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [colleges, searchQuery, selectedCourse, selectedState, governmentOnly, sortBy, searchType]);

  const fetchColleges = async () => {
    try {
      const { data: collegesData, error: collegesError } = await supabase
        .from('colleges')
        .select('*')
        .order('rating', { ascending: false });

      if (collegesError) throw collegesError;

      const { data: rankingsData, error: rankingsError } = await supabase
        .from('college_rankings')
        .select('*')
        .order('all_india_rank', { ascending: true });

      if (rankingsError) throw rankingsError;

      // Merge colleges with rankings
      const collegesWithRankings = (collegesData || []).map((college: College) => {
        const ranking = (rankingsData || []).find((r: CollegeRanking) => r.college_id === college.id);
        return { ...college, ranking };
      });

      setColleges(collegesWithRankings);
      setFilteredColleges(collegesWithRankings.slice(0, 10)); // Show top 10 initially
    } catch (error) {
      console.error("Error fetching colleges:", error);
      toast({
        title: "Error",
        description: "Failed to load colleges. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = [...colleges];

    // Apply search filters
    if (searchType === "course" && selectedCourse) {
      filtered = filtered.filter(college => 
        college.courses_offered.includes(selectedCourse)
      );
    } else if (searchType === "location") {
      if (selectedState) {
        filtered = filtered.filter(college => 
          college.location_state === selectedState
        );
      }
      if (searchQuery) {
        filtered = filtered.filter(college => 
          college.location_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          college.location_state.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    } else if (searchQuery && searchType === "course") {
      filtered = filtered.filter(college => 
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.courses_offered.some(course => 
          course.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply government filter
    if (governmentOnly) {
      filtered = filtered.filter(college => college.is_government);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rank":
          return (a.ranking?.all_india_rank || 999) - (b.ranking?.all_india_rank || 999);
        case "placement":
          return (b.ranking?.placement_performance || 0) - (a.ranking?.placement_performance || 0);
        case "overall":
          return (b.ranking?.overall_index_score || 0) - (a.ranking?.overall_index_score || 0);
        default:
          return 0;
      }
    });

    // Limit results for search
    const maxResults = searchQuery || selectedCourse || selectedState ? 5 : 10;
    setFilteredColleges(filtered.slice(0, maxResults));
  };

  const resetSearch = () => {
    setSearchQuery("");
    setSelectedCourse("");
    setSelectedState("");
    setGovernmentOnly(false);
    setSortBy("rank");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading colleges...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-primary animate-pulse-glow" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Find Your Perfect College
              </h1>
              <Building2 className="h-8 w-8 text-primary animate-pulse-glow" />
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover top-ranked colleges across India with comprehensive placement data, 
              course offerings, and detailed insights to make informed decisions.
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8 border-2 shadow-lg bg-gradient-to-r from-card to-card/80">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Search Colleges</CardTitle>
                  <CardDescription>
                    Find colleges by course or location with advanced filters
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Type Selection */}
              <div className="flex gap-4">
                <Button
                  variant={searchType === "course" ? "default" : "outline"}
                  onClick={() => setSearchType("course")}
                  className="flex items-center gap-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  Course-based Search
                </Button>
                <Button
                  variant={searchType === "location" ? "default" : "outline"}
                  onClick={() => setSearchType("location")}
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  Location-based Search
                </Button>
              </div>

              {/* Search Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {searchType === "course" ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Search by Course/College</label>
                      <Input
                        placeholder="Enter course or college name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Course</label>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Choose course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Search by City/State</label>
                      <Input
                        placeholder="Enter city or state..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select State</label>
                      <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Choose state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Filters */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={governmentOnly}
                        onChange={(e) => setGovernmentOnly(e.target.checked)}
                        className="rounded"
                      />
                      <span>Government Colleges Only</span>
                    </label>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <SortAsc className="h-4 w-4" />
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={(value: "rank" | "placement" | "overall") => setSortBy(value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rank">All India Rank</SelectItem>
                      <SelectItem value="placement">Placement Performance</SelectItem>
                      <SelectItem value="overall">Overall Index Score</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Found {filteredColleges.length} colleges
                </p>
                <Button variant="outline" onClick={resetSearch} size="sm">
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Colleges Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">
                {searchQuery || selectedCourse || selectedState ? "Search Results" : "Top Colleges in India"}
              </h2>
            </div>

            {/* College Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college) => (
                <Card 
                  key={college.id} 
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 cursor-pointer"
                >
                  <div className="relative">
                    <div 
                      className="h-48 bg-cover bg-center rounded-t-lg"
                      style={{ backgroundImage: `url(${college.image_url})` }}
                    >
                      <div className="absolute top-4 left-4 flex gap-2">
                        {college.ranking?.all_india_rank && (
                          <Badge variant="default" className="bg-primary text-primary-foreground">
                            #{college.ranking.all_india_rank} All India
                          </Badge>
                        )}
                        {college.is_government && (
                          <Badge variant="secondary">Government</Badge>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{college.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                          {college.name}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{college.location_city}, {college.location_state}</span>
                        </div>
                      </div>

                      {college.ranking && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">State Rank:</span>
                              <span className="font-medium">#{college.ranking.state_rank}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Placement:</span>
                              <span className="font-medium">{college.ranking.placement_performance}%</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Avg Package:</span>
                              <span className="font-medium text-green-600">₹{college.ranking.average_package_lpa}L</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Index Score:</span>
                              <span className="font-medium">{college.ranking.overall_index_score}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <Separator />

                      <div>
                        <p className="text-sm font-medium mb-2">Courses Offered:</p>
                        <div className="flex flex-wrap gap-1">
                          {college.courses_offered.slice(0, 4).map((course) => (
                            <Badge key={course} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                          {college.courses_offered.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{college.courses_offered.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-3">
                          {college.website && (
                            <Button size="sm" variant="ghost" className="p-2 h-8 w-8">
                              <Globe className="h-4 w-4" />
                            </Button>
                          )}
                          {college.contact_phone && (
                            <Button size="sm" variant="ghost" className="p-2 h-8 w-8">
                              <Phone className="h-4 w-4" />
                            </Button>
                          )}
                          {college.contact_email && (
                            <Button size="sm" variant="ghost" className="p-2 h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredColleges.length === 0 && (
              <Card className="p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <Search className="h-16 w-16 text-muted-foreground" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search criteria or filters to find colleges.
                    </p>
                  </div>
                  <Button onClick={resetSearch} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <Card className="text-center p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Building2 className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-primary">150+</span>
              </div>
              <h3 className="font-semibold">Top Colleges</h3>
              <p className="text-sm text-muted-foreground">Ranked institutions</p>
            </Card>

            <Card className="text-center p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <GraduationCap className="h-8 w-8 text-secondary" />
                <span className="text-2xl font-bold text-secondary">50+</span>
              </div>
              <h3 className="font-semibold">Course Options</h3>
              <p className="text-sm text-muted-foreground">Different programs</p>
            </Card>

            <Card className="text-center p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users className="h-8 w-8 text-tertiary" />
                <span className="text-2xl font-bold text-tertiary">95%</span>
              </div>
              <h3 className="font-semibold">Placement Rate</h3>
              <p className="text-sm text-muted-foreground">Average across top colleges</p>
            </Card>

            <Card className="text-center p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <TrendingUp className="h-8 w-8 text-accent" />
                <span className="text-2xl font-bold text-accent">₹15L</span>
              </div>
              <h3 className="font-semibold">Average Package</h3>
              <p className="text-sm text-muted-foreground">Across all programs</p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}