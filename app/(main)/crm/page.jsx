"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Filter,
  Search,
  Phone,
  Mail,
  Building2,
  MapPin,
  Star,
  StarOff,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const summaryStats = {
  customers: { total: 1247, new: 89, growth: 12 },
  leads: { total: 2456, qualified: 567, growth: 18 },
  deals: { total: 189, won: 67, growth: 15, value: 2340000 },
};

const mockCustomers = [
  {
    id: 1,
    name: "TechFlow Inc",
    contact: "Sarah Johnson",
    email: "sarah.j@techflow.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    industry: "Technology",
    value: "$45,000",
    status: "Active",
    onboardedDate: "2024-01-15",
    lastActivity: "2 days ago",
    source: "Referral",
  },
  {
    id: 2,
    name: "DataDrive Solutions",
    contact: "Michael Chen",
    email: "m.chen@datadrive.io",
    phone: "+1 (555) 987-6543",
    location: "Austin, TX",
    industry: "Software",
    value: "$78,500",
    status: "Active",
    onboardedDate: "2024-02-20",
    lastActivity: "1 day ago",
    source: "Website",
  },
  {
    id: 3,
    name: "GrowthCorp",
    contact: "Emily Rodriguez",
    email: "emily.r@growthcorp.com",
    phone: "+1 (555) 456-7890",
    location: "New York, NY",
    industry: "Marketing",
    value: "$125,000",
    status: "At Risk",
    onboardedDate: "2023-11-10",
    lastActivity: "1 week ago",
    source: "Campaign",
  },
];

const mockLeads = [
  {
    id: 1,
    name: "InnovateLab",
    contact: "David Kim",
    email: "d.kim@innovatelab.com",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    industry: "Technology",
    score: 85,
    status: "Qualified",
    source: "LinkedIn",
    created: "3 days ago",
    lastActivity: "1 day ago",
  },
  {
    id: 2,
    name: "ScaleUp Ventures",
    contact: "Lisa Thompson",
    email: "l.thompson@scaleup.vc",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    industry: "Finance",
    score: 92,
    status: "Hot",
    source: "Referral",
    created: "1 day ago",
    lastActivity: "2 hours ago",
  },
];

const mockDeals = [
  {
    id: 1,
    name: "Enterprise Package - TechFlow",
    company: "TechFlow Inc",
    value: "$89,000",
    stage: "Negotiation",
    probability: 75,
    closeDate: "2024-12-15",
    owner: "Sarah Johnson",
    source: "Referral",
    lastActivity: "1 day ago",
  },
  {
    id: 2,
    name: "Annual Subscription - DataDrive",
    company: "DataDrive Solutions",
    value: "$156,000",
    stage: "Proposal",
    probability: 60,
    closeDate: "2024-12-30",
    owner: "Michael Chen",
    source: "Website",
    lastActivity: "3 hours ago",
  },
];

export default function CRM() {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  const SummaryCard = ({ title, total, subtitle, growth, icon: Icon }) => (
    <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {total}
            </p>
            {subtitle && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            <Icon className="h-8 w-8 text-blue-500 mb-2" />
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />+{growth}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CustomerCard = ({ customer }) => (
    <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-300 group">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white break-words">
                {customer.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 break-words">
                {customer.contact}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-sm text-slate-500 dark:text-slate-400 gap-1 sm:gap-0">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="break-words">{customer.industry}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="break-words">{customer.location}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
            <div className="text-left sm:text-right">
              <div className="text-base sm:text-lg font-bold text-green-600">
                {customer.value}
              </div>
              <Badge
                variant={
                  customer.status === "Active"
                    ? "default"
                    : customer.status === "At Risk"
                    ? "destructive"
                    : "secondary"
                }
              >
                {customer.status}
              </Badge>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 break-words">
                Last activity: {customer.lastActivity}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
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
          </div>
          <div className="flex space-x-2 justify-center sm:justify-end">
            <Button size="sm" variant="ghost" className="p-2">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const LeadCard = ({ lead }) => (
    <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-300 group">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white break-words">
                {lead.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 break-words">
                {lead.contact}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-sm text-slate-500 dark:text-slate-400 gap-1 sm:gap-0">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="break-words">{lead.industry}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="break-words">{lead.location}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
            <div className="text-left sm:text-right">
              <div className="text-base sm:text-lg font-bold text-blue-600">
                Score: {lead.score}
              </div>
              <Badge
                variant={
                  lead.status === "Hot"
                    ? "destructive"
                    : lead.status === "Qualified"
                    ? "default"
                    : "secondary"
                }
              >
                {lead.status}
              </Badge>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 break-words">
                Created: {lead.created}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
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
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white flex-1 sm:flex-none"
            >
              Convert
            </Button>
          </div>
          <div className="flex space-x-2 justify-center sm:justify-end">
            <Button size="sm" variant="ghost" className="p-2">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DealCard = ({ deal }) => (
    <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-300 group">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white break-words">
              {deal.name}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 break-words">
              {deal.company}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-sm text-slate-500 dark:text-slate-400 gap-1 sm:gap-0">
              <span className="break-words">Owner: {deal.owner}</span>
              <span className="break-words">Source: {deal.source}</span>
            </div>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
            <div className="text-left sm:text-right">
              <div className="text-lg sm:text-xl font-bold text-green-600">
                {deal.value}
              </div>
              <Badge variant="outline">{deal.stage}</Badge>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 break-words">
                Close: {deal.closeDate}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-400">
              Probability
            </span>
            <span className="font-medium">{deal.probability}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${deal.probability}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/50 dark:bg-slate-800/50 border-white/20 flex-1 sm:flex-none"
            >
              Update Stage
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/50 dark:bg-slate-800/50 border-white/20 flex-1 sm:flex-none"
            >
              Add Note
            </Button>
          </div>
          <div className="flex space-x-2 justify-center sm:justify-end">
            <Button size="sm" variant="ghost" className="p-2">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            CRM Dashboard
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Manage customers, leads, and deals with comprehensive filtering
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full sm:w-auto">
          Add New Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <SummaryCard
          title="On-boarded Customers"
          total={summaryStats.customers.total}
          subtitle={`${summaryStats.customers.new} new this month`}
          growth={summaryStats.customers.growth}
          icon={Users}
        />
        <SummaryCard
          title="Active Leads"
          total={summaryStats.leads.total}
          subtitle={`${summaryStats.leads.qualified} qualified`}
          growth={summaryStats.leads.growth}
          icon={TrendingUp}
        />
        <SummaryCard
          title="Active Deals"
          total={`$${(summaryStats.deals.value / 1000000).toFixed(1)}M`}
          subtitle={`${summaryStats.deals.total} deals • ${summaryStats.deals.won} won`}
          growth={summaryStats.deals.growth}
          icon={DollarSign}
        />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border border-white/20">
          <TabsTrigger
            value="customers"
            className="flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Customers</span>
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Leads</span>
          </TabsTrigger>
          <TabsTrigger value="deals" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Deals</span>
          </TabsTrigger>
        </TabsList>

        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="sm:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-statuses">All statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="At Risk">At Risk</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50">
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-sources">All sources</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Campaign">Campaign</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50">
                  <SelectValue placeholder="Filter by month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All time</SelectItem>
                  <SelectItem value="2024-12">December 2024</SelectItem>
                  <SelectItem value="2024-11">November 2024</SelectItem>
                  <SelectItem value="2024-10">October 2024</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="bg-white/50 dark:bg-slate-800/50 border-white/20 w-full lg:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced
              </Button>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {mockCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {mockLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deals" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {mockDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
