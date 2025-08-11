"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Trash2, Plus, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ContactForm from "@/components/libs/forms/ContactForm";
import LeadForm from "@/components/libs/forms/LeadForm";
import CompanyForm from "@/components/libs/forms/CompanyForm";
import CompanyCard from "@/components/libs/cards/CompanyCard";

const ListPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [listData, setListData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const HandleUpdate = async (id) => {
    try {
      setLoading(true);
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
      const response = await fetch(`/api/crm/updateList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          type: listData.type,
          userId,
          listId: listData.id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add company to list");
      }
      const updatedList = await response.json();
      setListData(updatedList);
      toast.success("Company added to list", {
        position: "top-right",
        autoClose: 5000,
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.message || "Failed to add company to list", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

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

        if (data.type == "Company") {
          const companyRes = await fetch(`/api/crm/getCompanies`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });
          const companies = await companyRes.json();
          setListItems(companies);
        } else if (data.type == "Contact") {
          const contactRes = await fetch(`/api/crm/getContacts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });
          const contacts = await contactRes.json();
          setListItems(contacts);
        } else if (data.type == "Lead") {
          const leadRes = await fetch(`/api/crm/getLeads`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });
          const leads = await leadRes.json();
          setListItems(leads);
        }
      } catch (err) {
        toast.error(err.message || "Failed to fetch list data", {
          position: "top-right",
          autoClose: 5000,
        });
        router.push("/crm");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListData();
  }, [slug, router]);

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
          <Sheet className="relative w-max">
            <SheetTrigger asChild>
              <Button className="bg-purple-500 hover:bg-purple-600">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add {listData.type || "Item"}
              </Button>
            </SheetTrigger>
            {listData.type === "Contact" && (
              <ContactForm className="p-6" listAdd={true} list={listData.id} />
            )}
            {listData.type === "Lead" && (
              <LeadForm className="p-6" listAdd={true} list={listData.id} />
            )}
            {listData.type === "Company" && (
              <CompanyForm className="p-6" listAdd={true} list={listData.id} />
            )}
          </Sheet>
          <Sheet className="relative w-max">
            <SheetTrigger asChild>
              <Button className="bg-purple-500 hover:bg-purple-600">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Existing {listData.type || "Item"}
              </Button>
            </SheetTrigger>
            <SheetContent className={`px-3 py-2 max-w-[500px]`} side="right">
              <SheetHeader>
                <SheetTitle>Add Existing {listData.type || "Item"}</SheetTitle>
                <SheetDescription>
                  Select an existing {listData.type || "item"} to add to this
                  list.
                </SheetDescription>
              </SheetHeader>
              <div className="grid grid-cols-1 w-full gap-4">
                {listData.type === "Contact" &&
                  listItems
                    .filter(
                      (item) =>
                        !listData.arrayValues
                          .map((list) => list.id)
                          .includes(item.id)
                    )
                    .map((contact) => (
                      <div
                        className="w-full flex items-center justify-between cursor-pointer bg-gray-300 opacity-80 hover:opacity-100 p-2 rounded-md"
                        key={contact.id}
                        onClick={() => HandleUpdate(contact.id)}
                      >
                        {contact.name && contact.name}
                        <Button variant="none" className="bg-transparent">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                {listData.type === "Company" &&
                  listItems.length > 0 &&
                  listItems
                    .filter(
                      (item) =>
                        !listData.arrayValues
                          .map((list) => list.id)
                          .includes(item.id)
                    )
                    .map((company) => (
                      <div
                        className="w-full flex items-center justify-between cursor-pointer bg-gray-300 opacity-80 hover:opacity-100 p-2 rounded-md"
                        key={company.id}
                        onClick={() => HandleUpdate(company.id)}
                      >
                        {company.name && company.name}
                        <Button variant="none" className="bg-transparent">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                {listData.type === "Lead" &&
                  listItems.length > 0 &&
                  listItems
                    .filter(
                      (item) =>
                        !listData.arrayValues
                          .map((list) => list.id)
                          .includes(item.id)
                    )
                    .map((lead) => (
                      <div
                        className="w-full flex items-center justify-between cursor-pointer bg-gray-300 opacity-80 hover:opacity-100 p-2 rounded-md"
                        key={lead.id}
                        onClick={() => HandleUpdate(lead.id)}
                      >
                        {lead.name && lead.name}
                        <Button variant="none" className="bg-transparent">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
              </div>
            </SheetContent>
          </Sheet>
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
                  your list and remove the data from our servers.
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
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            {listData.name || "Untitled List"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
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
            {listData.type === "Company" &&
              (listData.arrayValues?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listData.arrayValues.map((company) => (
                    <div
                      key={company.id}
                      className="relative flex flex-col gap-3 cursor-pointer"
                    >
                      <CompanyCard company={company} />
                      <Button
                        variant="destructive"
                        className="absolute bottom-2 cursor-pointer z-10 right-2 bg-red-500 hover:bg-red-600"
                        onClick={() => HandleUpdate(company.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">
                  No companies found.
                </p>
              ))}
            {listData.type === "Contact" &&
              (listData.arrayValues?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listData.arrayValues.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">
                  No contacts found.
                </p>
              ))}
            {listData.type === "Lead" &&
              (listData.arrayValues?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listData.arrayValues.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">
                  No leads found.
                </p>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListPage;
