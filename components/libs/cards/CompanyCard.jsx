import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Calendar,
  Globe,
  Linkedin,
  Users,
  TrendingUp,
  DollarSign,
  MapPin,
  FileText,
  User,
} from "lucide-react";

const CompanyCard = ({ company }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));

  const formatRevenue = (revenue) =>
    revenue != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        }).format(revenue)
      : "N/A";

  return (
    <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-2">
            <Building2 className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Company Name
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {company.name}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Calendar className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Created At
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {formatDate(company.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Globe className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Website
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {company.website}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Linkedin className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                LinkedIn
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.linkedin ? (
                  <a
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {company.linkedin}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Users className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Size
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.size || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Stage
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.stage || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <DollarSign className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Revenue
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {formatRevenue(company.revenue)}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                City
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.city || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                State
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.state || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Country
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.country || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Postal Code
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.postal || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2 sm:col-span-2 lg:col-span-3">
            <FileText className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Description
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.description || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <User className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Owner ID
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.userKey}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Building2 className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                ID
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {company.id}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
