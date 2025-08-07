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

const ContactPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [contactData, setContactData] = useState(null);
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
    const fetchContactData = async () => {
      try {
        setIsLoading(true);
        const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
        setUserId(userId);
        if (!userId) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`/api/crm/getContactById`, {
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
          throw new Error("Failed to fetch contact data");
        }

        const data = await response.json();
        if (!data) {
          router.push("/crm");
          return;
        }

        setContactData(data);
        setFormData(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
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
      const response = await fetch(`/api/crm/updateContact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: slug, userId, ...formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact");
      }

      const updatedData = await response.json();
      setContactData(updatedData);
      setIsEditing(false);
      toast.success("Contact updated successfully", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (err) {
      toast.error(err.message || "Failed to update contact", {
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
      const response = await fetch(`/api/crm/deleteContact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: slug, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      toast.success("Contact deleted successfully", {
        position: "top-right",
        autoClose: 5000,
      });
      router.push("/crm");
    } catch (err) {
      toast.error(err.message || "Failed to delete contact", {
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

  if (error || !contactData) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertDescription>{error || "Contact not found"}</AlertDescription>
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
                  your contact and remove the data from our servers.
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
            {contactData.name || "Unnamed Contact"}
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
                    placeholder="Contact name"
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
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Lead">Lead</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
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
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(contactData);
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
                    {contactData.Users?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </p>
                  <p>
                    {contactData.email ? (
                      <a
                        href={`mailto:${contactData.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {contactData.email}
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
                    {contactData.phone ? (
                      <a
                        href={`tel:${contactData.phone}`}
                        className="text-blue-500 hover:underline"
                      >
                        {contactData.phone}
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
                    {contactData.linkedin ? (
                      <a
                        href={contactData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {contactData.linkedin}
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
                    {contactData.role || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Status
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {contactData.status || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Description
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {contactData.description || "N/A"}
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

export default ContactPage;
