"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MessageSquare,
  Phone,
  Linkedin,
  MessageCircle,
  Hash,
  TrendingUp,
  TrendingDown,
  Send,
  Users,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

// Similar structure to Engagement but focused on outreach for sourced leads
const outreachData = {
  email: {
    campaigns: 15,
    sent: 2340,
    responses: 234,
    meetings: 45,
    responseRate: 10.0,
    meetingRate: 1.9,
    recentCampaigns: [
      {
        name: "Q4 Enterprise Outreach",
        sent: 450,
        responses: 67,
        meetings: 12,
        status: "Active",
      },
      {
        name: "SaaS Decision Makers",
        sent: 320,
        responses: 45,
        meetings: 8,
        status: "Completed",
      },
      {
        name: "Healthcare Industry Push",
        sent: 280,
        responses: 38,
        meetings: 6,
        status: "Active",
      },
    ],
  },
  social: {
    linkedin: {
      connections: 2340,
      messages: 567,
      responses: 234,
      meetings: 34,
    },
    twitter: { tweets: 89, engagements: 1234, followers: 5670 },
    reddit: { posts: 23, comments: 145, karma: 890 },
  },
  calls: {
    total: 345,
    connected: 234,
    meetings: 89,
    connectRate: 67.8,
    meetingRate: 38.0,
    avgDuration: "14.2 min",
  },
};

