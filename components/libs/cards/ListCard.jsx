import { Card, CardContent } from "@/components/ui/card";
import { ListChecks, Calendar, Lock, Unlock, User } from "lucide-react";

const ListCard = ({ list }) => {
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
            <ListChecks className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                List Name
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {list.name}
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
                {formatDate(list.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <ListChecks className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Types
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {list.type}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            {list.access === "Public" ? (
              <Unlock className="w-5 h-5 text-blue-500 mt-1" />
            ) : list.access === "Private" ? (
              <Lock className="w-5 h-5 text-blue-500 mt-1" />
            ) : (
              <Lock className="w-5 h-5 text-gray-500 mt-1" />
            )}
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Access
              </p>
              <p
                className={`text-sm font-semibold ${
                  list.access === "Public"
                    ? "text-green-600"
                    : list.access === "Private"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {list.access ? list.access : "N/A"}
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
                {list.userKey}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <ListChecks className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                ID
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {list.id}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCard;
