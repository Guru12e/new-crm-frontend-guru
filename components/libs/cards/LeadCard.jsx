"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, Briefcase, User } from "lucide-react";
import { FiLinkedin } from "react-icons/fi";
import { useRouter } from "next/navigation";

const LeadCard = ({ lead }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  const router = useRouter();

  return (
    <Card
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 cursor-pointer"
      onClick={() => router.push(`/crm/leads/${lead.id}`)}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-blue-600" />

      <CardHeader className="flex flex-col items-start space-y-4 p-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-white text-lg font-bold">
              L
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {lead.name || "Unnamed Lead"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {lead.company || "Company N/A"}
              </p>
            </div>
          </div>

          <Badge variant="secondary" className="text-xs">
            {lead.status || "Unknown"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <InfoItem
            icon={<Mail className="h-4 w-4 text-green-500" />}
            label="Email"
            value={
              lead.email ? (
                <a
                  href={`mailto:${lead.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {lead.email}
                </a>
              ) : (
                "N/A"
              )
            }
          />

          <InfoItem
            icon={<Phone className="h-4 w-4 text-green-500" />}
            label="Phone"
            value={
              lead.phone ? (
                <a
                  href={`tel:${lead.phone}`}
                  className="text-blue-500 hover:underline"
                >
                  {lead.phone}
                </a>
              ) : (
                "N/A"
              )
            }
          />

          <InfoItem
            icon={<FiLinkedin className="h-4 w-4 text-green-500" />}
            label="LinkedIn"
            value={
              lead.linkedin ? (
                <a
                  href={lead.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Profile
                </a>
              ) : (
                "N/A"
              )
            }
          />

          <InfoItem
            icon={<Briefcase className="h-4 w-4 text-green-500" />}
            label="Role"
            value={lead.role || "N/A"}
          />

          <InfoItem
            icon={<Calendar className="h-4 w-4 text-green-500" />}
            label="Created At"
            value={formatDate(lead.created_at)}
          />

          <InfoItem
            icon={<User className="h-4 w-4 text-green-500" />}
            label="Owner Name"
            value={lead.Users.name || "N/A"}
          />
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Description
          </p>
          <p className="text-sm text-gray-900 dark:text-gray-200 line-clamp-3">
            {lead.description || "N/A"}
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

export default LeadCard;
