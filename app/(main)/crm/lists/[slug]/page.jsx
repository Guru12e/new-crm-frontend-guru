"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Trash2,
  Edit2,
  Save,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const ListPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [listData, setListData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);
  const [isNewType, setIsNewType] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [listTypes, setListTypes] = useState([]);

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
    const fetchListData = async () => {
      try {
        setIsLoading(true);
        const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
        setUserId(userId);
        if (!userId) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`/api/crm/getListById`, {
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
          throw new Error("Failed to fetch list data");
        }

        const data = await response.json();
        if (!data) {
          router.push("/crm");
          return;
        }

        setListData(data);
        setFormData({
          ...data,
          array: data.array || [],
        });

        setListItems([{ id: 1, name: "Sample Item" }]);
        setListTypes(["Lead", "Contact", "Customer"]);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListData();
  }, [slug, router]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData?.name?.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData?.type?.trim()) {
      newErrors.type = "Type is required";
      isValid = false;
    }

    if (!formData?.access || !["Public", "Private"].includes(formData.access)) {
      newErrors.access = "Access must be Public or Private";
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

  const handleMultiSelectChange = (field, value) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value || [] } : prev));
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
      const response = await fetch(`/api/crm/updateList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: slug, userId, ...formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update list");
      }

      const updatedData = await response.json();
      setListData(updatedData);
      setIsEditing(false);
      setIsNewType(false);
      toast.success("List updated successfully", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (err) {
      toast.error(err.message || "Failed to update list", {
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
      const response = await fetch(`/api/crm/deleteList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: slug, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete list");
      }

      toast.success("List deleted successfully", {
        position: "top-right",
        autoClose: 5000,
      });
      router.push("/crm");
    } catch (err) {
      toast.error(err.message || "Failed to delete list", {
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !listData) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertDescription>{error || "List not found"}</AlertDescription>
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
              className="bg-purple-500 hover:bg-purple-600"
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
                  your list and remove the data from our servers.
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
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            {listData.name || "Untitled List"}
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
                    placeholder="List name"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <ErrorMessage error={errors.name} id="name-error" />
                </div>
                <div>
                  <Label
                    htmlFor="type"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Type *
                  </Label>
                  {isNewType ? (
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        id="type"
                        name="type"
                        value={formData?.type || ""}
                        onChange={handleInputChange}
                        className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${
                          errors.type ? "border-red-500" : ""
                        }`}
                        placeholder="Enter new type"
                        required
                        aria-invalid={!!errors.type}
                        aria-describedby={
                          errors.type ? "type-error" : undefined
                        }
                      />
                      <Button
                        variant="outline"
                        onClick={() => setIsNewType(false)}
                        className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        Use Existing
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-2">
                      <Select
                        value={formData?.type || ""}
                        onValueChange={(value) =>
                          handleSelectChange("type", value)
                        }
                      >
                        <SelectTrigger
                          className={`bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                            errors.type ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {listTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsNewType(true);
                          setFormData((prev) =>
                            prev ? { ...prev, type: "" } : prev
                          );
                        }}
                        className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <ErrorMessage error={errors.type} id="type-error" />
                </div>
                <div>
                  <Label
                    htmlFor="array"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Items
                  </Label>
                  <Select
                    value={formData?.array || []}
                    onValueChange={(value) =>
                      handleMultiSelectChange("array", value)
                    }
                    multiple
                  >
                    <SelectTrigger className="bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white">
                      <SelectValue placeholder="Select Items" />
                    </SelectTrigger>
                    <SelectContent>
                      {listItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="access"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Access *
                  </Label>
                  <Select
                    value={formData?.access || ""}
                    onValueChange={(value) =>
                      handleSelectChange("access", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white/50 mt-2 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 text-slate-900 dark:text-white ${
                        errors.access ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select Access" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage error={errors.access} id="access-error" />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <Button
                    onClick={handleUpdate}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(listData);
                      setErrors({});
                      setIsNewType(false);
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
                    {listData.Users?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Type
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {listData.type || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Items
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    {listData.array?.length > 0
                      ? listData.array.join(", ")
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Access
                  </p>
                  <p
                    className={
                      listData.access === "Public"
                        ? "text-green-700 dark:text-green-200"
                        : listData.access === "Private"
                        ? "text-red-700 dark:text-red-200"
                        : "text-slate-900 dark:text-white"
                    }
                  >
                    {listData.access || "N/A"}
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

export default ListPage;
