"use client";

import React, { useEffect, useState } from "react";
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
import MultiSelect from "../MultiSelect";

const DealForm = ({ className }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    contacts: [],
    leads: "",
    amount: "",
    closeDate: "",
    type: "",
    priority: "",
    owner: "",
    pipeline: "",
    stage: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))?.id;
        if (!userId) {
          console.log("User not authenticated");
          return;
        }
        const response = await fetch("/api/crm/getCompanies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: parseInt(userId) }),
        });
        if (response.ok) {
          const data = await response.json();
          setCompanies(data || []);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    const fetchContacts = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))?.id;
        if (!userId) {
          console.log("User not authenticated");
          return;
        }
        const response = await fetch("/api/crm/getContacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: parseInt(userId) }),
        });
        if (response.ok) {
          const data = await response.json();
          setContacts(data || []);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    const fetchLeads = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))?.id;

        if (!userId) {
          console.log("User not authenticated");
          return;
        }

        const response = await fetch("/api/crm/getLeads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: parseInt(userId) }),
        });

        if (response.ok) {
          const data = await response.json();
          setLeads(data || []);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchCompanies();
    fetchContacts();
    fetchLeads();
  }, []);

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

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (formData.amount && isNaN(parseFloat(formData.amount))) {
      newErrors.amount = "Amount must be a valid number";
      isValid = false;
    }

    if (formData.closeDate && isNaN(Date.parse(formData.closeDate))) {
      newErrors.closeDate = "Invalid date format";
      isValid = false;
    }

    if (
      formData.type &&
      !["new", "renewal", "expansion"].includes(formData.type)
    ) {
      newErrors.type = "Invalid type value";
      isValid = false;
    }

    if (
      formData.priority &&
      !["low", "medium", "high"].includes(formData.priority)
    ) {
      newErrors.priority = "Invalid priority value";
      isValid = false;
    }

    if (
      formData.pipeline &&
      !["sales", "marketing", "support"].includes(formData.pipeline)
    ) {
      newErrors.pipeline = "Invalid pipeline value";
      isValid = false;
    }

    if (
      formData.stage &&
      !["prospect", "qualification", "proposal", "closed"].includes(
        formData.stage
      )
    ) {
      newErrors.stage = "Invalid stage value";
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

      const req = await fetch("/api/crm/addDeal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          company:
            companies.filter((company) => company.name === formData.company)[0]
              .id || null,
          contacts: formData.contacts.map((id) => parseInt(id)),
          leads: leads.filter((lead) => lead.email === formData.leads)[0].id,
          userId: parseInt(userId),
        }),
      });

      if (req.status === 200) {
        toast.success("Deal Added", {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData({
          title: "",
          company: "",
          contacts: [],
          leads: "",
          amount: "",
          closeDate: "",
          type: "",
          priority: "",
          owner: "",
          pipeline: "",
          stage: "",
          description: "",
        });

        const sheet = document.querySelector("[data-state='open']");
        if (sheet) {
          sheet.dispatchEvent(new Event("close"));
        }
      } else {
        throw new Error("Failed to add deal");
      }
    } catch (error) {
      toast.error("Error in Adding Deal", {
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
        <SheetTitle>Add New Deal</SheetTitle>
        <SheetDescription>
          Fill in the details to add a new deal to the CRM.
        </SheetDescription>
      </SheetHeader>
      <div className="flex-1 h-full px-2 overflow-y-auto py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="title"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.title ? "border-red-500" : ""
              }`}
              placeholder="Deal title"
              required
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            <ErrorMessage error={errors.title} id="title-error" />
          </div>
          <div>
            <Label
              htmlFor="company"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Company
            </Label>
            <Select
              value={formData.company}
              onValueChange={(value) => updateFormData("company", value)}
            >
              <SelectTrigger
                className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                  errors.company ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? "company-error" : undefined}
              >
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.name}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.company} id="company-error" />
          </div>
          <div>
            <Label
              htmlFor="contacts"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Contacts
            </Label>
            <MultiSelect
              options={contacts.map((contact) => ({
                label: contact.name,
                value: contact.id,
                icon: contact.icon || null,
              }))}
              onValueChange={(selectedIds) =>
                updateFormData("contacts", selectedIds)
              }
              selectedValues={formData.contacts.map(String)}
              placeholder="Select Contacts"
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                errors.contacts ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.contacts}
              aria-describedby={errors.contacts ? "contacts-error" : undefined}
            />
            <ErrorMessage error={errors.contacts} id="contacts-error" />
          </div>
          <div>
            <Label
              htmlFor="leads"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Lead
            </Label>
            <Select
              value={formData.leads}
              onValueChange={(value) => updateFormData("leads", value)}
            >
              <SelectTrigger
                className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                  errors.leads ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.leads}
                aria-describedby={errors.leads ? "leads-error" : undefined}
              >
                <SelectValue placeholder="Select Lead" />
              </SelectTrigger>
              <SelectContent>
                {leads.map((lead) => (
                  <SelectItem key={lead.id} value={lead.email}>
                    {lead.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.leads} id="leads-error" />
          </div>
          <div>
            <Label
              htmlFor="amount"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Amount
            </Label>
            <Input
              id="amount"
              type="text"
              value={formData.amount}
              onChange={(e) => updateFormData("amount", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.amount ? "border-red-500" : ""
              }`}
              placeholder="Deal amount (e.g., 10000)"
              aria-invalid={!!errors.amount}
              aria-describedby={errors.amount ? "amount-error" : undefined}
            />
            <ErrorMessage error={errors.amount} id="amount-error" />
          </div>
          <div>
            <Label
              htmlFor="closeDate"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Close Date
            </Label>
            <Input
              id="closeDate"
              type="date"
              value={formData.closeDate}
              onChange={(e) => updateFormData("closeDate", e.target.value)}
              className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.closeDate ? "border-red-500" : ""
              }`}
              placeholder="Select close date"
              aria-invalid={!!errors.closeDate}
              aria-describedby={
                errors.closeDate ? "closeDate-error" : undefined
              }
            />
            <ErrorMessage error={errors.closeDate} id="closeDate-error" />
          </div>
          <div>
            <Label
              htmlFor="type"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Type
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => updateFormData("type", value)}
            >
              <SelectTrigger
                className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                  errors.type ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.type}
                aria-describedby={errors.type ? "type-error" : undefined}
              >
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="renewal">Renewal</SelectItem>
                <SelectItem value="expansion">Expansion</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.type} id="type-error" />
          </div>
          <div>
            <Label
              htmlFor="priority"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Priority
            </Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => updateFormData("priority", value)}
            >
              <SelectTrigger
                className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                  errors.priority ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.priority}
                aria-describedby={
                  errors.priority ? "priority-error" : undefined
                }
              >
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.priority} id="priority-error" />
          </div>
          <div>
            <Label
              htmlFor="owner"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Owner
            </Label>
            <Input
              id="owner"
              value={formData.owner}
              onChange={(e) => updateFormData("owner", e.target.value)}
              className={`bg-white/50 dark:bg-slate-808/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                errors.owner ? "border-red-500" : ""
              }`}
              placeholder="Deal owner"
              aria-invalid={!!errors.owner}
              aria-describedby={errors.owner ? "owner-error" : undefined}
            />
            <ErrorMessage error={errors.owner} id="owner-error" />
          </div>
          <div>
            <Label
              htmlFor="pipeline"
              className="mb-2 text-slate-700 dark:text-slate-300"
            >
              Pipeline
            </Label>
            <Select
              value={formData.pipeline}
              onValueChange={(value) => updateFormData("pipeline", value)}
            >
              <SelectTrigger
                className={`bg-white/50 dark:bg-slate-808/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                  errors.pipeline ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.pipeline}
                aria-describedby={
                  errors.pipeline ? "pipeline-error" : undefined
                }
              >
                <SelectValue placeholder="Select Pipeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.pipeline} id="pipeline-error" />
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
                className={`bg-white/50 dark:bg-slate-808/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                  errors.stage ? "border-red-500" : ""
                }`}
                aria-invalid={!!errors.stage}
                aria-describedby={errors.stage ? "stage-error" : undefined}
              >
                <SelectValue placeholder="Select Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="qualification">Qualification</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.stage} id="stage-error" />
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
          Add Deal
        </Button>
      </div>
    </SheetContent>
  );
};

export default DealForm;
