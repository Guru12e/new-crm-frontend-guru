"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Trash2, Edit2, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LeadPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [leadData, setLeadData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);

  const ErrorMessage = ({ error, id }) =>
    error && (
      <div
        className="flex items-center gap-1 text-red-500 text-sm mt-1"
        role="alert"
      >
        <AlertCircle className="w-4 h-4" />
        {error}
      </div>
    );

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        setIsLoading(true);
        const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
        setUserId(userId);
        if (!userId) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`/api/crm/getLeadById`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: slug, userId }),
        });

        if (response.status === 500) {
          router.push("/crm");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch lead data");
        }

        const data = await response.json();
        if (!data) {
          router.push("/crm");
          return;
        }

        setLeadData(data);
        setFormData(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeadData();
  }, [slug, router]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData?.name?.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email required";
      isValid = false;
    }

    if (formData?.phone && !/^\+?[\d\s-]{7,}$/.test(formData.phone)) {
      newErrors.phone = "Valid phone number required";
      isValid = false;
    }

    if (
      formData?.linkedin &&
      !formData.linkedin.includes("https://www.linkedin.com/")
    ) {
      newErrors.linkedin = "Valid LinkedIn URL required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value || "" } : prev));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value || "" } : prev));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleUpdate = async () => {
    if (!formData || !validateForm()) {
      toast.error("Please fix form errors", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/crm/updateLead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: slug, userId, ...formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update lead");
      }

      const updatedData = await response.json();
      setLeadData(updatedData);
      setIsEditing(false);
      toast.success("Lead updated successfully", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (err) {
      toast.error(err.message || "Failed to update lead", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/crm/deleteLead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: slug, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete lead");
      }

      toast.success("Lead deleted successfully", {
        position: "top-right",
        autoClose: 5000,
      });
      router.push("/crm");
    } catch (err) {
      toast.error(err.message || "Failed to delete lead", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !leadData) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertDescription>{error || "Lead not found"}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => router.push("/crm")}
          className="flex items-center gap-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-3">
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="bg-red-500 hover:bg-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your lead and remove the data from our servers.
                </DialogDescription>
                <div className="flex justify-end mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="mr-2">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            {leadData.name || "Unnamed Lead"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            {isEditing ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData?.name || ""}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    placeholder="Lead name"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <ErrorMessage error={errors.name} id="name-error" />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData?.email || ""}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Email address"
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  <ErrorMessage error={errors.email} id="email-error" />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData?.phone || ""}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    placeholder="Phone number"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  <ErrorMessage error={errors.phone} id="phone-error" />
                </div>
                <div>
                  <Label
                    htmlFor="linkedin"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData?.linkedin || ""}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                      errors.linkedin ? "border-red-500" : ""
                    }`}
                    placeholder="LinkedIn profile URL"
                    aria-invalid={!!errors.linkedin}
                    aria-describedby={
                      errors.linkedin ? "linkedin-error" : undefined
                    }
                  />
                  <ErrorMessage error={errors.linkedin} id="linkedin-error" />
                </div>
                <div>
                  <Label
                    htmlFor="role"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Role
                  </Label>
                  <Select
                    value={formData?.role || ""}
                    onValueChange={(value) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                        errors.role ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CEO">CEO</SelectItem>
                      <SelectItem value="CTO">CTO</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage error={errors.role} id="role-error" />
                </div>
                <div>
                  <Label
                    htmlFor="company"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData?.company || ""}
                    onChange={handleInputChange}
                    className="bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="status"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Status
                  </Label>
                  <Select
                    value={formData?.status || ""}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                        errors.status ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                      <SelectItem value="Won">Won</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage error={errors.status} id="status-error" />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="description"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData?.description || ""}
                    onChange={handleInputChange}
                    className="bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    placeholder="Enter a description"
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <Button
                    onClick={handleUpdate}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(leadData);
                      setErrors({});
                    }}
                    className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Associated User
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {leadData.Users?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </p>
                  <p>
                    {leadData.email ? (
                      <a
                        href={`mailto:${leadData.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {leadData.email}
                      </a>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400">
                        N/A
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Phone
                  </p>
                  <p>
                    {leadData.phone ? (
                      <a
                        href={`tel:${leadData.phone}`}
                        className="text-blue-500 hover:underline"
                      >
                        {leadData.phone}
                      </a>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400">
                        N/A
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    LinkedIn
                  </p>
                  <p>
                    {leadData.linkedin ? (
                      <a
                        href={leadData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {leadData.linkedin}
                      </a>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400">
                        N/A
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Role
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {leadData.role || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Company
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {leadData.company || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Owner
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {leadData.owner || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Status
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {leadData.status || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Description
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {leadData.description || "N/A"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadPage;
