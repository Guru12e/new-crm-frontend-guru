"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  LucideMail,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/crm/deals/${deal.id}`)}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 cursor-pointer"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600" />

      <CardHeader className="flex flex-col items-start space-y-4 p-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold">
              $
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {deal.title || "Untitled Deal"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {deal.Companies.name || "Company N/A"}
              </p>
            </div>
          </div>

          <Badge variant="secondary" className="text-xs">
            {deal.stage || "N/A"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <InfoItem
            icon={<DollarSign className="h-4 w-4 text-blue-500" />}
            label="Amount"
            value={deal.amount || "N/A"}
          />

          <InfoItem
            icon={<Calendar className="h-4 w-4 text-blue-500" />}
            label="Created At"
            value={formatDate(deal.created_at)}
          />

          <InfoItem
            icon={<Calendar className="h-4 w-4 text-blue-500" />}
            label="Close Date"
            value={formatCloseDate(deal.closeDate)}
          />

          <InfoItem
            icon={<Contact className="h-4 w-4 text-blue-500" />}
            label="Contacts"
            value={deal.Contacts.join(", ") || "N/A"}
          />

          <InfoItem
            icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
            label="Lead Name"
            value={deal.Leads.name || "N/A"}
          />

          <InfoItem
            icon={<LucideMail className="h-4 w-4 text-blue-500" />}
            label="Lead Email"
            value={deal.Leads.email || "N/A"}
          />

          <InfoItem
            icon={<Tag className="h-4 w-4 text-blue-500" />}
            label="Type"
            value={deal.type || "N/A"}
          />

          <InfoItem
            icon={<Star className="h-4 w-4 text-blue-500" />}
            label="Priority"
            value={deal.priority || "N/A"}
          />

          <InfoItem
            icon={<UserCheck className="h-4 w-4 text-blue-500" />}
            label="Owner"
            value={deal.owner || "N/A"}
          />

          <InfoItem
            icon={<ListChecks className="h-4 w-4 text-blue-500" />}
            label="Pipeline"
            value={deal.pipeline || "N/A"}
          />

          <InfoItem
            icon={<User className="h-4 w-4 text-blue-500" />}
            label="Owner Name"
            value={deal.Users.name || "N/A"}
          />
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Description
          </p>
          <p className="text-sm text-gray-900 dark:text-gray-200 line-clamp-3">
            {deal.description || "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-2">
    {icon}
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm text-gray-900 dark:text-white truncate">{value}</p>
    </div>
  </div>
);

export default DealCard;
