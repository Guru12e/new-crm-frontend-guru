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

const CompanyPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [companyData, setCompanyData] = useState(null);
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
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
        setUserId(userId);
        if (!userId) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`/api/crm/getCompanyById`, {
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
          throw new Error("Failed to fetch company data");
        }

        const data = await response.json();
        if (!data) {
          router.push("/crm");
          return;
        }

        setCompanyData(data);
        setFormData(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [slug, router]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData?.name?.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (
      formData?.website &&
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.website)
    ) {
      newErrors.website = "Valid website URL required";
      isValid = false;
    }

    if (
      formData?.linkedin &&
      !formData.linkedin.includes("https://www.linkedin.com/")
    ) {
      newErrors.linkedin = "Valid LinkedIn URL required";
      isValid = false;
    }

    if (formData?.revenue && isNaN(parseFloat(formData.revenue))) {
      newErrors.revenue = "Revenue must be a valid number";
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
      const response = await fetch(`/api/crm/updateCompany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: slug, userId, ...formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update company");
      }

      const updatedData = await response.json();
      setCompanyData(updatedData);
      setIsEditing(false);
      toast.success("Company updated successfully", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (err) {
      toast.error(err.message || "Failed to update company", {
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
      const response = await fetch(`/api/crm/deleteCompany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: slug, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete company");
      }

      toast.success("Company deleted successfully", {
        position: "top-right",
        autoClose: 5000,
      });
      router.push("/crm");
    } catch (err) {
      toast.error(err.message || "Failed to delete company", {
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !companyData) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertDescription>{error || "Company not found"}</AlertDescription>
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
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          <Dialog>
            <DialogTrigger>
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
                  your account and remove your data from our servers.
                </DialogDescription>
                <div className="flex justify-end mt-4">
                  <DialogClose>
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
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            {companyData.name}
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
                    placeholder="Company name"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <ErrorMessage error={errors.name} id="name-error" />
                </div>
                <div>
                  <Label
                    htmlFor="industry"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Industry
                  </Label>
                  <Select
                    value={formData?.industry || ""}
                    onValueChange={(value) =>
                      handleSelectChange("industry", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                        errors.industry ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage error={errors.industry} id="industry-error" />
                </div>
                <div>
                  <Label
                    htmlFor="website"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Website
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData?.website || ""}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                      errors.website ? "border-red-500" : ""
                    }`}
                    placeholder="https://example.com"
                    aria-invalid={!!errors.website}
                    aria-describedby={
                      errors.website ? "website-error" : undefined
                    }
                  />
                  <ErrorMessage error={errors.website} id="website-error" />
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
                    htmlFor="size"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Size
                  </Label>
                  <Select
                    value={formData?.size || ""}
                    onValueChange={(value) => handleSelectChange("size", value)}
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                        errors.size ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select Company Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">
                        201-1000 employees
                      </SelectItem>
                      <SelectItem value="1001+">1001+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage error={errors.size} id="size-error" />
                </div>
                <div>
                  <Label
                    htmlFor="stage"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Stage
                  </Label>
                  <Select
                    value={formData?.stage || ""}
                    onValueChange={(value) =>
                      handleSelectChange("stage", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                        errors.stage ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prospect">Prospect</SelectItem>
                      <SelectItem value="Lead">Lead</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Churned">Churned</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage error={errors.stage} id="stage-error" />
                </div>
                <div>
                  <Label
                    htmlFor="revenue"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Revenue
                  </Label>
                  <Input
                    id="revenue"
                    name="revenue"
                    type="text"
                    value={formData?.revenue || ""}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                      errors.revenue ? "border-red-500" : ""
                    }`}
                    placeholder="Annual revenue (e.g., 1000000)"
                    aria-invalid={!!errors.revenue}
                    aria-describedby={
                      errors.revenue ? "revenue-error" : undefined
                    }
                  />
                  <ErrorMessage error={errors.revenue} id="revenue-error" />
                </div>
                <div>
                  <Label
                    htmlFor="city"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData?.city || ""}
                    onChange={handleInputChange}
                    className="bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="state"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    State
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData?.state || ""}
                    onChange={handleInputChange}
                    className="bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="country"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData?.country || ""}
                    onChange={handleInputChange}
                    className="bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    placeholder="Country"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="postal"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Postal Code
                  </Label>
                  <Input
                    id="postal"
                    name="postal"
                    value={formData?.postal || ""}
                    onChange={handleInputChange}
                    className="bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    placeholder="Postal code"
                  />
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
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(companyData);
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
                    {companyData.Users.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Industry
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {companyData.industry || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Website
                  </p>
                  <p>
                    {companyData.website ? (
                      <a
                        href={companyData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {companyData.website}
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
                    {companyData.linkedin ? (
                      <a
                        href={companyData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {companyData.linkedin}
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
                    Size
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {companyData.size || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Stage
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {companyData.stage || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Revenue
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {companyData.revenue
                      ? `$${parseFloat(companyData.revenue).toLocaleString()}`
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    City
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {companyData.city || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    State
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {companyData.state || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Country
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {companyData.country || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Postal Code
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {companyData.postal || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Description
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {companyData.description || "N/A"}
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

export default CompanyPage;
