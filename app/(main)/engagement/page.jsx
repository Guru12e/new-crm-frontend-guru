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
  Eye,
  MousePointer,
  Reply,
  Heart,
  Share,
  Users,
  Clock,
  Calendar,
  BarChart3,
} from "lucide-react";
import Image from "next/image";

const emailAnalytics = {
  totalSent: 1250,
  opened: 875,
  clicked: 234,
  replied: 89,
  bounced: 23,
  openRate: 70,
  clickRate: 18.7,
  replyRate: 7.1,
  recentCampaigns: [
    {
      name: "Q4 Product Launch",
      sent: 500,
      opened: 350,
      clicked: 89,
      replies: 23,
    },
    {
      name: "Holiday Promotion",
      sent: 300,
      opened: 210,
      clicked: 67,
      replies: 15,
    },
    {
      name: "Customer Feedback",
      sent: 450,
      opened: 315,
      clicked: 78,
      replies: 51,
    },
  ],
};

const slackAnalytics = {
  totalMessages: 2340,
  responses: 1567,
  reactions: 892,
  mentions: 234,
  responseRate: 67,
  avgResponseTime: "2.3 hours",
  topChannels: [
    { name: "#sales-team", messages: 456, responses: 334 },
    { name: "#marketing", messages: 389, responses: 267 },
    { name: "#customer-success", messages: 298, responses: 201 },
  ],
};

const callAnalytics = {
  totalCalls: 189,
  connected: 145,
  meetings: 67,
  demos: 34,
  connectRate: 76.7,
  meetingRate: 46.2,
  avgCallDuration: "12.5 min",
  recentCalls: [
    {
      contact: "Sarah Johnson",
      duration: "18 min",
      outcome: "Meeting Scheduled",
      date: "Today",
    },
    {
      contact: "Michael Chen",
      duration: "8 min",
      outcome: "Follow-up Required",
      date: "Yesterday",
    },
    {
      contact: "Emily Rodriguez",
      duration: "22 min",
      outcome: "Demo Completed",
      date: "2 days ago",
    },
  ],
};

const whatsappAnalytics = {
  totalMessages: 567,
  delivered: 552,
  read: 489,
  replied: 234,
  deliveryRate: 97.4,
  readRate: 88.6,
  replyRate: 47.8,
  conversations: [
    {
      contact: "David Kim",
      messages: 12,
      lastSeen: "2 hours ago",
      status: "Active",
    },
    {
      contact: "Lisa Thompson",
      messages: 8,
      lastSeen: "1 day ago",
      status: "Pending",
    },
    {
      contact: "James Wilson",
      messages: 15,
      lastSeen: "3 hours ago",
      status: "Active",
    },
  ],
};

const redditAnalytics = {
  totalPosts: 45,
  totalComments: 156,
  upvotes: 1234,
  downvotes: 89,
  karma: 1145,
  engagementRate: 23.4,
  topPosts: [
    {
      title: "How we scaled our SaaS to 10k users",
      upvotes: 234,
      comments: 45,
    },
    { title: "B2B sales automation tips", upvotes: 189, comments: 32 },
    { title: "CRM best practices in 2024", upvotes: 156, comments: 28 },
  ],
};

const discordAnalytics = {
  totalMessages: 892,
  reactions: 445,
  mentions: 67,
  voiceTime: "23.4 hours",
  servers: 12,
  activeMembers: 345,
  topServers: [
    { name: "SaaS Founders", messages: 234, reactions: 123 },
    { name: "B2B Marketing", messages: 189, reactions: 98 },
    { name: "Sales Professionals", messages: 156, reactions: 76 },
  ],
};

const linkedinAnalytics = {
  totalPosts: 78,
  impressions: 45670,
  engagements: 2345,
  clicks: 567,
  followers: 12340,
  profileViews: 1567,
  engagementRate: 5.1,
  recentPosts: [
    {
      content: "5 ways to improve your sales process",
      impressions: 2345,
      engagements: 234,
      date: "2 days ago",
    },
    {
      content: "The future of B2B marketing",
      impressions: 1890,
      engagements: 189,
      date: "5 days ago",
    },
    {
      content: "Why automation is key for GTM",
      impressions: 1567,
      engagements: 156,
      date: "1 week ago",
    },
  ],
};

