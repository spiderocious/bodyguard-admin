// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  AlertCircle,
  Calendar,
  Clock,
  User,
  Award,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Ruler,
  Scale,
  Star,
  Loader
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";
import { format } from 'date-fns';
import DataTable from "../components/DataTable";
import { jobColumns, mockJobs } from "./JobList";
import { getUser } from "../services/api.service";

const FeatureAccessBadge = ({ isEnabled, label }) => (
  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
    isEnabled 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }`}>
    {isEnabled ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
    <span>{label}</span>
  </div>
);

export const LoadingState = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center space-y-4">
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
      <span className="text-gray-500">Loading details...</span>
    </div>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center space-y-4 text-red-500">
      <AlertCircle className="w-8 h-8" />
      <span>{error}</span>
    </div>
  </div>
);

const BodyguardDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getUser(id);
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err?.message || 'Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };


  const handleSuspend = () => {
    console.log("Suspending user with reason:", suspensionReason);
    setShowSuspendModal(false);
  };

  const formatDate = (date) => {
    return format(new Date(date), 'PPP');
  };

  const formatCurrency = (amount, currency) => {
    console.log(amount, currency);
    if (amount === null) return 'Not set';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const goToJobDetails = (jobId) => navigate(`/jobs/${jobId}`);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!user) return <ErrorState error="User not found" />;

  return (
    <div className="p-6">
      <PageHeader
        title="User Details"
        icon={Shield}
        actions={
          <div className="flex space-x-4">
            {user.work.availabilityStatus ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Available
              </span>
            ) : (
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Unavailable
              </span>
            )}
            <button
              onClick={() => setShowSuspendModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
              disabled={user.flags.isSuspended}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              {user.flags.isSuspended ? 'Suspended' : 'Suspend User'}
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{`${user.firstName} ${user.lastName}`}</CardTitle>
                <div className="flex items-center space-x-4 mt-2">
                  <StatusBadge 
                    status={user.status} 
                    variant={user.status === 'ACTIVE' ? 'success' : 'warning'} 
                  />
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1">{user.rating || 'No rating'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {user.kyc.address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-400" size={20} />
                  <span>{`${user.kyc.address.address || ''}, ${user.kyc.address.city || ''}`}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Phone className="text-gray-400" size={20} />
                <span>{user.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-400" size={20} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-400" size={20} />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rate Card */}
        {user.role === "bodyguard" && <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Current Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {formatCurrency(user.work.rate, user.work.workRateCurrency)}
              <span className="text-sm text-gray-500 ml-1">/ hour</span>
            </div>
          </CardContent>
        </Card>
        }
        {/* Physical Details */}
        {user.kyc.body && (user.kyc.body.height || user.kyc.body.weight) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Physical Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.kyc.body.height && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Ruler className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Height</span>
                    </div>
                    <span className="font-medium">{user.kyc.body.height} cm</span>
                  </div>
                )}
                {user.kyc.body.weight && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Scale className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Weight</span>
                    </div>
                    <span className="font-medium">{user.kyc.body.weight} kg</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Experience & KYC */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Experience & Verification</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.kyc.experience.value && user.kyc.experience.unit && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">
                    {user.kyc.experience.value} {user.kyc.experience.unit}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">KYC Status</span>
                <StatusBadge 
                  status={user.kyc.isKYCVerified ? 'VERIFIED' : 'PENDING'} 
                  variant={user.kyc.isKYCVerified ? 'success' : 'warning'} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Feature Access</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <FeatureAccessBadge 
                isEnabled={user.featureAccess.canWithdraw} 
                label="Can Withdraw" 
              />
              <FeatureAccessBadge 
                isEnabled={user.featureAccess.canDeposit} 
                label="Can Deposit" 
              />
              <FeatureAccessBadge 
                isEnabled={user.featureAccess.canSetWorkRate} 
                label="Can Set Rate" 
              />
              <FeatureAccessBadge 
                isEnabled={user.featureAccess.canAccessJobs} 
                label="Can Access Jobs" 
              />
              <FeatureAccessBadge 
                isEnabled={user.featureAccess.canAcceptJobs} 
                label="Can Accept Jobs" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card className="lg:col-span-3 hidden">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Recent Jobs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={jobColumns}
              data={mockJobs}
              onRowClick={(row) => goToJobDetails(row.id)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Suspend Modal */}
      <Modal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        title="Suspend User"
        actions={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowSuspendModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn bg-red-600 text-white hover:bg-red-700"
              onClick={handleSuspend}
              disabled={!suspensionReason.trim()}
            >
              Suspend
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-2 text-yellow-600">
            <AlertCircle className="mt-1" size={20} />
            <p>
              This action will immediately suspend the user's account and
              prevent them from accessing the platform.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Suspension Reason
            </label>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
              placeholder="Enter the reason for suspension..."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BodyguardDetails;