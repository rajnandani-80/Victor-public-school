export enum SectionId {
  Top = 'top',
  About = 'about',
  Admissions = 'admissions',
  Faculty = 'faculty',
  News = 'news',
  Contact = 'contact',
}

export enum Department {
  All = 'All Wings',
  ScienceMaths = 'Science & Maths Labs',
  LanguagesSST = 'English, Hindi & SST',
  ComputerSmart = 'Computer & Smart Class',
  PrePrimaryArts = 'Pre-School, Music & Sports',
}

export enum NewsCategory {
  All = 'All Notices',
  Admissions = 'Admission Circulars',
  Academics = 'CBSE & Exhibitions',
  Cultural = 'Panchmukhi & Cultural',
  Sports = 'Sports & Yoga',
}

export interface CourseItem {
  code: string;
  title: string;
  classesTaught: string;
}

export interface LeadershipMessage {
  id: 'chairman' | 'manager' | 'principal';
  roleLabel: string;
  name: string;
  qualification?: string;
  headline: string;
  message: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: Exclude<Department, Department.All>;
  experienceYears: number;
  qualifications: string[];
  portraitUrl?: string;
  portraitCaption?: string;
  isFeatured?: boolean;
  biography: string;
  specialization: string;
  subjects: CourseItem[];
  achievementHighlight: string;
  roomLocation: string;
  ptmHours: string;
  coCurricularRole: string;
}

export interface NewsArticle {
  id: string;
  tier: 1 | 2 | 3;
  circularNo: string;
  title: string;
  deck: string;
  category: Exclude<NewsCategory, NewsCategory.All>;
  publishedDate: string;
  readTimeMinutes: number;
  author: string;
  authorRole: string;
  imageUrl?: string;
  imageCaption?: string;
  pullQuote?: {
    text: string;
    attribution: string;
  };
  bodyParagraphs: string[];
}

export interface ContactPrefill {
  enquiryType?: string;
  applyingClass?: string;
  subjectContext?: string;
  initialMessage?: string;
}
