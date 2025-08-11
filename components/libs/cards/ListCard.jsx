"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListChecks, Calendar, Lock, Unlock, User } from "lucide-react";
import { useRouter } from "next/navigation";

const ListCard = ({ list }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));

  const router = useRouter();

  return (
    <Card
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 cursor-pointer"
      onClick={() => router.push(`/crm/lists/${list.id}`)}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />

      <CardHeader className="flex items-center justify-between p-5">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl font-bold">
            L
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {list.name || "Untitled List"}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {list.type || "Type N/A"}
            </p>
          </div>
        </div>

        <Badge
          variant="secondary"
          className={`text-xs ${
            list.access === "Public"
              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
              : list.access === "Private"
              ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {list.access || "Unknown"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <InfoItem
            icon={<Calendar className="h-4 w-4 text-purple-500" />}
            label="Created At"
            value={formatDate(list.created_at)}
          />

          <InfoItem
            icon={<ListChecks className="h-4 w-4 text-purple-500" />}
            label="Type"
            value={list.type || "N/A"}
          />

          <InfoItem
            icon={<User className="h-4 w-4 text-purple-500" />}
            label="Owner Name"
            value={list.Users.name || "N/A"}
          />
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

export default ListCard;
