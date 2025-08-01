"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  MapPin,
  Building2,
  Users,
  Mail,
  Phone,
  ExternalLink,
  Star,
  StarOff,
  Plus,
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";

// Mock detailed prospect data
const mockDetailedProspects = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "VP of Marketing",
    company: "TechFlow Inc",
    location: "San Francisco, CA",
    industry: "Technology",
    employees: "201-500",
    avatar: null,
    email: "sarah.j@techflow.com",
    phone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    score: 85,
    tags: ["Hot Lead", "Decision Maker", "Budget Confirmed"],
    lastContact: "2 days ago",
    nextFollowUp: "Tomorrow",
    isFavorite: true,
    status: "Qualified",
    pipeline: "Demo Scheduled",
    revenue: "$45K",
    notes:
      "Very interested in our enterprise package. Scheduled demo for next week.",
    interactions: [
      { type: "email", date: "2 days ago", note: "Sent pricing information" },
      {
        type: "call",
        date: "1 week ago",
        note: "Initial discovery call - 30 min",
      },
      { type: "linkedin", date: "2 weeks ago", note: "Connected on LinkedIn" },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Chief Technology Officer",
    company: "DataDrive Solutions",
    location: "Austin, TX",
    industry: "Software",
    employees: "51-200",
    avatar: null,
    email: "m.chen@datadrive.io",
    phone: "+1 (555) 987-6543",
    linkedin: "https://linkedin.com/in/michaelchen",
    score: 92,
    tags: ["Warm Lead", "Technical", "Enterprise"],
    lastContact: "1 week ago",
    nextFollowUp: "This Friday",
    isFavorite: false,
    status: "Engaged",
    pipeline: "Proposal Sent",
    revenue: "$78K",
    notes: "Technical evaluation in progress. Needs integration details.",
    interactions: [
      {
        type: "email",
        date: "1 week ago",
        note: "Sent technical documentation",
      },
      { type: "demo", date: "2 weeks ago", note: "Product demo - 45 min" },
      {
        type: "call",
        date: "3 weeks ago",
        note: "Technical requirements call",
      },
    ],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Director of Sales",
    company: "GrowthCorp",
    location: "New York, NY",
    industry: "Marketing",
    employees: "1001+",
    avatar: null,
    email: "emily.r@growthcorp.com",
    phone: "+1 (555) 456-7890",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    score: 78,
    tags: ["Cold Lead", "Sales", "Large Enterprise"],
    lastContact: "3 days ago",
    nextFollowUp: "Next Monday",
    isFavorite: true,
    status: "Contacted",
    pipeline: "Initial Contact",
    revenue: "$125K",
    notes: "Large enterprise opportunity. Slow decision process expected.",
    interactions: [
      { type: "email", date: "3 days ago", note: "Follow-up email sent" },
      { type: "linkedin", date: "1 week ago", note: "Initial outreach" },
    ],
  },
  {
    id: 4,
    name: "David Kim",
    title: "Product Manager",
    company: "InnovateLab",
    location: "Seattle, WA",
    industry: "Technology",
    employees: "11-50",
    avatar: null,
    email: "d.kim@innovatelab.com",
    phone: "+1 (555) 234-5678",
    linkedin: "https://linkedin.com/in/davidkim",
    score: 65,
    tags: ["Warm Lead", "Product", "Startup"],
    lastContact: "5 days ago",
    nextFollowUp: "Next Week",
    isFavorite: false,
    status: "Nurturing",
    pipeline: "Discovery",
    revenue: "$25K",
    notes: "Startup with limited budget but high growth potential.",
    interactions: [
      { type: "call", date: "5 days ago", note: "Discovery call - 20 min" },
      { type: "email", date: "1 week ago", note: "Initial contact" },
    ],
  },
];

