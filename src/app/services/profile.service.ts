import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface QualificationDetail {
  board: string;
  passingYear: string;
  stream: string;
  percentage: string;
  grade: string;
}

export interface CandidateProfile {
  // Basic Details
  fullName: string;
  motherName: string;
  fatherName: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  category: string;
  physicallyChallenged: string;
  mediumOfStudy: string;
  aadharNo: string;
  panNo?: string;
  email: string;
  phone: string;
  studentId: string;

  // Address Info
  address: string;
  city: string;
  state: string;
  pincode: string;

  // Qualifications
  tenth: QualificationDetail;
  twelfth: QualificationDetail;
  graduation: QualificationDetail;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  candidateProfile = signal<CandidateProfile>({
    fullName: 'Rahul Gupta',
    motherName: 'Sunita Gupta',
    fatherName: 'Rajesh Gupta',
    dob: '2002-05-14',
    gender: 'Male',
    maritalStatus: 'Single',
    category: 'General',
    physicallyChallenged: 'No',
    mediumOfStudy: 'English',
    aadharNo: '987654321012',
    panNo: 'ABCDE1234F',
    email: 'rahul.gupta@example.com',
    phone: '9876543210',
    studentId: 'KC-2024-0412',

    address: '124, Station Road, Near Central Bank',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',

    tenth: {
      board: 'RBSE Jaipur',
      passingYear: '2018',
      stream: 'General All Subjects',
      percentage: '85.4%',
      grade: 'First Division'
    },
    twelfth: {
      board: 'RBSE Jaipur',
      passingYear: '2020',
      stream: 'Science (PCM)',
      percentage: '82.0%',
      grade: 'First Division'
    },
    graduation: {
      board: 'University of Rajasthan',
      passingYear: '2023',
      stream: 'B.Sc. Computer Science',
      percentage: '78.5%',
      grade: 'First Division'
    }
  });

  // Check profile completion rate (0 - 100%)
  completionPercentage = computed(() => {
    const p = this.candidateProfile();
    const requiredFields = [
      p.fullName,
      p.motherName,
      p.fatherName,
      p.dob,
      p.gender,
      p.maritalStatus,
      p.category,
      p.physicallyChallenged,
      p.mediumOfStudy,
      p.aadharNo,
      p.email,
      p.phone,
      p.address,
      p.city,
      p.state,
      p.pincode,
      p.tenth.board,
      p.tenth.passingYear,
      p.tenth.percentage,
      p.twelfth.board,
      p.twelfth.passingYear,
      p.twelfth.percentage
    ];

    const filledCount = requiredFields.filter(f => f && f.toString().trim().length > 0).length;
    return Math.round((filledCount / requiredFields.length) * 100);
  });

  isProfileComplete = computed(() => this.completionPercentage() >= 90);

  updateProfile(updated: Partial<CandidateProfile>): void {
    this.candidateProfile.update(prev => ({
      ...prev,
      ...updated
    }));
  }

  // Helper method to guard course enrollment / application submission
  checkProfileAndProceed(router: Router, onCompleteAction: () => void, alertMessageCallback?: (msg: string) => void): void {
    if (this.isProfileComplete()) {
      onCompleteAction();
    } else {
      const msg = 'Please complete your Candidate Details (Basic Details, Address & Qualifications) in your Profile before applying or enrolling.';
      if (alertMessageCallback) {
        alertMessageCallback(msg);
      } else {
        alert(msg);
      }
      router.navigate(['/student/profile']);
    }
  }
}