export default function Outreach() {
  const [activeTab, setActiveTab] = useState("overview");

  const MetricCard = ({
    title,
    value,
    subtitle,
    change,
    icon: Icon,
    color = "blue",
  }) => (
    <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
      <CardContent className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 break-words">
              {title}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 break-words">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between sm:flex-col sm:items-end">
            <Icon
              className={`h-5 w-5 sm:h-8 sm:w-8 text-${color}-500 mb-0 sm:mb-2`}
            />
            {change !== undefined && (
              <div
                className={`flex items-center text-xs sm:text-sm ${
                  change > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {change > 0 ? (
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                )}
                {Math.abs(change)}%
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Outreach for Sourced Leads
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Track outreach performance across all channels for your sourced
            leads
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20 w-full sm:w-auto"
          >
            Create Campaign
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full sm:w-auto">
            <Send className="w-4 h-4 mr-2" />
            New Outreach
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <MetricCard
          title="Total Outreach"
          value="3,456"
          subtitle="Across all channels"
          change={18}
          icon={Send}
          color="blue"
        />
        <MetricCard
          title="Response Rate"
          value="12.4%"
          subtitle="Average across channels"
          change={5}
          icon={Target}
          color="green"
        />
        <MetricCard
          title="Meetings Booked"
          value="168"
          subtitle="From outreach efforts"
          change={23}
          icon={CheckCircle}
          color="purple"
        />
        <MetricCard
          title="Pipeline Generated"
          value="$2.3M"
          subtitle="From sourced leads"
          change={31}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Channel Performance Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border border-white/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="email">Email Outreach</TabsTrigger>
          <TabsTrigger value="social">Social Outreach</TabsTrigger>
          <TabsTrigger value="calls">Call Outreach</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Channel Performance */}
            <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Email Campaigns</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          2,340 sent
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">10.0%</div>
                      <div className="text-xs text-slate-500">
                        Response Rate
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <div className="flex items-center space-x-3">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">LinkedIn Outreach</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          567 messages
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">41.3%</div>
                      <div className="text-xs text-slate-500">
                        Response Rate
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium">Cold Calls</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          345 attempts
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">67.8%</div>
                      <div className="text-xs text-slate-500">Connect Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
              <CardHeader>
                <CardTitle>Recent Outreach Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <div className="font-medium text-sm">
                        Meeting scheduled with TechCorp
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        via LinkedIn outreach • 2 hours ago
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <Mail className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <div className="font-medium text-sm">
                        Email campaign launched
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        "Healthcare Q4 Push" • 450 recipients • 4 hours ago
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <Phone className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <div className="font-medium text-sm">
                        Call sequence completed
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        89 calls made • 23 meetings booked • 1 day ago
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <div className="font-medium text-sm">
                        Follow-up required
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        12 prospects need follow-up • 2 days ago
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Email Outreach Tab */}
        <TabsContent value="email" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <MetricCard
              title="Campaigns Active"
              value={outreachData.email.campaigns}
              icon={Mail}
              change={12}
            />
            <MetricCard
              title="Total Sent"
              value={outreachData.email.sent}
              icon={Send}
              change={18}
            />
            <MetricCard
              title="Meetings Booked"
              value={outreachData.email.meetings}
              icon={CheckCircle}
              change={25}
            />
          </div>

          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Email Campaign Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {outreachData.email.recentCampaigns.map((campaign, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 rounded-lg bg-white/50 dark:bg-slate-700/50"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 dark:text-white break-words">
                        {campaign.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 break-words">
                        {campaign.sent} sent • {campaign.responses} responses •{" "}
                        {campaign.meetings} meetings
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:space-x-3">
                      <Badge
                        variant={
                          campaign.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {campaign.status}
                      </Badge>
                      <div className="text-left sm:text-right">
                        <div className="font-bold text-green-600">
                          {((campaign.responses / campaign.sent) * 100).toFixed(
                            1
                          )}
                          %
                        </div>
                        <div className="text-xs text-slate-500">
                          Response Rate
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Outreach Tab */}
        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="LinkedIn Messages"
              value={outreachData.social.linkedin.messages}
              subtitle={`${outreachData.social.linkedin.responses} responses`}
              icon={Linkedin}
              change={15}
            />
            <MetricCard
              title="LinkedIn Meetings"
              value={outreachData.social.linkedin.meetings}
              subtitle="From social outreach"
              icon={CheckCircle}
              change={22}
            />
            <MetricCard
              title="Social Reach"
              value="12.4K"
              subtitle="Total impressions"
              icon={Users}
              change={8}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
              <CardHeader>
                <CardTitle>LinkedIn Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Connection Requests</span>
                    <span className="font-bold">
                      {outreachData.social.linkedin.connections}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Messages Sent</span>
                    <span className="font-bold">
                      {outreachData.social.linkedin.messages}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Response Rate</span>
                    <span className="font-bold text-green-600">
                      {(
                        (outreachData.social.linkedin.responses /
                          outreachData.social.linkedin.messages) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
              <CardHeader>
                <CardTitle>Other Social Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-orange-500" />
                      <span>Twitter/X</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {outreachData.social.twitter.engagements}
                      </div>
                      <div className="text-xs text-slate-500">Engagements</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-red-500" />
                      <span>Reddit</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {outreachData.social.reddit.karma}
                      </div>
                      <div className="text-xs text-slate-500">Karma Points</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Call Outreach Tab */}
        <TabsContent value="calls" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Total Calls"
              value={outreachData.calls.total}
              icon={Phone}
              change={12}
            />
            <MetricCard
              title="Connect Rate"
              value={`${outreachData.calls.connectRate}%`}
              icon={Target}
              change={5}
            />
            <MetricCard
              title="Meeting Rate"
              value={`${outreachData.calls.meetingRate}%`}
              icon={CheckCircle}
              change={18}
            />
          </div>

          <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle>Call Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <span>Total Attempts</span>
                    <span className="font-bold">
                      {outreachData.calls.total}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <span>Connected Calls</span>
                    <span className="font-bold">
                      {outreachData.calls.connected}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <span>Meetings Scheduled</span>
                    <span className="font-bold text-green-600">
                      {outreachData.calls.meetings}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <span>Avg Call Duration</span>
                    <span className="font-bold">
                      {outreachData.calls.avgDuration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <span>Best Call Time</span>
                    <span className="font-bold">10-11 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                    <span>Follow-ups Needed</span>
                    <span className="font-bold text-yellow-600">23</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
