"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Settings,
  Play,
  Pause,
  Eye,
  Edit,
  Trash,
  TrendingUp,
  DollarSign,
  MousePointer,
  Users,
  Sparkles,
  Image,
  Video,
  FileText,
  Upload,
  Camera,
} from "lucide-react";

const mockCampaigns = {
  google: [
    {
      id: 1,
      name: "SaaS Lead Generation Q4",
      status: "Active",
      budget: "$2,500",
      spent: "$1,847",
      impressions: 45670,
      clicks: 1234,
      conversions: 89,
      ctr: 2.7,
      cpc: "$1.49",
      created: "2024-11-15",
    },
    {
      id: 2,
      name: "Enterprise Demo Campaign",
      status: "Paused",
      budget: "$5,000",
      spent: "$3,245",
      impressions: 78903,
      clicks: 2156,
      conversions: 156,
      ctr: 2.9,
      cpc: "$1.51",
      created: "2024-10-20",
    },
  ],
  linkedin: [
    {
      id: 1,
      title: "5 Key Metrics Every B2B SaaS Should Track",
      content:
        "In today's competitive landscape, tracking the right metrics can make or break your SaaS business. Here are the 5 essential KPIs every founder should monitor...",
      status: "Published",
      engagement: 234,
      reach: 5670,
      clicks: 89,
      comments: 23,
      shares: 12,
      created: "2024-12-10",
    },
    {
      id: 2,
      title: "The Future of GTM Strategy in 2025",
      content:
        "As we head into 2025, GTM strategies are evolving rapidly. Here's what successful companies are doing differently...",
      status: "Draft",
      engagement: 0,
      reach: 0,
      clicks: 0,
      comments: 0,
      shares: 0,
      created: "2024-12-12",
    },
  ],
  instagram: [
    {
      id: 1,
      caption:
        "Behind the scenes at our latest product demo! 🚀 #SaaS #ProductDemo #Innovation",
      image: "/api/placeholder/400/400",
      status: "Published",
      likes: 456,
      comments: 23,
      shares: 12,
      reach: 2340,
      created: "2024-12-09",
    },
    {
      id: 2,
      caption:
        "Customer success story: How TechCorp increased their lead conversion by 300% using our platform 📈 #CustomerSuccess #B2B",
      image: "/api/placeholder/400/400",
      status: "Scheduled",
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0,
      created: "2024-12-13",
    },
  ],
};

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState("google");
  const [newGoogleAd, setNewGoogleAd] = useState({
    name: "",
    budget: "",
    keywords: "",
    description: "",
  });
  const [newLinkedInPost, setNewLinkedInPost] = useState({
    title: "",
    content: "",
  });
  const [newInstagramPost, setNewInstagramPost] = useState({
    caption: "",
    image: null,
  });

  const generateAd = () => {
    setNewGoogleAd({
      name: "AI-Generated SaaS Lead Campaign",
      budget: "3000",
      keywords: "saas, crm software, business automation, lead generation",
      description:
        "Transform your business with our cutting-edge SaaS platform. Increase productivity by 300% and streamline your operations. Start your free trial today!",
    });
  };

  const CampaignCard = ({ campaign, type }) => (
    <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-300 group">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white break-words">
              {campaign.name || campaign.title}
            </h3>
            {type === "google" && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Created: {campaign.created}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <Badge
              variant={
                campaign.status === "Active" || campaign.status === "Published"
                  ? "default"
                  : campaign.status === "Paused"
                  ? "secondary"
                  : "outline"
              }
            >
              {campaign.status}
            </Badge>
            <div className="flex space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="p-2">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                {campaign.status === "Active" ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {type === "google" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
            <div className="text-center p-2 sm:p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
              <div className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white">
                {campaign.impressions.toLocaleString()}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Impressions
              </div>
            </div>
            <div className="text-center p-2 sm:p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
              <div className="text-sm sm:text-lg font-bold text-blue-600">
                {campaign.clicks.toLocaleString()}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Clicks
              </div>
            </div>
            <div className="text-center p-2 sm:p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
              <div className="text-sm sm:text-lg font-bold text-green-600">
                {campaign.conversions}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Conversions
              </div>
            </div>
            <div className="text-center p-2 sm:p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
              <div className="text-sm sm:text-lg font-bold text-purple-600">
                {campaign.ctr}%
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                CTR
              </div>
            </div>
          </div>
        )}

        {type === "linkedin" && (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 break-words">
              {campaign.content}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4">
              <div className="text-center p-2 rounded bg-white/50 dark:bg-slate-700/50">
                <div className="text-sm font-bold text-blue-600">
                  {campaign.engagement}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Engagement
                </div>
              </div>
              <div className="text-center p-2 rounded bg-white/50 dark:bg-slate-700/50">
                <div className="text-sm font-bold text-green-600">
                  {campaign.reach.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Reach
                </div>
              </div>
              <div className="text-center p-2 rounded bg-white/50 dark:bg-slate-700/50">
                <div className="text-sm font-bold text-purple-600">
                  {campaign.clicks}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Clicks
                </div>
              </div>
              <div className="text-center p-2 rounded bg-white/50 dark:bg-slate-700/50">
                <div className="text-sm font-bold text-orange-600">
                  {campaign.shares}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Shares
                </div>
              </div>
            </div>
          </>
        )}

        {type === "instagram" && (
          <>
            <div className="flex flex-col sm:flex-row sm:space-x-4 gap-3 sm:gap-0 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 break-words">
                  {campaign.caption}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              <div className="text-center p-2 rounded bg-white/50 dark:bg-slate-700/50">
                <div className="text-sm font-bold text-red-600">
                  {campaign.likes}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Likes
                </div>
              </div>
              <div className="text-center p-2 rounded bg-white/50 dark:bg-slate-700/50">
                <div className="text-sm font-bold text-blue-600">
                  {campaign.comments}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Comments
                </div>
              </div>
              <div className="text-center p-2 rounded bg-white/50 dark:bg-slate-700/50">
                <div className="text-sm font-bold text-green-600">
                  {campaign.shares}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Shares
                </div>
              </div>
              <div className="text-center p-2 rounded bg-white/50 dark:bg-slate-700/50">
                <div className="text-sm font-bold text-purple-600">
                  {campaign.reach.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Reach
                </div>
              </div>
            </div>
          </>
        )}

        {type === "google" && (
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Budget: {campaign.budget} • Spent: {campaign.spent} • CPC:{" "}
              {campaign.cpc}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Campaigns
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Create and manage campaigns across Google Ads, LinkedIn, and
            Instagram
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border border-white/20">
          <TabsTrigger value="google" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Google Ads</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>LinkedIn Posts</span>
          </TabsTrigger>
          <TabsTrigger
            value="instagram"
            className="flex items-center space-x-2"
          >
            <Camera className="w-4 h-4" />
            <span>Instagram Posts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="google" className="space-y-6">
          <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                AI-Powered Ad Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adName">Campaign Name</Label>
                  <Input
                    id="adName"
                    value={newGoogleAd.name}
                    onChange={(e) =>
                      setNewGoogleAd({ ...newGoogleAd, name: e.target.value })
                    }
                    placeholder="Enter campaign name"
                    className="bg-white/50 dark:bg-slate-800/50 border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Daily Budget ($)</Label>
                  <Input
                    id="budget"
                    value={newGoogleAd.budget}
                    onChange={(e) =>
                      setNewGoogleAd({ ...newGoogleAd, budget: e.target.value })
                    }
                    placeholder="Enter daily budget"
                    className="bg-white/50 dark:bg-slate-800/50 border-white/20"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={newGoogleAd.keywords}
                  onChange={(e) =>
                    setNewGoogleAd({ ...newGoogleAd, keywords: e.target.value })
                  }
                  placeholder="Enter target keywords"
                  className="bg-white/50 dark:bg-slate-800/50 border-white/20"
                />
              </div>
              <div>
                <Label htmlFor="description">Ad Description</Label>
                <Textarea
                  id="description"
                  value={newGoogleAd.description}
                  onChange={(e) =>
                    setNewGoogleAd({
                      ...newGoogleAd,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter ad description"
                  className="bg-white/50 dark:bg-slate-800/50 border-white/20 min-h-20"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={generateAd}
                  variant="outline"
                  className="bg-white/50 dark:bg-slate-800/50 border-white/20 w-full sm:w-auto"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Ad
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-full sm:w-auto">
                  Create Campaign
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {mockCampaigns.google.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                type="google"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="linkedin" className="space-y-6">
          <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle>Create LinkedIn Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="postTitle">Post Title</Label>
                <Input
                  id="postTitle"
                  value={newLinkedInPost.title}
                  onChange={(e) =>
                    setNewLinkedInPost({
                      ...newLinkedInPost,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter engaging title"
                  className="bg-white/50 dark:bg-slate-800/50 border-white/20"
                />
              </div>
              <div>
                <Label htmlFor="postContent">Post Content</Label>
                <Textarea
                  id="postContent"
                  value={newLinkedInPost.content}
                  onChange={(e) =>
                    setNewLinkedInPost({
                      ...newLinkedInPost,
                      content: e.target.value,
                    })
                  }
                  placeholder="Write your LinkedIn post content..."
                  className="bg-white/50 dark:bg-slate-800/50 border-white/20 min-h-32"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="bg-white/50 dark:bg-slate-800/50 border-white/20"
                >
                  Save as Draft
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  Publish Post
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {mockCampaigns.linkedin.map((post) => (
              <CampaignCard key={post.id} campaign={post} type="linkedin" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-6">
          <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20">
            <CardHeader>
              <CardTitle>Create Instagram Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Upload Image</Label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center bg-white/50 dark:bg-slate-800/50">
                  <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Click to upload or drag and drop your image
                  </p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>
              <div>
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  value={newInstagramPost.caption}
                  onChange={(e) =>
                    setNewInstagramPost({
                      ...newInstagramPost,
                      caption: e.target.value,
                    })
                  }
                  placeholder="Write your Instagram caption with hashtags..."
                  className="bg-white/50 dark:bg-slate-800/50 border-white/20 min-h-24"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="bg-white/50 dark:bg-slate-800/50 border-white/20"
                >
                  Schedule Post
                </Button>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Publish Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {mockCampaigns.instagram.map((post) => (
              <CampaignCard key={post.id} campaign={post} type="instagram" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
