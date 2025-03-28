import React, { useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  User,
  Shield,
  Shirt,
  FileText,
  Star,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { LoadingState } from "./BodyguardDetails";

interface Location {
  lat: string;
  long: string;
}

interface Address {
  venue: string;
  state: string;
}

interface Uniform {
  type: string;
  color: string;
  addOns: string[];
}

interface PaymentDetail {
  name: string;
  value: number;
}

interface PaymentData {
  id: number;
  status: string;
  amount: number;
  channel: string;
  currency: string;
  paid_at: string;
  authorization: {
    last4: string;
    exp_month: string;
    exp_year: string;
    card_type: string;
    bank: string;
  };
}

interface Payment {
  reference: string | null;
  amount: number;
  status: boolean;
  totalRateAmount: number;
  totalFees: number;
  currentRate: number;
  hours: number;
  totalAmount: number;
  bodyguardFees: number;
  payables: PaymentDetail[];
  paid: boolean;
  details?: {
    paymentData: PaymentData;
  };
}

interface JobDate {
  start: string;
  end: string;
  virtualID: string;
  status: string;
  bodyguardID: string;
  payment: {
    amount: number;
    hours: number;
    currentRate: number;
  };
}

interface Job {
  id: string;
  status: string;
  address: Address;
  serviceType: string;
  uniform: Uniform;
  dates: JobDate[];
  description: string;
  notes: string;
  clientID: string;
  bodyguardID: string;
  accepted: boolean;
  totalHours: number;
  payment: Payment;
  rating: number;
  location: Location;
  createdAt: string;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

const JobDetailsPage: React.FC = () => {
  // This would normally come from API/router params
  const mockjob: Job = {
    id: "job09a689617359146846279549119693",
    status: "PENDING",
    address: {
      venue: "2237 Bell Spring",
      state: "Lagos",
    },
    serviceType: "Bodyguard",
    uniform: {
      type: "Sweatshirt",
      color: "green",
      addOns: [],
    },
    dates: [
      {
        start: "2024-01-03T05:35:29.667Z",
        end: "2024-01-03T07:35:29.667Z",
        virtualID: "datejobvirtual35c6f2517359146846233080109806",
        status: "PENDING",
        bodyguardID: "user7befb5d17354493711271198598c8f",
        payment: {
          amount: 900,
          hours: 2,
          currentRate: 450,
        },
      },
    ],
    description:
      "Try to compress the PCI sensor, maybe it will parse the back-end port!",
    notes: "We need to calculate the optical HDD panel!",
    clientID: "user7befb5d17354493711271198598c8f",
    bodyguardID: "user7befb5d17354493711271198598c8f",
    accepted: false,
    totalHours: 2,
    payment: {
      reference: null,
      amount: 1100,
      status: true,
      totalRateAmount: 900,
      totalFees: 200,
      currentRate: 450,
      hours: 2,
      totalAmount: 1100,
      bodyguardFees: 0,
      payables: [
        { name: "Total Rate for 2 Hours", value: 900 },
        { name: "Total fees", value: 200 },
        { name: "Total", value: 1100 },
      ],
      paid: true,
    },
    rating: 2.5,
    location: {
      lat: "-25.6392",
      long: "88.6724",
    },
    createdAt: "2025-01-03T14:31:24.641Z",
  };

  const [job, setJob] = React.useState<Job|null>(null);

  useEffect(() => {
    const savedJob = localStorage.getItem('job');
    if (savedJob) {
      setJob(JSON.parse(savedJob));
    } else {
      setJob(mockjob);
    }
  }, []);
  

  if (!job) {
    return <LoadingState />
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Security Job Details
          </h1>
          <div className="flex items-center space-x-4">
            <StatusBadge
              status={job.status}
              variant={
                job.status === "COMPLETED"
                  ? "success"
                  : job.status === "PENDING"
                  ? "warning"
                  : "info"
              }
            />
            <span className="text-gray-500">ID: {job.id}</span>
          </div>
        </div>
        <div>
          <button className="hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Cancel Job
          </button>
          <button className="hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Assign Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium">Service Type</p>
                <p className="text-gray-600">{job.serviceType}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-600">
                  {job.address.venue}, {job.address.state}
                </p>
                <p className="text-sm text-gray-500">
                  Coordinates: {job.location.lat}, {job.location.long}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium">Rating</p>
                <RatingStars rating={job.rating} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {job.dates.map((date, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Time Slot {index + 1}</p>
                    <p className="text-gray-600">
                      Start: {formatDate(date.start)}
                    </p>
                    <p className="text-gray-600">End: {formatDate(date.end)}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Duration: {date.payment.hours} hours
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Payment Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                {job.payment.payables.map((payable, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                  >
                    <span className="text-gray-600">{payable.name}</span>
                    <span className="font-medium">
                      {formatCurrency(payable.value)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="font-medium">Payment Status</span>
                <StatusBadge
                  status={job.payment.paid ? "PAID" : "PENDING"}
                  variant={job.payment.paid ? "success" : "warning"}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uniform Requirements Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shirt className="w-5 h-5" />
              <span>Uniform Requirements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: job.uniform.color }}
              />
              <div>
                <p className="font-medium">{job.uniform.type}</p>
                <p className="text-gray-600 capitalize">{job.uniform.color}</p>
              </div>
            </div>
            {job.uniform.addOns.length > 0 && (
              <div>
                <p className="font-medium mb-2">Additional Requirements</p>
                <ul className="list-disc list-inside text-gray-600">
                  {job.uniform.addOns.map((addon, index) => (
                    <li key={index}>{addon}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes and Description Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Additional Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-600">{job.description}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-gray-600">{job.notes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetailsPage;
