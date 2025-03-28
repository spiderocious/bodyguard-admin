export interface BodyguardType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  verified: boolean;
  deviceToken: string;
  gender: string;
  flags: {
    isVerified: boolean;
    isSuspended: boolean;
    suspensionReason: string;
  };
  featureAccess: {
    canWithdraw: boolean;
    canDeposit: boolean;
    canSetWorkRate: boolean;
    canAccessJobs: boolean;
    canAcceptJobs: boolean;
  };
  role: string;
  status: string;
  kyc: {
    isKYCVerified: boolean;
    isAutoKYCVerified: boolean;
    dob: string;
    address: {
      city: string;
      state: string;
      address: string;
    };
    experience: {
      value: number;
      unit: string;
    };
    body: {
      height: number;
      weight: number;
    };
    identity: {
      idProof: string;
      idProofType: string;
      idProofNumber: string;
      idProofBack: string;
    };
    facePhoto: string;
    fullBodyPhoto: string;
    kycLevel: string;
  };
  work: {
    availabilityStatus: boolean;
    currency: string;
    rate: number;
  };
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export const mockBodyguards: BodyguardType[] = [
  {
    id: "usere76a00217356560332413893088190",
    firstName: "Dusty",
    lastName: "West",
    email: "Rod_Nitzsche@yahoo.com",
    phoneNumber: "+2348053497157",
    verified: true,
    deviceToken: "",
    gender: "male",
    flags: {
      isVerified: true,
      isSuspended: false,
      suspensionReason: ""
    },
    featureAccess: {
      canWithdraw: true,
      canDeposit: true,
      canSetWorkRate: true,
      canAccessJobs: true,
      canAcceptJobs: true
    },
    role: "bodyguard",
    status: "ACTIVE",
    kyc: {
      isKYCVerified: true,
      isAutoKYCVerified: false,
      dob: "2001-01-02",
      address: {
        city: "Lagos",
        state: "Lagos",
        address: "1 Tunji osikoya street"
      },
      experience: {
        value: 5,
        unit: "years"
      },
      body: {
        height: 173,
        weight: 68
      },
      identity: {
        idProof: "referenceeeee",
        idProofType: "ninSlip",
        idProofNumber: "1344444444",
        idProofBack: "referenceeeee"
      },
      facePhoto: "dddkdd038ruihkn,cm,",
      fullBodyPhoto: "n8cNto4173195999382581141aWBqw",
      kycLevel: "0"
    },
    work: {
      availabilityStatus: false,
      currency: "NGN",
      rate: 20
    },
    rating: 2.5,
    createdAt: "2024-12-31T14:40:33.296Z",
    updatedAt: "2024-12-31T14:43:23.126Z"
  },
  {
    id: "user9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o",
    firstName: "James",
    lastName: "Johnson",
    email: "james.johnson@gmail.com",
    phoneNumber: "+2348062345678",
    verified: true,
    deviceToken: "",
    gender: "male",
    flags: {
      isVerified: true,
      isSuspended: false,
      suspensionReason: ""
    },
    featureAccess: {
      canWithdraw: true,
      canDeposit: true,
      canSetWorkRate: true,
      canAccessJobs: true,
      canAcceptJobs: true
    },
    role: "bodyguard",
    status: "ACTIVE",
    kyc: {
      isKYCVerified: true,
      isAutoKYCVerified: true,
      dob: "1995-05-15",
      address: {
        city: "Abuja",
        state: "FCT",
        address: "45 Unity Avenue"
      },
      experience: {
        value: 8,
        unit: "years"
      },
      body: {
        height: 185,
        weight: 90
      },
      identity: {
        idProof: "ref123456",
        idProofType: "driverLicense",
        idProofNumber: "DL789012",
        idProofBack: "ref789012"
      },
      facePhoto: "face123456",
      fullBodyPhoto: "body123456",
      kycLevel: "1"
    },
    work: {
      availabilityStatus: true,
      currency: "NGN",
      rate: 25
    },
    rating: 4.8,
    createdAt: "2024-11-15T09:30:00.000Z",
    updatedAt: "2024-12-30T15:45:00.000Z"
  },
  {
    id: "userp4q3r2s1t0u9v8w7x6y5z4a3b2c1d",
    firstName: "Sarah",
    lastName: "Adams",
    email: "sarah.adams@yahoo.com",
    phoneNumber: "+2348089012345",
    verified: true,
    deviceToken: "",
    gender: "female",
    flags: {
      isVerified: true,
      isSuspended: false,
      suspensionReason: ""
    },
    featureAccess: {
      canWithdraw: true,
      canDeposit: true,
      canSetWorkRate: true,
      canAccessJobs: true,
      canAcceptJobs: true
    },
    role: "bodyguard",
    status: "ACTIVE",
    kyc: {
      isKYCVerified: true,
      isAutoKYCVerified: true,
      dob: "1998-09-20",
      address: {
        city: "Port Harcourt",
        state: "Rivers",
        address: "78 Harbor Road"
      },
      experience: {
        value: 4,
        unit: "years"
      },
      body: {
        height: 170,
        weight: 65
      },
      identity: {
        idProof: "ref345678",
        idProofType: "passport",
        idProofNumber: "PP123456",
        idProofBack: "ref901234"
      },
      facePhoto: "face345678",
      fullBodyPhoto: "body345678",
      kycLevel: "2"
    },
    work: {
      availabilityStatus: true,
      currency: "NGN",
      rate: 22
    },
    rating: 4.2,
    createdAt: "2024-10-01T11:20:00.000Z",
    updatedAt: "2024-12-29T16:30:00.000Z"
  }
];