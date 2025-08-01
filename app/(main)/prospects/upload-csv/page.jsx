"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  Users,
  Building2,
  Mail,
  Phone,
} from "lucide-react";

// Mock uploaded data preview
const mockUploadedData = [
  {
    id: 1,
    name: "Alex Morgan",
    title: "Marketing Manager",
    company: "StartupFlow",
    email: "alex@startupflow.com",
    phone: "+1 (555) 111-2222",
    location: "Boston, MA",
    industry: "Technology",
    status: "New",
  },
  {
    id: 2,
    name: "Jessica Lee",
    title: "VP Sales",
    company: "GrowthTech Inc",
    email: "jessica@growthtech.com",
    phone: "+1 (555) 333-4444",
    location: "Denver, CO",
    industry: "Software",
    status: "New",
  },
  {
    id: 3,
    name: "Robert Wilson",
    title: "CEO",
    company: "InnovateNow",
    email: "robert@innovatenow.com",
    phone: "+1 (555) 555-6666",
    location: "Miami, FL",
    industry: "Healthcare",
    status: "New",
  },
  {
    id: 4,
    name: "Maria Garcia",
    title: "Product Director",
    company: "NextGen Solutions",
    email: "maria@nextgen.com",
    phone: "+1 (555) 777-8888",
    location: "Phoenix, AZ",
    industry: "Finance",
    status: "New",
  },
  {
    id: 5,
    name: "James Smith",
    title: "Head of Engineering",
    company: "TechForward",
    email: "james@techforward.com",
    phone: "+1 (555) 999-0000",
    location: "Portland, OR",
    industry: "Technology",
    status: "New",
  },
];

export default function UploadCSV() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [showPreview, setShowPreview] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "text/csv") {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setUploadStatus("uploading");

    // Simulate upload process
    setTimeout(() => {
      setUploadStatus("success");
      setShowPreview(true);
    }, 2000);
  };

  const downloadTemplate = () => {
    // Create CSV template
    const csvContent =
      "Name,Title,Company,Email,Phone,Location,Industry\nJohn Doe,Marketing Manager,Example Corp,john@example.com,+1 (555) 123-4567,New York NY,Technology";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prospect_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus("idle");
    setShowPreview(false);
  };

  const importProspects = () => {
    // Simulate import process
    alert(
      "Prospects imported successfully! You can track actions for this data in the Outreach page."
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Upload Your CSV
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Import prospect data with drag & drop CSV upload and preview
          </p>
        </div>
        <Button
          onClick={downloadTemplate}
          variant="outline"
          className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-white/20 w-full sm:w-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Template
        </Button>
      </div>

      {/* Upload Instructions */}
      <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
            CSV Format Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                Required Columns:
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Name</li>
                <li>• Company</li>
                <li>• Email</li>
                <li>• Title (Job Title)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                Optional Columns:
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Phone</li>
                <li>• Location</li>
                <li>• Industry</li>
                <li>• LinkedIn URL</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 <strong>Tip:</strong> Download our template to ensure your CSV
              is properly formatted for import.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              isDragOver
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : uploadStatus === "success"
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadStatus === "idle" && (
              <>
                <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  Drop your CSV file here
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  or click to browse and select your file
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer">
                    Select CSV File
                  </Button>
                </label>
              </>
            )}

            {uploadStatus === "uploading" && (
              <>
                <div className="animate-spin mx-auto h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  Processing your file...
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Please wait while we validate and process your CSV data
                </p>
              </>
            )}

            {uploadStatus === "success" && uploadedFile && (
              <>
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  File uploaded successfully!
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-500" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {uploadedFile.name}
                    </span>
                    <Badge variant="secondary">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </Badge>
                  </div>
                  <Button
                    onClick={removeFile}
                    variant="outline"
                    size="sm"
                    className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Preview */}
      {showPreview && (
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Data Preview
              </div>
              <Badge variant="outline">
                {mockUploadedData.length} prospects found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Preview Table - Mobile Responsive */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border border-slate-200 dark:border-slate-700 rounded-lg">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                        Title
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                        Company
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                        Location
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUploadedData.map((prospect, index) => (
                      <tr
                        key={prospect.id}
                        className={
                          index % 2 === 0
                            ? "bg-white dark:bg-slate-900"
                            : "bg-slate-50 dark:bg-slate-800"
                        }
                      >
                        <td className="px-4 py-2 text-sm text-slate-900 dark:text-white">
                          {prospect.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
                          {prospect.title}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
                          {prospect.company}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
                          {prospect.email}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
                          {prospect.location}
                        </td>
                        <td className="px-4 py-2">
                          <Badge variant="secondary" className="text-xs">
                            {prospect.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {mockUploadedData.map((prospect) => (
                  <Card
                    key={prospect.id}
                    className="border border-slate-200 dark:border-slate-700"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-900 dark:text-white">
                          {prospect.name}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {prospect.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                        {prospect.title}
                      </p>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-2">
                        <Building2 className="h-4 w-4 mr-1" />
                        {prospect.company}
                      </div>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-2">
                        <Mail className="h-4 w-4 mr-1" />
                        {prospect.email}
                      </div>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Phone className="h-4 w-4 mr-1" />
                        {prospect.phone}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Import Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  onClick={importProspects}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Import {mockUploadedData.length} Prospects
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/50 dark:bg-slate-800/50 border-white/20"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Review All Data
                </Button>
              </div>

              {/* Outreach Callout */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Track Your Outreach Activities
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Actions for this imported data can be tracked in the{" "}
                      <span className="font-medium">Outreach page</span>.
                      Monitor engagement, response rates, and campaign
                      performance for these prospects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/20">
        <CardHeader>
          <CardTitle className="text-lg">💡 Pro Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                Data Quality
              </h4>
              <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Ensure email addresses are valid</li>
                <li>• Use consistent naming conventions</li>
                <li>• Include industry information when possible</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                Best Practices
              </h4>
              <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Test with a small batch first</li>
                <li>• Clean data before upload</li>
                <li>• Verify contact information accuracy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
