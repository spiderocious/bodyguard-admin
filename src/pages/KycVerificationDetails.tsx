import {
  Activity,
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  FileCheck,
  KeySquare,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  User,
  UserCheck,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaFemale,
  FaIdCard,
  FaMale,
  FaRulerVertical,
  FaUser,
  FaWeight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomNetworkImage from "../components/custom-network-image";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import { actPendingKyc, getToken } from "../services/api.service";
import { v2baseUrl } from "./PhysicalVerification";
import axios from "axios";


const completePhysicalVerifications = async (id?: string) => {
  const url = `${v2baseUrl}/api/v2/user/physical-verifications/complete/${id}`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

const PhysicalVerificationDetails = () => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [verification, setVerification] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedImage, setExpandedImage] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the verification data from localStorage
    const v = localStorage.getItem("kyc");
    if (v) {
      try {
        setVerification(JSON.parse(v));
        console.log(JSON.parse(v));
      } catch (err) {
        console.error("Error parsing verification data:", err);
      }
    }
    setLoading(false);
  }, []);

  const handleApprove = () => {
    console.log("Approving verification");
    submitAction(true);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    console.log("Rejecting verification with reason:", rejectionReason);
    submitAction(false);
  };

  const submitAction = async (status: any) => {
    try {
      const res = await actPendingKyc(
        verification?.id || verification?.userId,
        status
      );
      // console.log(res);
      if (res) {
        await completePhysicalVerifications(userData?.email);
        setShowApproveModal(false);
        setShowRejectModal(false);
        navigate("/verification");
      }
    } catch (error) {
      console.error("Error submitting action:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Function to safely get nested properties
  const getSafe = (obj: any, path: any, defaultValue = "N/A") => {
    console.log(obj, path, obj?.[path]);
    try {
      const parts = path.split('.');
      let result = obj;
      
      for (const part of parts) {
        if (result === null || result === undefined) return defaultValue;
        result = result[part];
      }
      
      if (result === null || result === undefined || result === "") return defaultValue;
      return result;
    } catch (e) {
      return defaultValue;
    }
  };

  // Function to format dates nicely
  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString || "N/A";
    }
  };

  // Helper to render yes/no for boolean values
  const renderBoolean = (value: any) => {
    if (value === undefined || value === null) return "N/A";
    return value ? (
      <span className="text-green-600 flex items-center">
        <CheckCircle size={16} className="mr-1" /> Yes
      </span>
    ) : (
      <span className="text-red-600 flex items-center">
        <XCircle size={16} className="mr-1" /> No
      </span>
    );
  };

  // Function to render a data row
  const DataRow = ({ label, value, icon }: any) => (
    <div className="flex items-start border-b border-gray-100 py-3">
      <div className="text-blue-500 mr-3 mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="font-medium text-gray-800 mt-0.5">{value}</div>
      </div>
    </div>
  );

  // Function to determine avatar background based on name
  const getAvatarBg = (name: any) => {
    if (!name) return "bg-gray-200";
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-amber-100 text-amber-600",
      "bg-pink-100 text-pink-600",
      "bg-indigo-100 text-indigo-600",
    ];

    const firstChar = name.charAt(0).toUpperCase();
    const charCode = firstChar.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  // Function to check if a value is an image key
  const isImageKey = (key: any) => {
    if (!key) return false;
    return typeof key === "string" && key.includes("-");
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!verification) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center">
          <AlertCircle className="mr-2" />
          <p>
            Verification details not found. Please go back and select a
            verification.
          </p>
        </div>
        <button
          onClick={() => navigate("/physical-verifications")}
          className="btn bg-blue-600 text-white hover:bg-blue-700"
        >
          Back to Verifications
        </button>
      </div>
    );
  }

  // Get all data from either metaData or directly from verification
  const userData = verification;

  return (
    <div className="p-6">
      <PageHeader
        title="Physical Verification Details"
        icon={UserCheck}
        actions={
          <div className="flex space-x-3">
            <button
              onClick={() => navigate("/physical-verifications")}
              className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Back
            </button>
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

      {/* Profile Summary Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${getAvatarBg(
                getSafe(userData, "firstName")
              )}`}
            >
              {getSafe(userData, "firstName", "U").charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {getSafe(userData, "firstName")} {getSafe(userData, "lastName")}
            </h2>
            <div className="flex flex-wrap items-center mt-2 text-gray-600">
              <div className="flex items-center mr-6 mb-2">
                <Mail className="w-4 h-4 mr-1" />
                {getSafe(userData, "email")}
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Phone className="w-4 h-4 mr-1" />
                {getSafe(userData, "phoneNumber")}
              </div>
              <div className="flex items-center mr-6 mb-2">
                {userData.gender === "male" ? (
                  <FaMale className="w-4 h-4 mr-1 text-blue-500" />
                ) : (
                  <FaFemale className="w-4 h-4 mr-1 text-pink-500" />
                )}
                {getSafe(userData, "gender", "Not specified").toUpperCase()}
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Shield className="w-4 h-4 mr-1" />
                Role:{" "}
                <span className="font-medium ml-1">
                  {getSafe(userData, "role").toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex-shrink-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
              <Clock className="w-3 h-3 mr-1" />
              {getSafe(verification, "status", "pending").toUpperCase()}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              ID: {getSafe(userData, "id")}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-3">
            <User className="mr-2 text-blue-500" />
            Personal Information
          </h3>

          <div className="space-y-0">
            <DataRow
              label="Full Name"
              value={`${getSafe(userData, "firstName")} ${getSafe(
                userData,
                "lastName"
              )}`}
              icon={<FaUser />}
            />

            <DataRow
              label="Date of Birth"
              value={getSafe(userData, "kyc.dob")}
              icon={<FaCalendarAlt />}
            />

            <DataRow
              label="Gender"
              value={getSafe(userData, "gender", "Not specified").toUpperCase()}
              icon={userData.gender === "male" ? <FaMale /> : <FaFemale />}
            />

            <DataRow
              label="Email"
              value={getSafe(userData, "email")}
              icon={<Mail size={18} />}
            />

            <DataRow
              label="Phone Number"
              value={getSafe(userData, "phoneNumber")}
              icon={<Phone size={18} />}
            />

            <DataRow
              label="Address"
              value={
                <div>
                  <p>{getSafe(userData, "kyc.address.address")}</p>
                  <p>
                    {getSafe(userData, "kyc.address.city")},{" "}
                    {getSafe(userData, "kyc.address.state")}
                  </p>
                </div>
              }
              icon={<MapPin size={18} />}
            />

            <DataRow
              label="Account Created"
              value={formatDate(getSafe(userData, "createdAt"))}
              icon={<Calendar size={18} />}
            />

            <DataRow
              label="Last Updated"
              value={formatDate(getSafe(userData, "updatedAt"))}
              icon={<Clock size={18} />}
            />
          </div>
        </div>

        {/* Physical Attributes and Experience */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-3">
            <Activity className="mr-2 text-blue-500" />
            Physical Attributes & Experience
          </h3>

          <div className="space-y-0">
            <DataRow
              label="Height"
              value={`${getSafe(userData, "kyc.body.height")} cm`}
              icon={<FaRulerVertical />}
            />

            <DataRow
              label="Weight"
              value={`${getSafe(userData, "kyc.body.weight")} kg`}
              icon={<FaWeight />}
            />

            <DataRow
              label="Experience"
              value={`${getSafe(userData, "kyc.experience.value")} ${getSafe(
                userData,
                "kyc.experience.unit",
                ""
              )}`}
              icon={<Briefcase size={18} />}
            />

            <DataRow
              label="Rating"
              value={
                <div className="flex items-center">
                  {getSafe(userData, "rating")}
                  <Star className="w-4 h-4 text-yellow-500 ml-1 fill-current" />
                </div>
              }
              icon={<Star size={18} />}
            />

            <DataRow
              label="ID Type"
              value={getSafe(
                userData,
                "kyc.identity.idProofType",
                "Not provided"
              ).toUpperCase()}
              icon={<FaIdCard />}
            />

            <DataRow
              label="ID Number"
              value={getSafe(userData, "kyc.identity.idProofNumber")}
              icon={<KeySquare size={18} />}
            />

            <DataRow
              label="KYC Verified"
              value={renderBoolean(getSafe(userData, "kyc.isKYCVerified"))}
              icon={<CheckCircle size={18} />}
            />

            <DataRow
              label="Auto KYC Verified"
              value={renderBoolean(getSafe(userData, "kyc.isAutoKYCVerified"))}
              icon={<Shield size={18} />}
            />
          </div>
        </div>

        {/* Work & Financial Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-3">
            <Briefcase className="mr-2 text-blue-500" />
            Work & Financial Information
          </h3>

          <div className="space-y-0">
            <DataRow
              label="Hourly Rate"
              value={`${getSafe(userData, "work.rate")} ${getSafe(
                userData,
                "work.currency"
              )}`}
              icon={<DollarSign size={18} />}
            />

            <DataRow
              label="Availability Status"
              value={renderBoolean(
                getSafe(userData, "work.availabilityStatus")
              )}
              icon={<Clock size={18} />}
            />

            <DataRow
              label="Bank Name"
              value={getSafe(userData, "work.bank.name")}
              icon={<CreditCard size={18} />}
            />

            <DataRow
              label="Account Name"
              value={getSafe(userData, "work.bank.accountName")}
              icon={<User size={18} />}
            />

            <DataRow
              label="Account Number"
              value={getSafe(userData, "work.bank.number")}
              icon={<CreditCard size={18} />}
            />

            <DataRow
              label="Bank Code"
              value={getSafe(userData, "work.bank.code")}
              icon={<KeySquare size={18} />}
            />

            <h4 className="font-medium mt-4 mb-2 text-gray-700">
              Feature Access:
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-600">Can Withdraw</p>
                <p>
                  {renderBoolean(
                    getSafe(userData, "featureAccess.canWithdraw")
                  )}
                </p>
              </div>

              <div className="bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-600">Can Deposit</p>
                <p>
                  {renderBoolean(getSafe(userData, "featureAccess.canDeposit"))}
                </p>
              </div>

              <div className="bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-600">Can Access Jobs</p>
                <p>
                  {renderBoolean(
                    getSafe(userData, "featureAccess.canAccessJobs")
                  )}
                </p>
              </div>

              <div className="bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-600">Can Accept Jobs</p>
                <p>
                  {renderBoolean(
                    getSafe(userData, "featureAccess.canAcceptJobs")
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flags and Documents Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-3">
            <Shield className="mr-2 text-blue-500" />
            Account Status & Flags
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Account Status</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {getSafe(userData, "status")}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Verified</span>
              {renderBoolean(getSafe(userData, "verified"))}
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Is Verified Flag</span>
              {renderBoolean(getSafe(userData, "flags.isVerified"))}
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Is Suspended</span>
              {renderBoolean(getSafe(userData, "flags.isSuspended"))}
            </div>

            {getSafe(userData, "flags.suspensionReason") !== "N/A" && (
              <div className="p-3 bg-red-50 rounded-lg">
                <span className="text-red-700 font-medium">
                  Suspension Reason
                </span>
                <p className="text-red-600 mt-1">
                  {getSafe(userData, "flags.suspensionReason")}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Sign In Methods</span>
              <div className="flex flex-wrap gap-1">
                {Array.isArray(userData.signInMethods) ? (
                  userData.signInMethods.map((method: any, idx: any) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                    >
                      {method}
                    </span>
                  ))
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    N/A
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section - ID Proof */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-3">
            <FileCheck className="mr-2 text-blue-500" />
            Submitted Documents
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">
                ID Proof (
                {getSafe(
                  userData,
                  "kyc.identity.idProofType",
                  "ID"
                ).toUpperCase()}
                )
              </h4>
              <div className="space-y-4">
                {isImageKey(getSafe(userData, "kyc.identity.idProof")) ? (
                  <div className="relative">
                    <CustomNetworkImage
                      fileKey={getSafe(userData, "kyc.identity.idProof")}
                      className="w-full h-48 object-cover rounded-lg"
                      showViewIcon
                    />
                    <span className="absolute top-2 left-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                      Front
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">ID Front not provided</p>
                  </div>
                )}

                {isImageKey(getSafe(userData, "kyc.identity.idProofBack")) ? (
                  <div className="relative">
                    <CustomNetworkImage
                      fileKey={getSafe(userData, "kyc.identity.idProofBack")}
                      className="w-full h-48 object-cover rounded-lg"
                      showViewIcon
                    />
                    <span className="absolute top-2 left-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                      Back
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">ID Back not provided</p>
                  </div>
                )}

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">ID Number</p>
                  <p className="font-medium">
                    {getSafe(userData, "kyc.identity.idProofNumber")}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">Photos</h4>
              <div className="space-y-4">
                {isImageKey(getSafe(userData, "kyc.facePhoto")) ? (
                  <div className="relative">
                    <CustomNetworkImage
                      fileKey={getSafe(userData, "kyc.facePhoto")}
                      className="w-full h-48 object-cover rounded-lg"
                      showViewIcon
                    />
                    <span className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                      Face Photo
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Face photo not provided</p>
                  </div>
                )}

                {isImageKey(getSafe(userData, "kyc.fullBodyPhoto")) ? (
                  <div className="relative">
                    <CustomNetworkImage
                      fileKey={getSafe(userData, "kyc.fullBodyPhoto")}
                      className="w-full h-48 object-cover rounded-lg"
                      showViewIcon
                    />
                    <span className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                      Full Body Photo
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      Full body photo not provided
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Verification Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-3">
          <Calendar className="mr-2 text-blue-500" />
          Physical Verification Appointment
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DataRow
              label="Scheduled Date"
              value={formatDate(getSafe(verification, "scheduledDate"))}
              icon={<Calendar size={18} />}
            />

            <DataRow
              label="Verification Status"
              value={
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    verification.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : verification.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : verification.status === "no_show"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {getSafe(verification, "status", "pending").toUpperCase()}
                </span>
              }
              icon={<Clock size={18} />}
            />

            <DataRow
              label="Created At"
              value={formatDate(getSafe(verification, "createdAt"))}
              icon={<Clock size={18} />}
            />

            <DataRow
              label="Updated At"
              value={formatDate(getSafe(verification, "updatedAt"))}
              icon={<Clock size={18} />}
            />
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Verification Notes & Actions
            </h4>

            <p className="mb-4 text-blue-700">
              Please review all information carefully before approving or
              rejecting this verification. Approving will change the user's
              status to ACTIVE and enable them to accept bodyguard jobs.
            </p>

            <div className="flex mt-4 space-x-4">
              <button
                onClick={() => setShowRejectModal(true)}
                className="flex-1 btn bg-white border border-red-500 text-red-600 hover:bg-red-50 flex items-center justify-center"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </button>

              <button
                onClick={() => setShowApproveModal(true)}
                className="flex-1 btn bg-white border border-green-500 text-green-600 hover:bg-green-50 flex items-center justify-center"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image viewer modal */}
      {expandedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="font-semibold">{expandedImage.title}</h3>
              <button
                onClick={() => setExpandedImage(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <CustomNetworkImage
                fileKey={expandedImage.key}
                className="w-full h-auto object-contain max-h-[70vh]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
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
            <p>
              Please provide a reason for rejecting this verification. This will
              be shown to the bodyguard.
            </p>
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

      {/* Approve Modal */}
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
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <CheckCircle className="mt-1 text-green-600" size={20} />
            <div>
              <p className="font-medium">
                Approve Physical Verification for{" "}
                {getSafe(userData, "firstName")} {getSafe(userData, "lastName")}
              </p>
              <p className="text-gray-600 mt-1">
                By approving this verification:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc pl-5">
                <li>The bodyguard will be able to receive job assignments</li>
                <li>
                  Their profile will show as "Verified" to potential clients
                </li>
                <li>
                  Their account status will change from
                  "VERIFICATION_IN_PROGRESS" to "ACTIVE"
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              Are you sure you want to approve this verification?
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PhysicalVerificationDetails;
