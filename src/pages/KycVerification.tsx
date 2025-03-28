import React, { useEffect } from "react";
import { FileCheck, Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";
import { getPendingKyc } from "../services/api.service";

interface KycRequest {
  id: string;
  bodyguardName: string;
  documentType: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
}

const mockKycRequests: KycRequest[] = [
  {
    id: "1",
    bodyguardName: "John Doe",
    documentType: "ID Verification",
    submissionDate: "2024-03-10",
    status: "pending",
  },
  // Add more mock data as needed
];

const columns = [
  { key: "firstName", label: "Name" },
  { key: "lastName", label: "Name" },
  { key: "email", label: "Email Address" },
  {
    key: "createdAt",
    label: "Submission Date",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    key: "status",
    label: "Status",
    render: (status: string) => (
      <StatusBadge
        status={status}
        variant={
          status === "approved"
            ? "success"
            : status === "pending"
            ? "warning"
            : "error"
        }
      />
    ),
  },
];

const KycVerification = () => {
  const navigate = useNavigate();
  const [kycs, setKycs] = React.useState([]);
  const gotodetails = (id: any) => navigate(`/verification/${id}`);
  useEffect(() => {
    getKycs();
  }, []);

  const getKycs = async () => {
    const res = await getPendingKyc();
    console.log(res);
    setKycs(res); // Fetch stats from API
    // Fetch stats from API
  };
  return (
    <div className="p-6">
      <PageHeader
        title="KYC Verification"
        icon={FileCheck}
        actions={
          <div className="flex space-x-4">
            <div className="relative hidden">
              <input
                type="text"
                placeholder="Search verifications..."
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
          data={kycs}
          onRowClick={(row) => {
            localStorage.setItem("kyc", JSON.stringify(row));
            gotodetails(row.id)
          }}
        />
      </div>
    </div>
  );
};

export default KycVerification;
