export interface GovernmentScheme {
  id: string;
  title: string;
  category: string;
  department: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  importantDates: {
    startDate: string;
    endDate: string;
    batchStart: string;
  };
  totalSeats: number;
  availableSeats: number;
  status: 'active' | 'upcoming' | 'closed';
  badge: string;
}

export interface GovernmentSchemeApplication {
  id: string;
  schemeId: string;
  schemeTitle: string;
  fullName: string;
  email: string;
  phone: string;
  studentId?: string;
  category: string;
  qualification: string;
  address: string;
  pincode: string;
  registrationDate: string;
  status: 'Registered Interest' | 'Application Submitted' | 'Under Review' | 'Approved';
}
