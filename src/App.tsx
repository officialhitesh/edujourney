import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import SurveyReport from "./pages/SurveyReport";
import Recommendations from "./pages/Recommendations";
import Streams from "./pages/Streams";
import Roadmap from "./pages/Roadmap";
import Colleges from "./pages/Colleges";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import CareerPulse from "./pages/CareerPulse";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/survey-report" element={<SurveyReport />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/streams" element={<Streams />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/career-pulse" element={<CareerPulse />} />
        <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
