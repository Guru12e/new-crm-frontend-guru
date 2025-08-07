"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Calendar,
  Globe,
  Mail,
  Users,
  DollarSign,
  MapPin,
} from "lucide-react";
import { FiLinkedin } from "react-icons/fi";
import { useRouter } from "next/navigation";

const CustomerCard = ({ customer }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));

  const router = useRouter();

  return (
    <Card
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 cursor-pointer"
      onClick={() => router.push(`/crm/customers/${customer.id}`)}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600" />

      <CardHeader className="flex flex-col items-start space-y-4 p-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold">
              {customer.name?.charAt(0) || "C"}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {customer.name || "N/A"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {customer.city && customer.country
                  ? `${customer.city}, ${customer.country}`
                  : "Location N/A"}
              </p>
            </div>
          </div>

          <Badge variant="secondary" className="text-xs">
            {customer.stage || "N/A"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <InfoItem
            icon={<Calendar className="h-4 w-4 text-blue-500" />}
            label="Created At"
            value={formatDate(customer.created_at)}
          />

          <InfoItem
            icon={<Globe className="h-4 w-4 text-blue-500" />}
            label="Website"
            value={
              customer.website ? (
                <a
                  href={customer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Visit
                </a>
              ) : (
                "N/A"
              )
            }
          />

          <InfoItem
            icon={<FiLinkedin className="h-4 w-4 text-blue-500" />}
            label="LinkedIn"
            value={
              customer.linkedin ? (
                <a
                  href={customer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Profile
                </a>
              ) : (
                "N/A"
              )
            }
          />

          <InfoItem
            icon={<Mail className="h-4 w-4 text-blue-500" />}
            label="Email"
            value={
              customer.email ? (
                <a
                  href={`mailto:${customer.email}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {customer.email}
                </a>
              ) : (
                "N/A"
              )
            }
          />

          <InfoItem
            icon={<Users className="h-4 w-4 text-blue-500" />}
            label="Size"
            value={customer.size || "N/A"}
          />

          <InfoItem
            icon={<DollarSign className="h-4 w-4 text-blue-500" />}
            label="Revenue"
            value={customer.revenue || "N/A"}
          />

          <InfoItem
            icon={<MapPin className="h-4 w-4 text-blue-500" />}
            label="City"
            value={customer.city || "N/A"}
          />
          <InfoItem
            icon={<MapPin className="h-4 w-4 text-blue-500" />}
            label="State"
            value={customer.state || "N/A"}
          />
          <InfoItem
            icon={<MapPin className="h-4 w-4 text-blue-500" />}
            label="Country"
            value={customer.country || "N/A"}
          />
          <InfoItem
            icon={<MapPin className="h-4 w-4 text-blue-500" />}
            label="Postal Code"
            value={customer.postal || "N/A"}
          />

          <InfoItem
            icon={<Building2 className="h-4 w-4 text-blue-500" />}
            label="Owner Name"
            value={customer.Users.name || "N/A"}
          />
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Description
          </p>
          <p className="text-sm text-gray-900 dark:text-gray-200 line-clamp-3">
            {customer.description || "N/A"}
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

export default CustomerCard;