export default function OurProspects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPipeline, setSelectedPipeline] = useState("");
  const [viewMode, setViewMode] = (useState < "cards") | ("table" > "cards");
  const [favorites, setFavorites] = useState(
    mockDetailedProspects.filter((p) => p.isFavorite).map((p) => p.id)
  );

  const toggleFavorite = (prospectId) => {
    setFavorites((prev) =>
      prev.includes(prospectId)
        ? prev.filter((id) => id !== prospectId)
        : [...prev, prospectId]
    );
  };

  const filteredProspects = mockDetailedProspects.filter((prospect) => {
    const matchesSearch =
      prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      !selectedIndustry ||
      selectedIndustry === "all-industries" ||
      prospect.industry === selectedIndustry;
    const matchesStatus =
      !selectedStatus ||
      selectedStatus === "all-statuses" ||
      prospect.status === selectedStatus;
    const matchesPipeline =
      !selectedPipeline ||
      selectedPipeline === "all-pipelines" ||
      prospect.pipeline === selectedPipeline;

    return matchesSearch && matchesIndustry && matchesStatus && matchesPipeline;
  });

  const ProspectCard = ({ prospect }) => (
    <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-300 group">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
              <AvatarImage src={prospect.avatar || ""} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                {prospect.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white break-words">
                  {prospect.name}
                </h3>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Badge
                    variant="outline"
                    className="text-xs whitespace-nowrap"
                  >
                    Score: {prospect.score}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(prospect.id)}
                    className="p-1 hover:bg-white/20 dark:hover:bg-slate-800/50"
                  >
                    {favorites.includes(prospect.id) ? (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ) : (
                      <StarOff className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-2 break-words">
                {prospect.title}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="break-words">{prospect.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="break-words">{prospect.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {prospect.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant={
                      tag.includes("Hot")
                        ? "destructive"
                        : tag.includes("Warm")
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Status
                  </span>
                  <p className="text-sm font-medium text-slate-900 dark:text-white break-words">
                    {prospect.status}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Pipeline
                  </span>
                  <p className="text-sm font-medium text-slate-900 dark:text-white break-words">
                    {prospect.pipeline}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Potential Revenue
                  </span>
                  <p className="text-sm font-medium text-green-600">
                    {prospect.revenue}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Next Follow-up
                  </span>
                  <p className="text-sm font-medium text-orange-600 break-words">
                    {prospect.nextFollowUp}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Notes
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 break-words">
                  {prospect.notes}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/50 dark:bg-slate-800/50 border-white/20 flex-1 sm:flex-none"
              >
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/50 dark:bg-slate-800/50 border-white/20 flex-1 sm:flex-none"
              >
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/50 dark:bg-slate-800/50 border-white/20 flex-1 sm:flex-none"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                LinkedIn
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/50 dark:bg-slate-800/50 border-white/20 flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white flex-1"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Our Prospects
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            ICP-based prospect management with advanced filtering
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20 w-full sm:w-auto"
          >
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Prospect
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {filteredProspects.length}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Total Prospects
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {
                  filteredProspects.filter((p) =>
                    p.tags.some((tag) => tag.includes("Hot"))
                  ).length
                }
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Hot Leads
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {Math.round(
                  filteredProspects.reduce((sum, p) => sum + p.score, 0) /
                    filteredProspects.length
                )}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Avg Score
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">
                $
                {Math.round(
                  filteredProspects.reduce(
                    (sum, p) => sum + parseInt(p.revenue.replace(/[$K]/g, "")),
                    0
                  )
                )}
                K
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Pipeline Value
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search prospects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50"
              />
            </div>
            <Select
              value={selectedIndustry}
              onValueChange={setSelectedIndustry}
            >
              <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50">
                <SelectValue placeholder="All industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-industries">All industries</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All statuses</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Engaged">Engaged</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Nurturing">Nurturing</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedPipeline}
              onValueChange={setSelectedPipeline}
            >
              <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50">
                <SelectValue placeholder="All pipelines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-pipelines">All pipelines</SelectItem>
                <SelectItem value="Demo Scheduled">Demo Scheduled</SelectItem>
                <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                <SelectItem value="Initial Contact">Initial Contact</SelectItem>
                <SelectItem value="Discovery">Discovery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prospects List */}
      <div className="space-y-4">
        {filteredProspects.map((prospect) => (
          <ProspectCard key={prospect.id} prospect={prospect} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProspects.length === 0 && (
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
          <CardContent className="p-8 sm:p-12 text-center">
            <Users className="h-12 w-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              No prospects found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Try adjusting your filters or add new prospects to get started.
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Prospect
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
