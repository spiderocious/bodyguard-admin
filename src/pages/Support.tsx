import React from "react";
import { HeadphonesIcon, Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import type { SupportTicket } from "../types";
import { useNavigate } from "react-router-dom";

const mockTickets: SupportTicket[] = [
  {
    id: "1",
    userId: "user123",
    userType: "client",
    subject: "Payment Issue",
    status: "open",
    priority: "high",
    createdAt: "2024-03-15T10:30:00Z",
  },
  // Add more mock data as needed
];

const columns = [
  { key: "subject", label: "Subject" },
  { key: "userType", label: "User Type" },
  {
    key: "priority",
    label: "Priority",
    render: (priority: string) => (
      <StatusBadge
        status={priority}
        variant={
          priority === "high"
            ? "error"
            : priority === "medium"
            ? "warning"
            : "info"
        }
      />
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (status: string) => (
      <StatusBadge
        status={status}
        variant={
          status === "resolved"
            ? "success"
            : status === "in-progress"
            ? "warning"
            : "error"
        }
      />
    ),
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (date: string) => new Date(date).toLocaleString(),
  },
];

const Support = () => {
  const navigate = useNavigate();
  const goToJobDetails = (id: any) => navigate(`/support/${id}`);
  return (
    <div className="p-6">
      <PageHeader
        title="Support Tickets"
        icon={HeadphonesIcon}
        actions={
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tickets..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        }
      />

      <div className="bg-white rounded-lg shadow-md">
        <DataTable
          columns={columns}
          data={mockTickets}
          onRowClick={(row) => goToJobDetails(row.id)}
        />
      </div>
    </div>
  );
};

export default Support;
