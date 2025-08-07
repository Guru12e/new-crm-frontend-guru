"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, User } from "lucide-react";
import { FiLinkedin } from "react-icons/fi";
import { useRouter } from "next/navigation";

const ContactCard = ({ contact }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  const router = useRouter();

  return (
    <Card
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 cursor-pointer"
      onClick={() => router.push(`/crm/contacts/${contact.id}`)}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600" />

      <CardHeader className="flex flex-col items-start space-y-4 p-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold">
              {contact.name?.charAt(0) || "C"}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {contact.name || "N/A"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {contact.role || "No role specified"}
              </p>
            </div>
          </div>

          <Badge variant="secondary" className="text-xs">
            {contact.status || "Unknown"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-5">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-blue-500" />
            <a
              href={`mailto:${contact.email}`}
              className="truncate text-blue-600 hover:underline dark:text-blue-400"
            >
              {contact.email || "N/A"}
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-blue-500" />
            {contact.phone ? (
              <a
                href={`tel:${contact.phone}`}
                className="truncate text-blue-600 hover:underline dark:text-blue-400"
              >
                {contact.phone}
              </a>
            ) : (
              <span>N/A</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <FiLinkedin className="h-4 w-4 text-blue-500" />
            {contact.linkedin ? (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-blue-600 hover:underline dark:text-blue-400"
              >
                Profile
              </a>
            ) : (
              <span>N/A</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-blue-500" />
            <span>{contact.Users.name || "N/A"}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>
              {contact.created_at ? formatDate(contact.created_at) : "N/A"}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Description
          </p>
          <p className="text-sm text-gray-900 dark:text-gray-200 line-clamp-3">
            {contact.description || "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
