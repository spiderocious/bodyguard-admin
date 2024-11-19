import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileCheck, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';

const KycVerificationDetails = () => {
  const { id } = useParams();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Mock data
  const verification = {
    id,
    bodyguardName: 'John Doe',
    submissionDate: '2024-03-10',
    status: 'pending',
    documents: [
      {
        type: 'ID Card',
        frontUrl: 'https://images.unsplash.com/photo-1516571748831-5d81767b044d',
        backUrl: 'https://images.unsplash.com/photo-1516571748831-5d81767b044d',
      },
      {
        type: 'Professional License',
        url: 'https://images.unsplash.com/photo-1516571748831-5d81767b044d',
      },
      {
        type: 'Training Certificate',
        url: 'https://images.unsplash.com/photo-1516571748831-5d81767b044d',
      },
    ],
    personalInfo: {
      dateOfBirth: '1990-05-15',
      nationality: 'American',
      address: '123 Security St, NY 10001',
      phone: '+1 234-567-8900',
      email: 'john.doe@example.com',
    },
  };

  const handleApprove = () => {
    console.log('Approving verification');
    setShowApproveModal(false);
  };

  const handleReject = () => {
    console.log('Rejecting verification with reason:', rejectionReason);
    setShowRejectModal(false);
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
                <p className="font-medium">{verification.bodyguardName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <p className="font-medium">{verification.personalInfo.dateOfBirth}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Nationality</label>
                <p className="font-medium">{verification.personalInfo.nationality}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Address</label>
                <p className="font-medium">{verification.personalInfo.address}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Contact</label>
                <p className="font-medium">{verification.personalInfo.phone}</p>
                <p className="font-medium">{verification.personalInfo.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Submitted Documents</h3>
            <div className="space-y-6">
              {verification.documents.map((doc) => (
                <div key={doc.type} className="space-y-2">
                  <h4 className="font-medium">{doc.type}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {doc.frontUrl && (
                      <img
                        src={doc.frontUrl}
                        alt={`${doc.type} Front`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    {doc.backUrl && (
                      <img
                        src={doc.backUrl}
                        alt={`${doc.type} Back`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    {doc.url && (
                      <img
                        src={doc.url}
                        alt={doc.type}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              ))}
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
            <p>Please provide a reason for rejecting this verification.</p>
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