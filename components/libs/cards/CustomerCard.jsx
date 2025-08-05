import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Calendar,
  Globe,
  Linkedin,
  Mail,
  Users,
  TrendingUp,
  DollarSign,
  MapPin,
  FileText,
  User,
} from "lucide-react";

const CustomerCard = ({ customer }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));

  return (
    <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-2">
            <Building2 className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Customer Name
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {customer.name}
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
                {formatDate(customer.created_at)}
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
                {customer.website ? (
                  <a
                    href={customer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {customer.website}
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
                {customer.linkedin ? (
                  <a
                    href={customer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {customer.linkedin}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Mail className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Email
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {customer.email ? (
                  <a
                    href={`mailto:${customer.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {customer.email}
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
                {customer.size || "N/A"}
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
                {customer.stage || "N/A"}
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
                {customer.revenue || "N/A"}
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
                {customer.city || "N/A"}
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
                {customer.state || "N/A"}
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
                {customer.country || "N/A"}
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
                {customer.postal || "N/A"}
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
                {customer.description || "N/A"}
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
                {customer.userKey}
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
                {customer.id}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
