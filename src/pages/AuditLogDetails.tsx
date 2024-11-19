import React from 'react';
import { useParams } from 'react-router-dom';
import { History, User, Clock, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const AuditLogDetails = () => {
  const { id } = useParams();

  // Mock data
  const auditLog = {
    id,
    action: 'Bodyguard Verification',
    userId: 'admin123',
    userType: 'admin',
    timestamp: '2024-03-15T10:30:00Z',
    details: 'Verified bodyguard ID: BG123',
    metadata: {
      ip: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      location: 'New York, USA',
      previousState: {
        status: 'pending',
        verificationStatus: 'in-review',
      },
      newState: {
        status: 'active',
        verificationStatus: 'verified',
      },
    },
    relatedEntity: {
      type: 'bodyguard',
      id: 'BG123',
      name: 'John Doe',
    },
  };

  return (
    <div className="p-6">
      <PageHeader title="Audit Log Details" icon={History} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Event Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Action</label>
                <p className="font-medium">{auditLog.action}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Timestamp</label>
                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-400" size={20} />
                  <p className="font-medium">
                    {new Date(auditLog.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Performed By</label>
                <div className="flex items-center space-x-2">
                  <User className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium">{auditLog.userId}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {auditLog.userType}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Related Entity</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Type</label>
                <p className="font-medium capitalize">{auditLog.relatedEntity.type}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Entity ID</label>
                <p className="font-medium">{auditLog.relatedEntity.id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <p className="font-medium">{auditLog.relatedEntity.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Changes</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Previous State</label>
                <pre className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
                  {JSON.stringify(auditLog.metadata.previousState, null, 2)}
                </pre>
              </div>
              <div>
                <label className="text-sm text-gray-500">New State</label>
                <pre className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
                  {JSON.stringify(auditLog.metadata.newState, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">IP Address</label>
                <p className="font-medium">{auditLog.metadata.ip}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Location</label>
                <p className="font-medium">{auditLog.metadata.location}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">User Agent</label>
                <p className="font-medium text-sm">{auditLog.metadata.userAgent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogDetails;