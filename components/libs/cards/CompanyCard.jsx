"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Calendar,
  Globe,
  Users,
  TrendingUp,
  DollarSign,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FiLinkedin } from "react-icons/fi";

const CompanyCard = ({ company }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
      new Date(date)
    );

  const formatRevenue = (revenue) =>
    revenue != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        }).format(revenue)
      : "N/A";

  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/crm/companies/${company.id}`)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600" />

      <CardHeader className="flex flex-col items-start space-y-3 p-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
              {company.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {company.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {company.city && company.country
                  ? `${company.city}, ${company.country}`
                  : "Location N/A"}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {company.stage || "N/A"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-5">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">
              {formatDate(company.created_at)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span>{company.size || "N/A"}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-blue-500" />
            <HoverCard>
              <HoverCardTrigger asChild>
                <a
                  href={company.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-blue-600 hover:underline dark:text-blue-400"
                >
                  {company.website ? "Visit" : "N/A"}
                </a>
              </HoverCardTrigger>
              {company.website && (
                <HoverCardContent className="text-xs">
                  {company.website}
                </HoverCardContent>
              )}
            </HoverCard>
          </div>

          <div className="flex items-center space-x-2">
            <FiLinkedin className="h-4 w-4 text-blue-500" />
            <HoverCard>
              <HoverCardTrigger asChild>
                <a
                  href={company.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-blue-600 hover:underline dark:text-blue-400"
                >
                  {company.linkedin ? "Profile" : "N/A"}
                </a>
              </HoverCardTrigger>
              {company.linkedin && (
                <HoverCardContent className="text-xs">
                  {company.linkedin}
                </HoverCardContent>
              )}
            </HoverCard>
          </div>

          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-blue-500" />
            <span>{formatRevenue(company.revenue)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span>{company.stage || "N/A"}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Description
          </p>
          <p className="text-sm text-gray-900 dark:text-gray-200 line-clamp-3">
            {company.description || "N/A"}
          </p>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-blue-500" />
            <span>{company.Users.name || "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
