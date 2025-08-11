"use client";

import { useEffect, useState } from "react";
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
  ArrowUpDown,
  BarChart2,
  Activity,
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
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialSummaryStats = {
  customers: { total: 0, newThisMonth: 0, growth: 0 },
  leads: { total: 0, newThisMonth: 0, growth: 0 },
  deals: { total: 0, totalValue: 0, growth: 0 },
  conversionRate: 0,
};

export default function CRM() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-statuses");
  const [monthFilter, setMonthFilter] = useState("all-time");
  const [sortBy, setSortBy] = useState("created_at");
  const [priority, setPriority] = useState("all-priorities");
  const [sortOrder, setSortOrder] = useState("desc");
  const [mockCustomers, setMockCustomers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [mockLeads, setMockLeads] = useState([]);
  const [mockDeals, setMockDeals] = useState([]);
  const [mockLists, setMockLists] = useState([]);
  const [mockCompanies, setMockCompanies] = useState([]);
  const [summaryStats, setSummaryStats] = useState(initialSummaryStats);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;

    if (!userId) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchContacts = fetch("/api/crm/getContacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }).then((res) =>
          res.ok ? res.json() : Promise.reject("Failed to fetch contacts")
        );

        const fetchCustomers = fetch("/api/crm/getCustomers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }).then((res) =>
          res.ok ? res.json() : Promise.reject("Failed to fetch customers")
        );

        const fetchLeads = fetch("/api/crm/getLeads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }).then((res) =>
          res.ok ? res.json() : Promise.reject("Failed to fetch leads")
        );

        const fetchDeals = fetch("/api/crm/getDeals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }).then((res) =>
          res.ok ? res.json() : Promise.reject("Failed to fetch deals")
        );

        const fetchLists = fetch("/api/crm/getLists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }).then((res) =>
          res.ok ? res.json() : Promise.reject("Failed to fetch lists")
        );

        const fetchCompanies = fetch("/api/crm/getCompanies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }).then((res) =>
          res.ok ? res.json() : Promise.reject("Failed to fetch companies")
        );

        const [
          contactsData,
          customersData,
          leadsData,
          dealsData,
          listsData,
          companiesData,
        ] = await Promise.all([
          fetchContacts,
          fetchCustomers,
          fetchLeads,
          fetchDeals,
          fetchLists,
          fetchCompanies,
        ]);

        setContacts(contactsData);
        setMockCustomers(customersData);
        setMockLeads(leadsData);
        setMockDeals(dealsData);
        setMockLists(listsData);
        setMockCompanies(companiesData);

        const currentMonth = new Date().toISOString().slice(0, 7);
        const customersThisMonth = customersData.filter(
          (c) => c.created_at.slice(0, 7) === currentMonth
        ).length;
        const leadsThisMonth = leadsData.filter(
          (l) => l.created_at.slice(0, 7) === currentMonth
        ).length;
        const totalDealValue = dealsData.reduce(
          (sum, d) => sum + parseFloat(d.amount || 0),
          0
        );
        const conversionRate =
          leadsData.length > 0
            ? Math.round((customersData.length / leadsData.length) * 100)
            : 0;

        setSummaryStats({
          customers: {
            total: customersData.length,
            newThisMonth: customersThisMonth,
            growth:
              customersData.length > 0
                ? Math.round((customersThisMonth / customersData.length) * 100)
                : 0,
          },
          leads: {
            total: leadsData.length,
            newThisMonth: leadsThisMonth,
            growth:
              leadsData.length > 0
                ? Math.round((leadsThisMonth / leadsData.length) * 100)
                : 0,
          },
          deals: {
            total: dealsData.length,
            totalValue: totalDealValue,
            growth:
              dealsData.length > 0
                ? Math.round(
                    (dealsData.filter((d) => d.stage === "prospect").length /
                      dealsData.length) *
                      100
                  )
                : 0,
          },
          conversionRate,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // setInterval(() => {
    //   fetchData();
    // }, 10000);

    fetchData();
  }, []);

  const filterAndSortData = (data, tab) => {
    let filtered = [...data];

    if (searchTerm) {
      filtered = filtered.filter((item) => {
        const name = item.name?.toLowerCase() || "";
        const email = item.email?.toLowerCase() || "";
        return (
          name.includes(searchTerm.toLowerCase()) ||
          email.includes(searchTerm.toLowerCase())
        );
      });
    }

    if (statusFilter !== "all-statuses") {
      filtered = filtered.filter(
        (item) =>
          item.stage?.toLowerCase() === statusFilter.toLowerCase() ||
          item.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (monthFilter !== "all-time") {
      filtered = filtered.filter(
        (item) => item.created_at?.slice(0, 7) === monthFilter
      );
    }

    if (priority !== "all-priorities" && tab === "deals") {
      filtered = filtered.filter(
        (item) => item.priority?.toLowerCase() === priority.toLowerCase()
      );
    }

    filtered.sort((a, b) => {
      let aValue = a[sortBy] || "";
      let bValue = b[sortBy] || "";

      if (sortBy === "amount") {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (sortBy === "created_at") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const SummaryCard = ({ title, total, subtitle, growth, icon: Icon }) => (
    <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20 transition-transform hover:scale-105">
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

  const getChartData = () => {
    const today = new Date();
    const pastDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().slice(0, 10);
    }).reverse();

    const customerData = pastDays.map(
      (date) =>
        mockCustomers.filter((c) => c.created_at.startsWith(date)).length
    );
    const leadData = pastDays.map(
      (date) => mockLeads.filter((l) => l.created_at.startsWith(date)).length
    );
    const dealData = pastDays.map(
      (date) => mockDeals.filter((d) => d.created_at.startsWith(date)).length
    );

    return {
      labels: pastDays.map((date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }),
      datasets: [
        {
          label: "Customers",
          data: customerData,
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 2,
        },
        {
          label: "Leads",
          data: leadData,
          backgroundColor: "rgba(16, 185, 129, 0.5)",
          borderColor: "rgb(16, 185, 129)",
          borderWidth: 2,
        },
        {
          label: "Deals",
          data: dealData,
          backgroundColor: "rgba(245, 158, 11, 0.5)",
          borderColor: "rgb(245, 158, 11)",
          borderWidth: 2,
        },
      ],
    };
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            CRM Dashboard
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Advanced CRM with analytics, filtering, and quick actions
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SummaryCard
          title="On-boarded Customers"
          total={summaryStats.customers.total}
          subtitle={`${summaryStats.customers.newThisMonth} new this month`}
          growth={summaryStats.customers.growth}
          icon={Users}
        />
        <SummaryCard
          title="Active Leads"
          total={summaryStats.leads.total}
          subtitle={`${summaryStats.leads.newThisMonth} new this month`}
          growth={summaryStats.leads.growth}
          icon={TrendingUp}
        />
        <SummaryCard
          title="Active Deals"
          total={`$${(summaryStats.deals.totalValue / 1000000).toFixed(1)}M`}
          subtitle={`${summaryStats.deals.total} deals`}
          growth={summaryStats.deals.growth}
          icon={DollarSign}
        />
        <SummaryCard
          title="Conversion Rate"
          total={`${summaryStats.conversionRate}%`}
          subtitle="Lead to Customer"
          growth={summaryStats.conversionRate}
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
          <CardHeader>
            <CardTitle>Past 7 Days Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={getChartData()}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Daily CRM Metrics (Last 7 Days)",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.dataset.label || "";
                        const value = context.parsed.y;
                        return `${label}: ${value}`;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: "Counts" },
                  },
                  x: { title: { display: true, text: "Date" } },
                },
              }}
            />
          </CardContent>
        </Card>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
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
                  {(activeTab === "contacts" || activeTab == "leads") && (
                    <>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="at-risk">At Risk</SelectItem>
                    </>
                  )}
                  {activeTab === "companies" && (
                    <>
                      <SelectItem value="Prospect">Prospect</SelectItem>
                      <SelectItem value="Lead">Lead</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Churned">Churned</SelectItem>
                    </>
                  )}
                  {activeTab === "deals" && (
                    <>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="qualification">
                        Qualification
                      </SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50">
                  <SelectValue placeholder="Filter by month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All time</SelectItem>
                  <SelectItem value="2025-08">August 2025</SelectItem>
                  <SelectItem value="2025-07">July 2025</SelectItem>
                  <SelectItem value="2025-06">June 2025</SelectItem>
                </SelectContent>
              </Select>
              {activeTab === "deals" && (
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-priorities">
                      All priorities
                    </SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="created_at">Created Date</SelectItem>
                  {activeTab === "deals" && (
                    <SelectItem value="amount">Amount</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="bg-white/50 dark:bg-slate-800/50 border-white/20 w-full lg:w-auto"
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="contacts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filterAndSortData(contacts, "contacts").map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterAndSortData(mockCustomers, "customers").map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterAndSortData(mockLeads, "leads").map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="deals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterAndSortData(mockDeals, "deals").map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="companies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 mb-20 xl:grid-cols-3 gap-6">
            {filterAndSortData(mockCompanies, "companies").map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="lists" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterAndSortData(mockLists, "lists").map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