export default function Engagement() {
  const [activeTab, setActiveTab] = useState("email");

  const AnalyticsCard = ({ title, value, change, icon: Icon, subtitle }) => (
    <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 break-words">
              {title}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 break-words">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between sm:flex-col sm:items-end">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mb-0 sm:mb-1" />
            {change !== undefined && (
              <div
                className={`flex items-center text-xs ${
                  change > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {change > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Engagement Analytics
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Track engagement across all communication channels
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full sm:w-auto">
          <BarChart3 className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="overflow-x-auto">
          <TabsList className="grid w-max min-w-full grid-cols-7 backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border border-white/20">
            <TabsTrigger
              value="email"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
            >
              <Mail className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Email</span>
            </TabsTrigger>
            <TabsTrigger
              value="slack"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Slack</span>
            </TabsTrigger>
            <TabsTrigger
              value="calls"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Calls</span>
            </TabsTrigger>
            <TabsTrigger
              value="whatsapp"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs sm:text-sm">WhatsApp</span>
            </TabsTrigger>
            <TabsTrigger
              value="reddit"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
            >
              <Hash className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Reddit</span>
            </TabsTrigger>
            <TabsTrigger
              value="discord"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Discord</span>
            </TabsTrigger>
            <TabsTrigger
              value="linkedin"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-xs sm:text-sm">LinkedIn</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="email" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <AnalyticsCard
              title="Total Sent"
              value={emailAnalytics.totalSent}
              icon={Mail}
              change={12}
            />
            <AnalyticsCard
              title="Open Rate"
              value={`${emailAnalytics.openRate}%`}
              icon={Eye}
              change={5}
            />
            <AnalyticsCard
              title="Click Rate"
              value={`${emailAnalytics.clickRate}%`}
              icon={MousePointer}
              change={-2}
            />
            <AnalyticsCard
              title="Reply Rate"
              value={`${emailAnalytics.replyRate}%`}
              icon={Reply}
              change={8}
            />
          </div>

          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Recent Email Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {emailAnalytics.recentCampaigns.map((campaign, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 sm:p-4 rounded-lg bg-white/50 dark:bg-slate-700/50"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 dark:text-white break-words">
                        {campaign.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 break-words">
                        {campaign.sent} sent • {campaign.opened} opened •{" "}
                        {campaign.clicked} clicked
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="self-start sm:self-center"
                    >
                      {campaign.replies} replies
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="slack" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsCard
              title="Messages Sent"
              value={slackAnalytics.totalMessages}
              icon={MessageSquare}
              change={15}
            />
            <AnalyticsCard
              title="Response Rate"
              value={`${slackAnalytics.responseRate}%`}
              icon={Reply}
              change={3}
            />
            <AnalyticsCard
              title="Reactions"
              value={slackAnalytics.reactions}
              icon={Heart}
              change={22}
            />
            <AnalyticsCard
              title="Avg Response Time"
              value={slackAnalytics.avgResponseTime}
              icon={Clock}
            />
          </div>

          <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle>Top Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {slackAnalytics.topChannels.map((channel, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-slate-700/50"
                  >
                    <div className="flex items-center space-x-3">
                      <Hash className="w-4 h-4 text-slate-500" />
                      <span className="font-medium text-slate-900 dark:text-white">
                        {channel.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {channel.messages} messages
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {channel.responses} responses
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calls" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsCard
              title="Total Calls"
              value={callAnalytics.totalCalls}
              icon={Phone}
              change={18}
            />
            <AnalyticsCard
              title="Connect Rate"
              value={`${callAnalytics.connectRate}%`}
              icon={Users}
              change={7}
            />
            <AnalyticsCard
              title="Meeting Rate"
              value={`${callAnalytics.meetingRate}%`}
              icon={Calendar}
              change={12}
            />
            <AnalyticsCard
              title="Avg Duration"
              value={callAnalytics.avgCallDuration}
              icon={Clock}
            />
          </div>

          <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {callAnalytics.recentCalls.map((call, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-slate-700/50"
                  >
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {call.contact}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {call.duration} • {call.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        call.outcome.includes("Scheduled") ||
                        call.outcome.includes("Completed")
                          ? "default"
                          : "secondary"
                      }
                    >
                      {call.outcome}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsCard
              title="Messages Sent"
              value={whatsappAnalytics.totalMessages}
              icon={MessageCircle}
              change={25}
            />
            <AnalyticsCard
              title="Delivery Rate"
              value={`${whatsappAnalytics.deliveryRate}%`}
              icon={Eye}
              change={2}
            />
            <AnalyticsCard
              title="Read Rate"
              value={`${whatsappAnalytics.readRate}%`}
              icon={Eye}
              change={5}
            />
            <AnalyticsCard
              title="Reply Rate"
              value={`${whatsappAnalytics.replyRate}%`}
              icon={Reply}
              change={8}
            />
          </div>

          <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle>Active Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {whatsappAnalytics.conversations.map((conv, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-slate-700/50"
                  >
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {conv.contact}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {conv.messages} messages • Last seen {conv.lastSeen}
                      </p>
                    </div>
                    <Badge
                      variant={
                        conv.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {conv.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reddit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsCard
              title="Total Posts"
              value={redditAnalytics.totalPosts}
              icon={Hash}
              change={20}
            />
            <AnalyticsCard
              title="Total Karma"
              value={redditAnalytics.karma}
              icon={TrendingUp}
              change={35}
            />
            <AnalyticsCard
              title="Upvotes"
              value={redditAnalytics.upvotes}
              icon={TrendingUp}
              change={15}
            />
            <AnalyticsCard
              title="Engagement Rate"
              value={`${redditAnalytics.engagementRate}%`}
              icon={Heart}
              change={8}
            />
          </div>

          <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle>Top Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {redditAnalytics.topPosts.map((post, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-slate-700/50"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {post.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {post.comments} comments
                      </p>
                    </div>
                    <Badge variant="outline">{post.upvotes} upvotes</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discord" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsCard
              title="Messages Sent"
              value={discordAnalytics.totalMessages}
              icon={MessageSquare}
              change={18}
            />
            <AnalyticsCard
              title="Voice Time"
              value={discordAnalytics.voiceTime}
              icon={Phone}
              change={25}
            />
            <AnalyticsCard
              title="Reactions"
              value={discordAnalytics.reactions}
              icon={Heart}
              change={12}
            />
            <AnalyticsCard
              title="Active Members"
              value={discordAnalytics.activeMembers}
              icon={Users}
              change={8}
            />
          </div>

          <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle>Top Servers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discordAnalytics.topServers.map((server, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-slate-700/50"
                  >
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {server.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {server.messages} messages • {server.reactions}{" "}
                        reactions
                      </p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="linkedin" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsCard
              title="Total Posts"
              value={linkedinAnalytics.totalPosts}
              icon={Linkedin}
              change={14}
            />
            <AnalyticsCard
              title="Impressions"
              value={linkedinAnalytics.impressions.toLocaleString()}
              icon={Eye}
              change={22}
            />
            <AnalyticsCard
              title="Engagement Rate"
              value={`${linkedinAnalytics.engagementRate}%`}
              icon={Heart}
              change={6}
            />
            <AnalyticsCard
              title="Profile Views"
              value={linkedinAnalytics.profileViews.toLocaleString()}
              icon={Users}
              change={18}
            />
          </div>

          <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle>Recent Posts Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {linkedinAnalytics.recentPosts.map((post, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-slate-700/50"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {post.content}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {post.impressions.toLocaleString()} impressions •{" "}
                        {post.engagements} engagements • {post.date}
                      </p>
                    </div>
                    <Badge variant="outline">Published</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
