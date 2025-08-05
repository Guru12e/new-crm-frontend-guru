import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Calendar,
  Building2,
  Contact,
  TrendingUp,
  Tag,
  Star,
  UserCheck,
  ListChecks,
  FileText,
  User,
} from "lucide-react";

const DealCard = ({ deal }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));

  const formatCloseDate = (date) =>
    date
      ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
          new Date(date)
        )
      : "N/A";

  return (
    <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-2">
            <DollarSign className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Deal Title
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {deal.title}
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
                {formatDate(deal.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Building2 className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Company
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {deal.companyName || deal.company || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Contact className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Contacts
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {deal.contactNames?.length > 0
                  ? deal.contactNames.join(", ")
                  : deal.contacts?.length > 0
                  ? deal.contacts.join(", ")
                  : "None"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Lead
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {deal.leadName || deal.leadEmail || deal.leads || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <DollarSign className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Amount
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {deal.amount || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Calendar className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Close Date
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {formatCloseDate(deal.closeDate)}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Tag className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Type
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {deal.type || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Star className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Priority
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {deal.priority || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <UserCheck className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Owner
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {deal.owner || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <ListChecks className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Pipeline
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {deal.pipeline || "N/A"}
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
                {deal.stage || "N/A"}
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
                {deal.description || "N/A"}
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
                {deal.userKey}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <DollarSign className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                ID
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {deal.id}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealCard;
