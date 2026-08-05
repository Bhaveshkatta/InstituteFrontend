import { Injectable, signal } from '@angular/core';
import { GovernmentScheme, GovernmentSchemeApplication } from '../models/government-scheme.model';

@Injectable({
  providedIn: 'root'
})
export class GovernmentCourseService {
  private readonly schemes = signal<GovernmentScheme[]>([
    {
      id: 'pmkvy-web',
      title: 'PMKVY 4.0 - Free Full Stack Web & Mobile App Development',
      category: 'Software Engineering',
      department: 'Pradhan Mantri Kaushal Vikas Yojana',
      description: 'Fully government-subsidized 6-month hands-on web engineering course. Covers HTML/CSS, JS, Angular, Node.js, and DB development with free books and official skill certificate.',
      eligibility: [
        'Passed 10+2 / Diploma / Graduation',
        'Age between 18 and 35 years',
        'Resident of Rajasthan with valid Aadhaar',
        'No prior government scheme benefit in last 12 months'
      ],
      benefits: [
        '100% Course Fee Waiver',
        'Free Study Kit & Software Licenses',
        'Govt Skill India & NSDC Certificate',
        'Stipend assistance upon 85%+ attendance'
      ],
      importantDates: {
        startDate: '01 Aug 2026',
        endDate: '31 Aug 2026',
        batchStart: '15 Sep 2026'
      },
      totalSeats: 60,
      availableSeats: 18,
      status: 'active',
      badge: 'Skill India Approved'
    },
    {
      id: 'free-nielit-ccc',
      title: 'Free NIELIT CCC & O-Level Certification Scheme',
      category: 'Government IT Certification',
      department: 'Dept. of Social Justice & Empowerment',
      description: 'Special scheme for SC / ST / OBC / EWS / Women candidates providing free computer training and full reimbursement of NIELIT examination fees.',
      eligibility: [
        'SC / ST / OBC / EWS / Female candidate',
        'Minimum 10th Pass from recognized board',
        'Annual family income under ₹2.5 Lakhs'
      ],
      benefits: [
        'Zero Tuition Fee',
        'Full Exam Fee Refund on Passing',
        'NIELIT National Level Certificate',
        'Priority placement for Govt Data Entry operator vacancies'
      ],
      importantDates: {
        startDate: '10 Aug 2026',
        endDate: '05 Sep 2026',
        batchStart: '20 Sep 2026'
      },
      totalSeats: 100,
      availableSeats: 42,
      status: 'active',
      badge: 'Full Fee Waiver'
    },
    {
      id: 'mmkvy-tally',
      title: 'Mukhyamantri Kaushal Vikas Yojana - Tally Prime & GST',
      category: 'Accounting & Taxation',
      department: 'State Skill Development Mission',
      description: 'Practical 3-month course in computerized accounting, GST filing, TDS, and voucher entries using latest Tally Prime software.',
      eligibility: [
        '10+2 Pass with Commerce/Arts/Science',
        'Basic computer knowledge',
        'Age 18 - 30 years'
      ],
      benefits: [
        'Free Authorized Tally Training',
        'Live Project Practice on Real Bills',
        'Job Fair & Local Accounting Placement Support'
      ],
      importantDates: {
        startDate: '15 Jul 2026',
        endDate: '25 Aug 2026',
        batchStart: '01 Sep 2026'
      },
      totalSeats: 50,
      availableSeats: 9,
      status: 'active',
      badge: 'State Govt Scheme'
    }
  ]);

  private readonly userApplications = signal<GovernmentSchemeApplication[]>([]);

  getSchemes() {
    return this.schemes.asReadonly();
  }

  getActiveSchemes() {
    return signal(this.schemes().filter(s => s.status === 'active')).asReadonly();
  }

  getSchemeById(id: string): GovernmentScheme | undefined {
    return this.schemes().find(s => s.id === id);
  }

  submitApplication(app: Omit<GovernmentSchemeApplication, 'id' | 'registrationDate' | 'status'>): GovernmentSchemeApplication {
    const newApp: GovernmentSchemeApplication = {
      ...app,
      id: `KC-GOV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      registrationDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: app.studentId ? 'Application Submitted' : 'Registered Interest'
    };

    this.userApplications.update(list => [newApp, ...list]);
    return newApp;
  }

  getUserApplications() {
    return this.userApplications.asReadonly();
  }
}
