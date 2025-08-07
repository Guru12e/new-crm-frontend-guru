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
import MultiSelect from "@/components/libs/MultiSelect";

const DealPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [dealData, setDealData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);

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
    const fetchDealData = async () => {
      try {
        setIsLoading(true);
        const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
        setUserId(userId);
        if (!userId) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`/api/crm/getDealById`, {
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
          throw new Error("Failed to fetch deal data");
        }

        const data = await response.json();
        if (!data) {
          router.push("/crm");
          return;
        }

        // Transform data to match DealForm format
        setDealData(data);
        setFormData({
          title: data.title || "",
          company: data.company ? String(data.Companies?.id) : "",
          contacts: data.contacts ? data.contacts.map((c) => String(c.id)) : [],
          leads: data.leads ? String(data.Leads?.id) : "",
          amount: data.amount || "",
          closeDate: data.closeDate || "",
          type: data.type || "",
          priority: data.priority || "",
          owner: data.owner || "",
          pipeline: data.pipeline || "",
          stage: data.stage || "",
          description: data.description || "",
        });

        const companyRes = await fetch("/api/crm/getCompanies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        const companyData = await companyRes.json();
        setCompanies(companyData || []);

        const contactRes = await fetch("/api/crm/getContacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        const contactData = await contactRes.json();
        setContacts(contactData || []);

        const leadRes = await fetch("/api/crm/getLeads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        const leadData = await leadRes.json();
        setLeads(leadData || []);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealData();
  }, [slug, router]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData?.title?.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (formData?.amount && isNaN(parseFloat(formData.amount))) {
      newErrors.amount = "Amount must be a valid number";
      isValid = false;
    }

    if (formData?.closeDate && isNaN(Date.parse(formData.closeDate))) {
      newErrors.closeDate = "Invalid date format";
      isValid = false;
    }

    if (
      formData?.type &&
      !["new", "renewal", "expansion"].includes(formData.type)
    ) {
      newErrors.type = "Invalid type value";
      isValid = false;
    }

    if (
      formData?.priority &&
      !["low", "medium", "high"].includes(formData.priority)
    ) {
      newErrors.priority = "Invalid priority value";
      isValid = false;
    }

    if (
      formData?.pipeline &&
      !["sales", "marketing", "support"].includes(formData.pipeline)
    ) {
      newErrors.pipeline = "Invalid pipeline value";
      isValid = false;
    }

    if (
      formData?.stage &&
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
      const response = await fetch(`/api/crm/updateDeal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: slug,
          userId,
          ...formData,
          company: formData.company ? parseInt(formData.company) : null,
          contacts: formData.contacts.map((id) => parseInt(id)),
          leads: formData.leads ? parseInt(formData.leads) : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update deal");
      }

      const updatedData = await response.json();
      setDealData(updatedData);
      setIsEditing(false);
      toast.success("Deal updated successfully", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (err) {
      toast.error(err.message || "Failed to update deal", {
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
      const response = await fetch(`/api/crm/deleteDeal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: slug, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete deal");
      }

      toast.success("Deal deleted successfully", {
        position: "top-right",
        autoClose: 5000,
      });
      router.push("/crm");
    } catch (err) {
      toast.error(err.message || "Failed to delete deal", {
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

  if (error || !dealData || !formData) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertDescription>{error || "Deal not found"}</AlertDescription>
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
                  your deal and remove the data from our servers.
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
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            {dealData.title || "Untitled Deal"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            {isEditing ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
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
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Company
                  </Label>
                  <Select
                    value={formData.company}
                    onValueChange={(value) =>
                      handleSelectChange("company", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                        errors.company ? "border-red-500" : ""
                      }`}
                      aria-invalid={!!errors.company}
                      aria-describedby={
                        errors.company ? "company-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={String(company.id)}>
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
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Contacts
                  </Label>
                  <MultiSelect
                    options={contacts.map((contact) => ({
                      label: contact.name,
                      value: String(contact.id),
                      icon: contact.icon || null,
                    }))}
                    onValueChange={(selectedIds) =>
                      handleSelectChange("contacts", selectedIds)
                    }
                    selectedValues={formData.contacts}
                    placeholder="Select Contacts"
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                      errors.contacts ? "border-red-500" : ""
                    }`}
                    aria-invalid={!!errors.contacts}
                    aria-describedby={
                      errors.contacts ? "contacts-error" : undefined
                    }
                  />
                  <ErrorMessage error={errors.contacts} id="contacts-error" />
                </div>
                <div>
                  <Label
                    htmlFor="leads"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Lead
                  </Label>
                  <Select
                    value={formData.leads}
                    onValueChange={(value) =>
                      handleSelectChange("leads", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                        errors.leads ? "border-red-500" : ""
                      }`}
                      aria-invalid={!!errors.leads}
                      aria-describedby={
                        errors.leads ? "leads-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Select Lead" />
                    </SelectTrigger>
                    <SelectContent>
                      {leads.map((lead) => (
                        <SelectItem key={lead.id} value={String(lead.id)}>
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
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                      errors.amount ? "border-red-500" : ""
                    }`}
                    placeholder="Deal amount (e.g., 10000)"
                    aria-invalid={!!errors.amount}
                    aria-describedby={
                      errors.amount ? "amount-error" : undefined
                    }
                  />
                  <ErrorMessage error={errors.amount} id="amount-error" />
                </div>
                <div>
                  <Label
                    htmlFor="closeDate"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Close Date
                  </Label>
                  <Input
                    id="closeDate"
                    name="closeDate"
                    type="date"
                    value={formData.closeDate}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                      errors.closeDate ? "border-red-500" : ""
                    }`}
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
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Type
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
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
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Priority
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      handleSelectChange("priority", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
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
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Owner
                  </Label>
                  <Input
                    id="owner"
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
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
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Pipeline
                  </Label>
                  <Select
                    value={formData.pipeline}
                    onValueChange={(value) =>
                      handleSelectChange("pipeline", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
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
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Stage
                  </Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) =>
                      handleSelectChange("stage", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                        errors.stage ? "border-red-500" : ""
                      }`}
                      aria-invalid={!!errors.stage}
                      aria-describedby={
                        errors.stage ? "stage-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Select Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="qualification">
                        Qualification
                      </SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage error={errors.stage} id="stage-error" />
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
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                      errors.description ? "border-red-500" : ""
                    }`}
                    placeholder="Enter a description"
                    rows={4}
                    aria-invalid={!!errors.description}
                    aria-describedby={
                      errors.description ? "description-error" : undefined
                    }
                  />
                  <ErrorMessage
                    error={errors.description}
                    id="description-error"
                  />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <Button
                    disabled={isLoading}
                    onClick={handleUpdate}
                    className={`${
                      isLoading
                        ? "bg-gray-400 hover:bg-gray-500"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    } text-white`}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        title: dealData.title || "",
                        company: dealData.company
                          ? String(dealData.Companies?.id)
                          : "",
                        contacts: dealData.contacts
                          ? dealData.contacts.map((c) => String(c.id))
                          : [],
                        leads: dealData.leads ? String(dealData.Leads?.id) : "",
                        amount: dealData.amount || "",
                        closeDate: dealData.closeDate || "",
                        type: dealData.type || "",
                        priority: dealData.priority || "",
                        owner: dealData.owner || "",
                        pipeline: dealData.pipeline || "",
                        stage: dealData.stage || "",
                        description: dealData.description || "",
                      });
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
                    {dealData.Users?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Company
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.Companies?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Contacts
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.contacts?.length > 0
                      ? dealData.contacts.map((c) => c.name).join(", ")
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Lead Name
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.Leads?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Lead Email
                  </p>
                  <p>
                    {dealData.Leads?.email ? (
                      <a
                        href={`mailto:${dealData.Leads.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {dealData.Leads.email}
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
                    Amount
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.amount
                      ? `$${parseFloat(dealData.amount).toLocaleString()}`
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Close Date
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.closeDate
                      ? new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                        }).format(new Date(dealData.closeDate))
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Type
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.type || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Priority
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.priority || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Owner
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.owner || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Pipeline
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.pipeline || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Stage
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.stage || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Description
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {dealData.description || "N/A"}
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

export default DealPage;
