import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Briefcase,
  Building2,
  UserCheck,
  FileText,
  User,
} from "lucide-react";

const LeadCard = ({ lead }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));

  return (
    <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Name
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {lead.name || "N/A"}
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
                <a
                  href={`mailto:${lead.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {lead.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Phone className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Phone
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="text-blue-500 hover:underline"
                  >
                    {lead.phone}
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
                {lead.linkedin ? (
                  <a
                    href={lead.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {lead.linkedin}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Briefcase className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Role
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {lead.role || "N/A"}
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
                {lead.company || "N/A"}
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
                {lead.owner || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <UserCheck className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Status
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {lead.status || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2 sm:col-span-2">
            <FileText className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Description
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {lead.description || "N/A"}
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
                {lead.userKey}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                ID
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {lead.id}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadCard;
