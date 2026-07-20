import { Injectable, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { Testimonial } from '../models/testimonial.model';
import { Feature } from '../models/feature.model';
import { FAQ } from '../models/faq.model';
import { Statistic } from '../models/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly statistics = signal<Statistic[]>([
    { id: 1, value: '15+', label: 'Years of Excellence', icon: 'history', color: '#1976d2' },
    { id: 2, value: '5000+', label: 'Students Trained', icon: 'people', color: '#2196f3' },
    { id: 3, value: '25+', label: 'Advanced Courses', icon: 'school', color: '#03a9f4' },
    { id: 4, value: '98%', label: 'Placement Rate', icon: 'trending_up', color: '#00bcd4' }
  ]);

  private readonly features = signal<Feature[]>([
    { id: 1, title: 'Expert Instructors', description: 'Learn from industry professionals with years of teaching and development experience.', icon: 'person' },
    { id: 2, title: 'Modern Computer Labs', description: 'Fully air-conditioned, high-speed internet equipped labs with individual systems for practice.', icon: 'computer' },
    { id: 3, title: '100% Practical Focus', description: 'Every lecture is paired with hands-on practice, coding challenges, and live projects.', icon: 'construction' },
    { id: 4, title: 'Flexible Batch Timings', description: 'Choose from multiple batches throughout the day (8:00 AM - 8:00 PM) to fit your schedule.', icon: 'schedule' },
    { id: 5, title: 'Placement Assistance', description: 'Get help with resume building, mock technical interviews, and referrals to local tech recruiters.', icon: 'work' },
    { id: 6, title: 'Affordable Fee Structure', description: 'Reasonable fees with zero-interest installment plans to make computer education accessible.', icon: 'payments' }
  ]);

  private readonly courses = signal<Course[]>([
    {
      id: 'web-dev',
      title: 'Full Stack Web Development',
      description: 'Master HTML5, CSS3, JavaScript, TypeScript, Angular, Node.js, Express, and MongoDB. Build and deploy fully responsive, dynamic web applications.',
      duration: '6 Months',
      price: '₹15,000',
      rating: 4.9,
      reviewsCount: 142,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60',
      category: 'Software Development',
      features: ['HTML/CSS/JS/TS', 'Angular & Material Design', 'Node.js & MongoDB', 'Live Project Deployment', 'Resume Prep & Mock Interviews']
    },
    {
      id: 'python-data',
      title: 'Python & Data Science',
      description: 'Go from basics to advanced Python, covering Object-Oriented Programming, NumPy, Pandas, Matplotlib, and foundations of Machine Learning algorithms.',
      duration: '4 Months',
      price: '₹12,000',
      rating: 4.8,
      reviewsCount: 98,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60',
      category: 'Programming',
      features: ['Python Core & Advanced', 'Data Analysis with Pandas', 'Visualizations with Seaborn', 'Introduction to Scikit-Learn', 'Capstone Data Project']
    },
    {
      id: 'tally-gst',
      title: 'Tally Prime with GST & Tax',
      description: 'Comprehensive accounting program covering manual accounting concepts, Tally Prime interface, inventory management, TDS, TCS, and GST return filing.',
      duration: '3 Months',
      price: '₹8,000',
      rating: 4.7,
      reviewsCount: 165,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60',
      category: 'Accounting & Finance',
      features: ['Double Entry Bookkeeping', 'Voucher Entry in Tally', 'GST Computation & Invoicing', 'TDS & Payroll Management', 'Live Case Studies']
    },
    {
      id: 'ccc-olevel',
      title: 'CCC & NIELIT O-Level',
      description: 'Prepare thoroughly for government-recognized IT certifications. Covers computer fundamentals, operating systems, LibreOffice, and internet concepts.',
      duration: '3 to 12 Months',
      price: '₹5,000',
      rating: 4.6,
      reviewsCount: 110,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60',
      category: 'Government Certifications',
      features: ['Syllabus Aligned with NIELIT', 'Previous Years Question Papers', 'Mock Online Exams', 'LibreOffice Suite', 'Computer Basics']
    },
    {
      id: 'cyber-sec',
      title: 'Cyber Security & Ethical Hacking',
      description: 'Learn networks security, scanning targets, vulnerability assessments, system hacking, web server attacks, cryptography, and defensive security measures.',
      duration: '5 Months',
      price: '₹18,000',
      rating: 4.9,
      reviewsCount: 74,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60',
      category: 'Information Security',
      features: ['Linux & Networking Basics', 'Ethical Hacking Methodologies', 'Metasploit & Nmap Practice', 'OWASP Top 10 Vulnerabilities', 'CTF Challenges']
    }
  ]);

  private readonly testimonials = signal<Testimonial[]>([
    {
      id: 1,
      name: 'Amit Khandelwal',
      role: 'Full Stack Engineer, TechCorp',
      comment: 'Khandelwal Computers provided me with the exact programming foundation I needed. The hands-on project training on Angular and Node helped me clear my first job interview with ease.',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Junior Accountant, FinSolutions',
      comment: 'I did the Tally Prime with GST course here. The instructors explained taxation and voucher entries in such a clear, practical way. I am now working full-time managing accounts!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rating: 5
    },
    {
      id: 3,
      name: 'Rahul Gupta',
      role: 'Student, BCA',
      comment: 'The labs are spacious and open throughout the day, which gives me plenty of time to practice. The instructors are always around to help debug code or answer questions.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 4
    }
  ]);

  private readonly faqs = signal<FAQ[]>([
    {
      id: 1,
      question: 'Do you provide course completion certificates?',
      answer: 'Yes, all students receive a course completion certificate signed by Khandelwal Computers upon successfully completing all project work and passing the end-of-course test.'
    },
    {
      id: 2,
      question: 'What are the batch timings and lab hours?',
      answer: 'Classes run hourly from 8:00 AM to 8:00 PM, Monday to Saturday. The computer labs are open during these same hours, and students are welcome to use them for self-practice whenever a system is free.'
    },
    {
      id: 3,
      question: 'Is there a provision to pay fees in installments?',
      answer: 'Yes, to make courses accessible, we allow fees to be split into monthly installments for all courses with a duration of 3 months or longer. A discount is also available for one-time full payments.'
    },
    {
      id: 4,
      question: 'Do you guarantee jobs or placement?',
      answer: 'While we do not guarantee jobs, we provide dedicated placement support including mock interviews, resume refinement, profile reviews, and active referrals to local businesses and startups looking for fresh talent.'
    },
    {
      id: 5,
      question: 'Can I take a demo class before enrolling?',
      answer: 'Absolutely! We encourage prospective students to attend up to two demo sessions for any course to experience our teaching methodology and lab environment firsthand.'
    }
  ]);

  private readonly galleryImages = signal<string[]>([
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60', // Classroom
    'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=60', // Lab
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60', // Students
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60', // Certificates
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=60', // Seminar
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=60'  // Group practice
  ]);

  getStatistics() {
    return this.statistics.asReadonly();
  }

  getFeatures() {
    return this.features.asReadonly();
  }

  getCourses() {
    return this.courses.asReadonly();
  }

  getTestimonials() {
    return this.testimonials.asReadonly();
  }

  getFAQs() {
    return this.faqs.asReadonly();
  }

  getGalleryImages() {
    return this.galleryImages.asReadonly();
  }
}
