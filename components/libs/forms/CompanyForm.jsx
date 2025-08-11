"use client";

import React, { useState } from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";

const CompanyForm = ({ className, listAdd, list }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    linkedin: "",
    size: "",
    stage: "",
    revenue: "",
    city: "",
    state: "",
    country: "",
    postal: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (
      formData.website &&
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.website)
    ) {
      newErrors.website = "Valid website URL required";
      isValid = false;
    }

    if (
      formData.linkedin &&
      !formData.linkedin.includes("https://www.linkedin.com/")
    ) {
      newErrors.linkedin = "Valid LinkedIn URL required";
      isValid = false;
    }

    if (formData.revenue && isNaN(parseFloat(formData.revenue))) {
      newErrors.revenue = "Revenue must be a valid number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;
      if (!userId) {
        toast.error("User not authenticated", {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      const req = await fetch("/api/crm/addCompany", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: parseInt(userId) }),
      });

      if (req.status === 200) {
        toast.success("Company Added", {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData({
          name: "",
          industry: "",
          website: "",
          linkedin: "",
          size: "",
          stage: "",
          revenue: "",
          city: "",
          state: "",
          country: "",
          postal: "",
          description: "",
        });

        if (listAdd) {
          const newContact = await req.json();
          console.log(newContact);
          const updateList = await fetch("/api/crm/updateList", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: newContact.id,
              userId: userId,
              type: "Contact",
              listId: list,
            }),
          });
        }
        const sheet = document.querySelector("[data-state='open']");
        if (sheet) {
          sheet.dispatchEvent(new Event("close"));
        }
      } else {
        throw new Error("Failed to add company");
      }
    } catch (error) {
      toast.error("Error in Adding Company", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SheetContent
      className={`px-3 py-2 max-w-[500px] ${className}`}
      side="right"
    >
      <SheetHeader>
        <SheetTitle>Add New Company</SheetTitle>
        <SheetDescription>
          Fill in the details to add a new company to the CRM.
        </SheetDescription>
      </SheetHeader>
      <div className="flex-1 h-full px-2 overflow-y-auto py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="name"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
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
              htmlFor="website"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Website
            </Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => updateFormData("website", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.website ? "border-red-500" : ""
              }`}
              placeholder="https://example.com"
              aria-invalid={!!errors.website}
              aria-describedby={errors.website ? "website-error" : undefined}
            />
            <ErrorMessage error={errors.website} id="website-error" />
          </div>
          <div>
            <Label
              htmlFor="linkedin"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={(e) => updateFormData("linkedin", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.linkedin ? "border-red-500" : ""
              }`}
              placeholder="LinkedIn profile URL"
              aria-invalid={!!errors.linkedin}
              aria-describedby={errors.linkedin ? "linkedin-error" : undefined}
            />
            <ErrorMessage error={errors.linkedin} id="linkedin-error" />
          </div>
          <div>
            <Label
              htmlFor="industry"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Industry
            </Label>
            <Select
              value={formData.industry}
              onValueChange={(value) => updateFormData("industry", value)}
            >
              <SelectTrigger
                className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                  errors.industry ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.industry}
                aria-describedby={
                  errors.industry ? "industry-error" : undefined
                }
              >
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.industry} id="industry-error" />
          </div>
          <div>
            <Label
              htmlFor="size"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Company Size
            </Label>
            <Select
              value={formData.size}
              onValueChange={(value) => updateFormData("size", value)}
            >
              <SelectTrigger
                className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                  errors.size ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.size}
                aria-describedby={errors.size ? "size-error" : undefined}
              >
                <SelectValue placeholder="Select Company Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-1000">201-1000 employees</SelectItem>
                <SelectItem value="1001+">1001+ employees</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.size} id="size-error" />
          </div>
          <div>
            <Label
              htmlFor="stage"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Stage
            </Label>
            <Select
              value={formData.stage}
              onValueChange={(value) => updateFormData("stage", value)}
            >
              <SelectTrigger
                className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                  errors.stage ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.stage}
                aria-describedby={errors.stage ? "stage-error" : undefined}
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
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Revenue
            </Label>
            <Input
              id="revenue"
              type="text"
              value={formData.revenue}
              onChange={(e) => updateFormData("revenue", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.revenue ? "border-red-500" : ""
              }`}
              placeholder="Annual revenue (e.g., 1000000)"
              aria-invalid={!!errors.revenue}
              aria-describedby={errors.revenue ? "revenue-error" : undefined}
            />
            <ErrorMessage error={errors.revenue} id="revenue-error" />
          </div>
          <div>
            <Label
              htmlFor="city"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              City
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => updateFormData("city", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.city ? "border-red-500" : ""
              }`}
              placeholder="City"
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "city-error" : undefined}
            />
            <ErrorMessage error={errors.city} id="city-error" />
          </div>
          <div>
            <Label
              htmlFor="state"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              State
            </Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => updateFormData("state", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.state ? "border-red-500" : ""
              }`}
              placeholder="State"
              aria-invalid={!!errors.state}
              aria-describedby={errors.state ? "state-error" : undefined}
            />
            <ErrorMessage error={errors.state} id="state-error" />
          </div>
          <div>
            <Label
              htmlFor="country"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Country
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => updateFormData("country", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.country ? "border-red-500" : ""
              }`}
              placeholder="Country"
              aria-invalid={!!errors.country}
              aria-describedby={errors.country ? "country-error" : undefined}
            />
            <ErrorMessage error={errors.country} id="country-error" />
          </div>
          <div>
            <Label
              htmlFor="postal"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Postal Code
            </Label>
            <Input
              id="postal"
              value={formData.postal}
              onChange={(e) => updateFormData("postal", e.target.value)}
              className={`bg-white/50 dark:bg-slate-808/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.postal ? "border-red-500" : ""
              }`}
              placeholder="Postal code"
              aria-invalid={!!errors.postal}
              aria-describedby={errors.postal ? "postal-error" : undefined}
            />
            <ErrorMessage error={errors.postal} id="postal-error" />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              className={`bg-white/50 dark:bg-slate-808/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder="Enter a description"
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />
            <ErrorMessage error={errors.description} id="description-error" />
          </div>
        </form>
      </div>
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className={`w-full ${
            loading
              ? "bg-gray-400 hover:bg-gray-500"
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          } text-white`}
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Add Company
        </Button>
      </div>
    </SheetContent>
  );
};

export default CompanyForm;
