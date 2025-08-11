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
import PhoneInput from "../PhoneInput";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = ({ className, listAdd, list }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    linkedin: "",
    role: "",
    status: "",
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (
      formData.phone &&
      !/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Invalid phone number format";
      isValid = false;
    }

    if (
      formData.linkedin &&
      !formData.linkedin.includes("https://www.linkedin.com/")
    ) {
      newErrors.linkedin = "Valid LinkedIn URL required";
      isValid = false;
    }

    if (
      formData.status &&
      !["active", "inactive", "at-risk"].includes(formData.status)
    ) {
      newErrors.status = "Invalid status value";
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

      const req = await fetch("/api/crm/addContacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: parseInt(userId) }),
      });

      if (req.status === 200) {
        toast.success("Contact Added", {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData({
          email: "",
          name: "",
          phone: "",
          linkedin: "",
          role: "",
          status: "",
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
        throw new Error("Failed to add contact");
      }
    } catch (error) {
      toast.error("Error in Adding Contact", {
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
        <SheetTitle>Add New Contact</SheetTitle>
        <SheetDescription>
          Fill in the details to add a new contact to the CRM.
        </SheetDescription>
      </SheetHeader>
      <div className="flex-1 h-full px-2 overflow-y-auto py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="email"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="contact@email.com"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <ErrorMessage error={errors.email} id="email-error" />
          </div>
          <div>
            <Label
              htmlFor="name"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Contact full name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            <ErrorMessage error={errors.name} id="name-error" />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Phone
            </Label>
            <PhoneInput
              value={formData.phone}
              onChange={(value) => updateFormData("phone", value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="Enter phone number"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            <ErrorMessage error={errors.phone} id="phone-error" />
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
              htmlFor="role"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Role
            </Label>
            <Input
              id="role"
              type="text"
              value={formData.role}
              onChange={(e) => updateFormData("role", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.role ? "border-red-500" : ""
              }`}
              placeholder="Current role or position"
              aria-invalid={!!errors.role}
              aria-describedby={errors.role ? "role-error" : undefined}
            />
            <ErrorMessage error={errors.role} id="role-error" />
          </div>
          <div>
            <Label
              htmlFor="status"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => updateFormData("status", value)}
            >
              <SelectTrigger
                className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                  errors.status ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.status}
                aria-describedby={errors.status ? "status-error" : undefined}
              >
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.status} id="status-error" />
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
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
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
          Add Contact
        </Button>
      </div>
    </SheetContent>
  );
};

export default ContactForm;
