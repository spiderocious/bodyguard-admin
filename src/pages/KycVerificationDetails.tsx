import { AlertCircle, FileCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import { actPendingKyc } from "../services/api.service";
import CustomNetworkImage from "../components/custom-network-image";

const KycVerificationDetails = () => {
  const { id } = useParams();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [verification, setVerification] = useState<any>(null);
  const navigate = useNavigate();
  console.log(verification);
  useEffect(() => {
    const v = localStorage.getItem("kyc");
    if (v) {
      setVerification(JSON.parse(v));
    }
  }, []);


  const handleApprove = () => {
    console.log("Approving verification");
    //setShowApproveModal(false);
    submitAction(true);
  };

  const handleReject = () => {
    console.log("Rejecting verification with reason:", rejectionReason);
    //setShowRejectModal(false);
    submitAction(false);
  };

  const submitAction = async (status: boolean) => {
    const res = await actPendingKyc(verification?.id, status);
    console.log(res);
    if (res) {
      setShowApproveModal(false);
      setShowRejectModal(false);
      navigate("/kycs");
    }
  };

  return (
    <div className="p-6">
      <PageHeader
        title="KYC Verification Details"
        icon={FileCheck}
        actions={
          <div className="flex space-x-3">
            <button
              onClick={() => setShowApproveModal(true)}
              className="btn bg-green-600 text-white hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={() => setShowRejectModal(true)}
              className="btn bg-red-600 text-white hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="font-medium">
                  {verification?.firstName} {verification?.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <p className="font-medium">{verification?.kyc.dob}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Address</label>
                <p className="font-medium">
                  {verification?.kyc?.address?.address}
                  {verification?.kyc?.address?.city}
                  {verification?.kyc?.address?.state}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <p className="font-medium uppercase">{verification?.gender}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Measurements</label>
                <p className="font-medium">
                  Weight: {verification?.kyc?.body?.weight} kg{" "}
                </p>
                <p className="font-medium">
                  Height: {verification?.kyc?.body?.height} cm{" "}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Experience</label>
                <p className="font-medium">
                  {verification?.kyc?.experience?.value}{" "}
                  {verification?.kyc?.experience?.unit}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Submitted Documents</h3>
            <div className="space-y-6">
              <h4 className="font-medium uppercase">
                ID Type: {verification?.kyc?.identity?.idProofType}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {verification?.kyc?.identity?.idProof && (
                  <CustomNetworkImage
                    fileKey={verification?.kyc?.identity?.idProof}
                    className="w-full h-48 object-cover rounded-lg"
                    showViewIcon
                  />
                )}
                {verification?.kyc?.identity?.idProofBack && (
                  <CustomNetworkImage
                    fileKey={verification?.kyc?.identity?.idProofBack}
                    className="w-full h-48 object-cover rounded-lg"
                    showViewIcon
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Verification"
        actions={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowRejectModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn bg-red-600 text-white hover:bg-red-700"
              onClick={handleReject}
            >
              Reject
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-2 text-yellow-600">
            <AlertCircle className="mt-1" size={20} />
            <p>Please provide a reason for rejecting this verification?.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rejection Reason
            </label>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter the reason for rejection..."
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title="Approve Verification"
        actions={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowApproveModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn bg-green-600 text-white hover:bg-green-700"
              onClick={handleApprove}
            >
              Approve
            </button>
          </>
        }
      >
        <p>Are you sure you want to approve this verification?</p>
      </Modal>
    </div>
  );
};

export default KycVerificationDetails;
