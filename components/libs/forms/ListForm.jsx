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
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const ListForm = ({ className }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    access: "",
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

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      type: prev.type === type ? "" : type,
    }));
    setErrors((prev) => ({ ...prev, type: "" }));
  };

  const handleAccessChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      access: prev.access === value ? "" : value,
    }));
    setErrors((prev) => ({ ...prev, access: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "List name is required";
      isValid = false;
    }

    if (
      formData.type.length > 0 &&
      !["Company", "Contact", "Lead"].includes(formData.type)
    ) {
      newErrors.type = "Invalid type selected";
      isValid = false;
    }

    if (formData.access && !["Public", "Private"].includes(formData.access)) {
      newErrors.access = "Invalid access value";
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

      const req = await fetch("/api/crm/addList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: parseInt(userId),
        }),
      });

      if (req.status === 200) {
        toast.success("List Added", {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData({
          name: "",
          type: [],
          access: "",
        });

        const sheet = document.querySelector("[data-state='open']");
        if (sheet) {
          sheet.dispatchEvent(new Event("close"));
        }
      } else {
        throw new Error("Failed to add list");
      }
    } catch (error) {
      toast.error("Error in Adding List", {
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
        <SheetTitle>Add New List</SheetTitle>
        <SheetDescription>
          Fill in the details to add a new list to the CRM.
        </SheetDescription>
      </SheetHeader>
      <div className="flex-1 h-full px-2 overflow-y-auto py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="name"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              List Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="e.g., Marketing Campaign List"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            <ErrorMessage error={errors.name} id="name-error" />
          </div>
          <div>
            <Label className="mb-2 text-slate-700 dark:text-slate-300">
              Type
            </Label>
            <div className="flex flex-col gap-2">
              {["Company", "Contact", "Lead"].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    id={`type-${type}`}
                    checked={formData.type == type}
                    onChange={() => handleTypeChange(type)}
                    className="w-4 h-4"
                  />
                  <Label
                    htmlFor={`type-${type}`}
                    className="text-slate-700 dark:text-slate-300"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
            <ErrorMessage error={errors.type} id="type-error" />
          </div>
          <div>
            <Label className="mb-2 text-slate-700 dark:text-slate-300">
              Access
            </Label>
            <div className="flex flex-col gap-2">
              {["Public", "Private"].map((option) => (
                <div key={option} className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    id={`access-${option}`}
                    checked={formData.access === option}
                    onChange={() => handleAccessChange(option)}
                    className="w-4 h-4"
                  />
                  <Label
                    htmlFor={`access-${option}`}
                    className="text-slate-700 dark:text-slate-300"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            <ErrorMessage error={errors.access} id="access-error" />
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
          Add List
        </Button>
      </div>
    </SheetContent>
  );
};

export default ListForm;
