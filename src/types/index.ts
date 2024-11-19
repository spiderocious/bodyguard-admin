export interface Bodyguard {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'rejected';
  rating: number;
  jobsCompleted: number;
  location: string;
  specializations: string[];
  verificationStatus: string;
}

export interface Client {
  id: string;
  name: string;
  totalBookings: number;
  status: 'active' | 'inactive';
  joinedDate: string;
}

export interface JobRequest {
  id: string;
  clientId: string;
  clientName: string;
  bodyguardId?: string;
  bodyguardName?: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  date: string;
  location: string;
  duration: number;
  amount: number;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userType: 'client' | 'bodyguard';
  subject: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userType: string;
  timestamp: string;
  details: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'booking' | 'refund' | 'payout';
  date: string;
  from: string;
  to: string;
}