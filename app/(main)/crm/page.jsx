"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  Users,
  TrendingUp,
  DollarSign,
  Filter,
  Search,
  Building2,
  ListChecks,
  Contact,
} from "lucide-react";
import CustomerForm from "@/components/libs/forms/CustomerForm";
import ContactForm from "@/components/libs/forms/ContactForm";
import LeadForm from "@/components/libs/forms/LeadForm";
import CompanyForm from "@/components/libs/forms/CompanyForm";
import DealForm from "@/components/libs/forms/DealForm";
import ListForm from "@/components/libs/forms/ListForm";
import CustomerCard from "@/components/libs/cards/CustomerCard";
import LeadCard from "@/components/libs/cards/LeadCard";
import DealCard from "@/components/libs/cards/DealCard";
import ContactCard from "@/components/libs/cards/ContactCard";
import CompanyCard from "@/components/libs/cards/CompanyCard";
import ListCard from "@/components/libs/cards/ListCard";
import { useRouter } from "next/navigation";

const summaryStats = {
  customers: { total: 1247, new: 89, growth: 12 },
  leads: { total: 2456, qualified: 567, growth: 18 },
  deals: { total: 189, won: 67, growth: 15, value: 2340000 },
};

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
  const [activeTab, setActiveTab] = useState("contacts");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [mockCustomers, setMockCustomers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [mockLeads, setMockLeads] = useState([]);
  const [mockDeals, setMockDeals] = useState([]);
  const [mockLists, setMockLists] = useState([]);
  const [mockCompanies, setMockCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    if (!userId) {
      router.push("/");
    }

    const fetchContacts = async () => {
      const response = await fetch("/api/crm/getContacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        console.error("Failed to fetch contacts");
      }
    };
    fetchContacts();
    const fetchCustomers = async () => {
      const response = await fetch("/api/crm/getCustomers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        setMockCustomers(data);
      } else {
        console.error("Failed to fetch customers");
      }
    };
    fetchCustomers();
    const fetchLeads = async () => {
      const response = await fetch("/api/crm/getLeads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        setMockLeads(data);
      } else {
        console.error("Failed to fetch leads");
      }
    };
    fetchLeads();
    const fetchDeals = async () => {
      const response = await fetch("/api/crm/getDeals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        setMockDeals(data);
      } else {
        console.error("Failed to fetch deals");
      }
    };
    fetchDeals();
    const fetchLists = async () => {
      const response = await fetch("/api/crm/getLists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        setMockLists(data);
      } else {
        console.error("Failed to fetch lists");
      }
    };
    fetchLists();
    const fetchCompanies = async () => {
      const response = await fetch("/api/crm/getCompanies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMockCompanies(data);
      } else {
        console.error("Failed to fetch companies");
      }
    };
    fetchCompanies();
  }, []);

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

        <Sheet className="relative w-max">
          <SheetTrigger asChild>
            <Button className="bg-gradient-to-r px-3 py-2 rounded-xl from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full sm:w-auto">
              Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </Button>
          </SheetTrigger>
          {activeTab === "contacts" && <ContactForm className="p-6" />}
          {activeTab === "customers" && <CustomerForm className="p-6" />}
          {activeTab === "leads" && <LeadForm className="p-6" />}
          {activeTab === "deals" && <DealForm className="p-6" />}
          {activeTab === "companies" && <CompanyForm className="p-6" />}
          {activeTab === "lists" && <ListForm className="p-6" />}
        </Sheet>
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
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 space-y-2 mb-10 backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border border-white/20">
          <TabsTrigger value="contacts" className="flex items-center space-x-2">
            <Contact className="w-4 h-4" />
            <span>Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Leads</span>
          </TabsTrigger>
          <TabsTrigger
            value="companies"
            className="flex items-center space-x-2"
          >
            <Building2 className="w-4 h-4" />
            <span>Companies</span>
          </TabsTrigger>
          <TabsTrigger value="deals" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Deals</span>
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Customers</span>
          </TabsTrigger>
          <TabsTrigger value="lists" className="flex items-center space-x-2">
            <ListChecks className="w-4 h-4" />
            <span>Lists</span>
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

        <TabsContent value="contacts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="deals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="companies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="lists" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockLists.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
