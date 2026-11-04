import vpsDelhiCampusImg from '../assets/images/vps_delhi_campus_1793774078571.jpg';
import vpsSmartClassImg from '../assets/images/vps_smart_class_1793774079095.jpg';
import indianScienceLabImg from '../assets/images/indian_science_lab_1793773140498.jpg';
import indianArtsLibraryImg from '../assets/images/indian_arts_library_1793773141690.jpg';
import principalIndianImg from '../assets/images/principal_indian_portrait_1793773143800.jpg';
import hodScienceImg from '../assets/images/hod_science_portrait_1793773144125.jpg';
import {
  Department,
  FacultyMember,
  LeadershipMessage,
  NewsArticle,
  NewsCategory,
} from '../types/school';

export const VPS_IMAGES = {
  campusHero: vpsDelhiCampusImg,
  smartClass: vpsSmartClassImg,
  scienceLab: indianScienceLabImg,
  libraryHall: indianArtsLibraryImg,
  principalPortrait: principalIndianImg,
  scienceHeadPortrait: hodScienceImg,
};

export const PANCHMUKHI_PILLARS = [
  {
    index: '01',
    title: 'Intellectual Development (Bauddhik Vikas)',
    description:
      'Strict adherence to NCERT & C.B.S.E. curricula reinforced through interactive Smart Class boards, Science & Mathematics laboratories, and analytical problem-solving.',
  },
  {
    index: '02',
    title: 'Physical Fitness (Sharirik Vikas)',
    description:
      'Morning PT drills, yoga, indoor/outdoor games, annual athletic meets, and regular health check-ups supported by our on-campus Medical Infirmary.',
  },
  {
    index: '03',
    title: 'Emotional Balance (Bhavnatmak Vikas)',
    description:
      'Caring teacher-student mentorship, art, music, dance, and joyful Toy & Activity Rooms that ensure a stress-free, encouraging atmosphere for every child.',
  },
  {
    index: '04',
    title: 'Moral Character (Naitik Vikas)',
    description:
      'Instilling honesty, discipline, respect for elders, civic responsibility, and hard work—teaching children that there are no shortcuts to genuine achievement.',
  },
  {
    index: '05',
    title: 'Spiritual & Cultural Roots (Adhyatmik Vikas)',
    description:
      'Morning value assemblies, celebration of Indian festivals, mindfulness, and seva initiatives that keep students grounded in timeless Bharatiya sanskar.',
  },
];

export const CAMPUS_FACILITIES = [
  {
    title: 'Smart Classrooms',
    detail:
      'Spacious, well-ventilated classrooms equipped with digital Smart Class audio-visual modules to make NCERT concepts clear and memorable.',
  },
  {
    title: 'Science, Maths & Computer Labs',
    detail:
      'Dedicated Physics, Chemistry, Biology, Mathematics, and modern Computer laboratories for hands-on experiments and coding literacy.',
  },
  {
    title: 'Pre-School Toy & Activity Rooms',
    detail:
      'Child-safe Montessori Toy Room, creative Activity Hall, and Music & Dance studio tailored for joyful Pre-School and Primary learning.',
  },
  {
    title: 'Library & Reading Corner',
    detail:
      'Well-stocked school library featuring NCERT reference books, Hindi & English storybooks, encyclopaedias, periodicals, and daily newspapers.',
  },
  {
    title: 'Earthquake-Resistant, Fire & CCTV Safe',
    detail:
      'Earthquake-resistant school building equipped with certified firefighting systems, 24×7 CCTV surveillance, and purified RO drinking water.',
  },
  {
    title: 'Medical Infirmary & School Transport',
    detail:
      'Dedicated first-aid Infirmary for student healthcare alongside safe school transport covering Tehsil Camp, Krishan Nagar, Model Town & Panipat sectors.',
  },
];

export const LEADERSHIP_MESSAGES: LeadershipMessage[] = [
  {
    id: 'chairman',
    roleLabel: 'Chairman’s Message',
    name: 'Sh. V. P. Panchal',
    qualification: 'Founder & Chairman, Victor Public School',
    headline: 'True education builds character through perseverance, values, and continuous effort.',
    message: [
      'Since founding Victor Public School at Krishan Nagar, Tehsil Camp, Panipat in 1996, our guiding belief has remained steadfast: there is no shortcut to lasting success. Academic excellence flourishes best when paired with discipline, sincerity, and deep respect for Indian cultural values.',
      'Through our Panchmukhi Shiksha approach, we strive to ensure that every child in Panipat receives high-quality English-medium CBSE education in a safe, affordable, and inspiring environment.',
    ],
  },
  {
    id: 'manager',
    roleLabel: 'Manager’s Message',
    name: 'Mr. Gaurav Panchal',
    qualification: 'Manager, Victor Public School, Panipat',
    headline: 'Blending modern digital infrastructure with personal care for every family.',
    message: [
      'At Victor Public School, we continually upgrade our learning ecosystem—from interactive Smart Classrooms, Computer and Science laboratories to CCTV campus security and online parent services—so our students stand shoulder-to-shoulder with the best across Haryana and India.',
      'We view parents as equal partners in a child’s journey and maintain an open, transparent administrative office at Krishan Nagar, Tehsil Camp to support every learner’s academic and co-curricular aspirations.',
    ],
  },
  {
    id: 'principal',
    roleLabel: 'Principal’s Message',
    name: 'Mrs. Sunita Sharma',
    qualification: 'M.A., B.Ed. · Head of Institution',
    headline: 'Empowering curious learners through NCERT conceptual clarity and holistic confidence.',
    message: [
      'Every child enters school with unique curiosity and potential. Following the CBSE and NEP 2020 framework, our teachers focus on experiential understanding rather than rote memorization—encouraging students to ask questions in the lab, express themselves on stage, and act with empathy.',
      'Whether in our joyful Pre-School Toy Room or our disciplined Secondary board batches, we are committed to nurturing balanced, articulate, and responsible citizens of India.',
    ],
  },
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'sunita-sharma-principal',
    name: 'Mrs. Sunita Sharma',
    designation: 'Principal & Senior Educator — English',
    department: Department.LanguagesSST,
    experienceYears: 22,
    qualifications: [
      'M.A. (English Literature), Kurukshetra University',
      'B.Ed., Maharshi Dayanand University (MDU), Rohtak',
    ],
    portraitUrl: principalIndianImg,
    portraitCaption: 'Mrs. Sunita Sharma in the Victor Public School Central Library.',
    isFeatured: true,
    biography:
      'Leading academic planning and CBSE curriculum execution at Victor Public School, Panipat, Mrs. Sharma oversees teacher mentorship, NEP 2020 competency assessments, and student counselling across all wings.',
    specialization: 'CBSE Communicative English, Reading Fluency & Value Education',
    subjects: [
      { code: 'CBSE-184', title: 'English Language & Literature', classesTaught: 'Class IX & X' },
      { code: 'PM-101', title: 'Panchmukhi Shiksha & Life Skills', classesTaught: 'All Wings' },
    ],
    achievementHighlight:
      'Guided Victor Public School to consistent 100% CBSE Secondary Board pass results with high distinctions.',
    roomLocation: 'Principal’s Office, Ground Floor (Main Block)',
    ptmHours: 'Working Saturdays, 9:00 AM – 12:30 PM & By Appointment',
    coCurricularRole: 'Patron, Academic & Discipline Committee',
  },
  {
    id: 'rajeev-verma-science',
    name: 'Mr. Rajeev Kumar Verma',
    designation: 'Senior Coordinator — Science & Mathematics Labs (TGT)',
    department: Department.ScienceMaths,
    experienceYears: 17,
    qualifications: [
      'M.Sc. Physics, Kurukshetra University',
      'B.Ed. (Science & Mathematics), MDU, Rohtak',
    ],
    portraitUrl: hodScienceImg,
    portraitCaption: 'Mr. Rajeev Kumar Verma in the Senior Science Laboratory.',
    isFeatured: true,
    biography:
      'Mr. Verma coordinates practical experiments across Physics, Chemistry, and Mathematics labs, ensuring students master NCERT theorems through real apparatus demonstrations and annual science exhibitions.',
    specialization: 'NCERT Experimental Science, Optics & Olympiad Readiness',
    subjects: [
      { code: 'CBSE-086', title: 'Science (Theory & Lab Practicals)', classesTaught: 'Class IX & X' },
      { code: 'MAT-041', title: 'Mathematics Lab Activity Module', classesTaught: 'Class VIII – X' },
    ],
    achievementHighlight:
      'Mentored student teams winning District & State Level Science Exhibition awards in Panipat, Haryana.',
    roomLocation: 'Science Laboratory Wing, First Floor',
    ptmHours: 'PTM Saturdays, 9:00 AM – 12:30 PM',
    coCurricularRole: 'In-Charge, Science Club & Inter-School Quiz Contingent',
  },
  {
    id: 'poonam-aggarwal-maths',
    name: 'Mrs. Poonam Aggarwal',
    designation: 'Senior Teacher — Mathematics Lab (TGT)',
    department: Department.ScienceMaths,
    experienceYears: 15,
    qualifications: [
      'M.Sc. Mathematics, Panjab University',
      'B.Ed., Kurukshetra University',
    ],
    biography:
      'Mrs. Aggarwal leads activity-based geometry, algebra, and mental maths sessions in the Mathematics Lab, removing math phobia through visual kits and regular remedial worksheets.',
    specialization: 'NCERT Geometry, Trigonometry & Aryabhata Ganit Challenge Prep',
    subjects: [
      { code: 'CBSE-041', title: 'Mathematics Standard & Basic', classesTaught: 'Class IX & X' },
      { code: 'MAT-MID', title: 'Middle Wing Conceptual Maths', classesTaught: 'Class VI – VIII' },
    ],
    achievementHighlight:
      'Over 35% of Secondary batch students secured 90+ marks in CBSE Mathematics.',
    roomLocation: 'Mathematics Lab, First Floor, Room 106',
    ptmHours: 'PTM Saturdays, 9:00 AM – 12:30 PM',
    coCurricularRole: 'Coordinator, Exam Cell & Time-Table Committee',
  },
  {
    id: 'deepak-shastri-hindi',
    name: 'Mr. Deepak Shastri',
    designation: 'Senior Educator — Hindi, Sanskrit & Naitik Shiksha (TGT)',
    department: Department.LanguagesSST,
    experienceYears: 18,
    qualifications: [
      'M.A. Hindi & Shastri (Sanskrit), Kurukshetra University',
      'B.Ed., Chaudhary Ranbir Singh University (CRSU)',
    ],
    biography:
      'Mr. Shastri anchors Hindi Sahitya, Sanskrit grammar, and the moral-spiritual pillar of Panchmukhi Shiksha through morning shloka recitation, Doha competitions, and bilingual debate.',
    specialization: 'Hindi Course-A, Communicative Sanskrit & Moral Values',
    subjects: [
      { code: 'CBSE-002', title: 'Hindi Course-A (Kshitij & Kritika)', classesTaught: 'Class IX & X' },
      { code: 'CBSE-122', title: 'Sanskrit Grammar & Subhashitani', classesTaught: 'Class VI – VIII' },
    ],
    achievementHighlight:
      'Trained District-Level Hindi Debate & Sanskrit Shloka Recitation winners across Panipat.',
    roomLocation: 'Language Wing, Second Floor, Room 203',
    ptmHours: 'PTM Saturdays, 9:00 AM – 12:30 PM',
    coCurricularRole: 'Convener, Morning Assembly & Panchmukhi Sanskar Club',
  },
  {
    id: 'neha-gupta-computer',
    name: 'Ms. Neha Gupta',
    designation: 'Coordinator — Computer Lab & Smart Class Integration',
    department: Department.ComputerSmart,
    experienceYears: 11,
    qualifications: [
      'M.C.A. (Master of Computer Applications), Kurukshetra University',
      'B.Sc. (Computer Science), MDU, Rohtak',
    ],
    biography:
      'Ms. Gupta manages the Computer Laboratory and supports teachers with interactive Smart Class multimedia lessons, teaching students IT fundamentals, cyber safety, HTML, and Python basics.',
    specialization: 'CBSE Information Technology (Code 402), Cyber Hygiene & Digital Projects',
    subjects: [
      { code: 'CBSE-402', title: 'Information Technology (NSQF Skill)', classesTaught: 'Class IX & X' },
      { code: 'CMP-104', title: 'Coding, TuxPaint, Scratch & MS Office', classesTaught: 'Class III – VIII' },
    ],
    achievementHighlight:
      '100% distinction record in CBSE Class X Information Technology practical & theory assessments.',
    roomLocation: 'Computer Laboratory, First Floor',
    ptmHours: 'PTM Saturdays, 9:00 AM – 12:30 PM',
    coCurricularRole: 'Coordinator, Online Portal & Digital Smart Classes',
  },
  {
    id: 'ritu-malhotra-preprimary',
    name: 'Mrs. Ritu Malhotra',
    designation: 'In-Charge — Pre-School Toy Room, Activity, Music & Dance Wing',
    department: Department.PrePrimaryArts,
    experienceYears: 14,
    qualifications: [
      'B.A., Nursery Primary Teacher Training (NPTT) Diploma',
      'Senior Diploma in Hindustani Vocal & Folk Dance, Prayag Sangeet Samiti',
    ],
    biography:
      'Mrs. Malhotra curates joyful play-way phonics, clay modelling, puppet storytelling, and festival dance celebrations for our youngest Pre-School (Nursery), KG, and Primary learners.',
    specialization: 'Early Childhood Play-Way Pedagogy, Toy Room Motor Skills & Cultural Dance',
    subjects: [
      { code: 'PRE-01', title: 'Foundational Literacy, Numeracy & Toy Room Play', classesTaught: 'Pre-School & Pre-Primary' },
      { code: 'ART-02', title: 'Music, Folk Dance & Festival Crafts', classesTaught: 'Class I – V' },
    ],
    achievementHighlight:
      'Choreographed Victor Public School’s acclaimed Annual Function cultural tableaux.',
    roomLocation: 'Pre-Primary Toy & Activity Wing, Ground Floor',
    ptmHours: 'PTM Saturdays, 9:30 AM – 12:00 PM',
    coCurricularRole: 'In-Charge, Annual Day Cultural Celebrations & Toy Room',
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'nursery-admission-schedule-2027-28',
    tier: 1,
    circularNo: 'VPS/ADM/2026-27/11',
    title: 'Pre-School (Nursery), KG & Class I–IX Admissions Open for Session 2027–28',
    deck: 'Online Registration Forms and school office prospectus forms are now open at Krishan Nagar, Tehsil Camp, Panipat in accordance with CBSE & NEP 2020 norms.',
    category: NewsCategory.Admissions,
    publishedDate: '01 November 2026',
    readTimeMinutes: 3,
    author: 'Admission Cell',
    authorRole: 'Victor Public School, Panipat',
    imageUrl: vpsSmartClassImg,
    imageCaption:
      'Interactive Smart Class session at Victor Public School fostering joyful NCERT conceptual clarity.',
    pullQuote: {
      text: 'Every child in Tehsil Camp, Krishan Nagar, and Panipat deserves modern Smart Class education anchored in strong moral sanskar.',
      attribution: 'Management & Principal, Victor Public School',
    },
    bodyParagraphs: [
      'Victor Public School, Krishan Nagar, Tehsil Camp, Panipat (Haryana – 132103) invites applications for Pre-School (Nursery), Pre-Primary (KG), Class I, and limited seats in Classes II to IX for the upcoming Academic Session 2027–28.',
      'Transparent admission parameters apply for entry-level seats—giving priority to Neighbourhood proximity (Krishan Nagar, Tehsil Camp, Ram Nagar, Desraj Colony, Model Town, Sector 11–12 & Sanoli Road), Real Sibling studying in VPS, and School Alumni wards.',
      'Parents may submit the Online Registration Enquiry directly on this website or collect the offline registration form from the School Reception at Krishan Nagar, Tehsil Camp between 8:30 AM and 1:30 PM on all working days.',
    ],
  },
  {
    id: 'science-maths-computer-exhibition-2026',
    tier: 2,
    circularNo: 'VPS/ACAD/2026-27/09',
    title: 'Students Showcase Working Models at Annual Science, Maths & Computer Exhibition',
    deck: 'Over 140 students from Classes IV to X demonstrated rainwater harvesting, earthquake-alarm models, Vedic math kits, and smart irrigation prototypes.',
    category: NewsCategory.Academics,
    publishedDate: '21 October 2026',
    readTimeMinutes: 3,
    author: 'Mr. Rajeev Kumar Verma',
    authorRole: 'Science & Maths Lab Coordinator',
    imageUrl: indianScienceLabImg,
    imageCaption:
      'Students presenting working science and electronics models during the Annual Exhibition.',
    pullQuote: {
      text: 'Hands-on laboratory work builds lasting curiosity and prepares students effortlessly for CBSE board practicals.',
      attribution: 'Science Department, Victor Public School',
    },
    bodyParagraphs: [
      'Parents and educators visited the Science, Mathematics, and Computer Laboratories last Saturday as students of Victor Public School, Panipat presented 62 working scientific and mathematical models.',
      'Highlights included a working earthquake-resistant building demonstration, solar street-lighting circuits, interactive geometrical theorem boards, and cyber-safety awareness booths created by Class IX and X IT students.',
    ],
  },
  {
    id: 'panchmukhi-annual-function-celebration',
    tier: 2,
    circularNo: 'VPS/CULT/2026-27/07',
    title: 'Panchmukhi Shiksha Utsav & Library Reading Week Celebrated Across All Wings',
    deck: 'Students participated in Hindi-English declamation, folk dance, storytelling, and moral-values skits celebrating 30 years of Victor Public School (1996–2026).',
    category: NewsCategory.Cultural,
    publishedDate: '10 October 2026',
    readTimeMinutes: 3,
    author: 'Cultural & Library Committee',
    authorRole: 'Event Report',
    imageUrl: indianArtsLibraryImg,
    imageCaption:
      'Students engaged in guided reading and creative sketching during Library Reading Week.',
    bodyParagraphs: [
      'Commemorating three decades since our establishment in 1996, Victor Public School hosted a week-long Panchmukhi Shiksha celebration uniting intellectual, artistic, moral, and spiritual student activities.',
      'Primary wing children delighted parents with patriotic action songs, Haryanvi & classical folk dances, and Toy Room art displays, while Middle and Secondary students competed in inter-house quiz, Sanskrit shloka recitation, and poster-making on Clean & Green Panipat.',
    ],
  },
  {
    id: 'winter-uniform-and-ptm-notice-nov-2026',
    tier: 3,
    circularNo: 'VPS/CIR/2026-27/14',
    title: 'Parent Circular: Term-I PTM Schedule & Transition to Winter School Uniform',
    deck: 'Parent-Teacher Meeting will be held on Saturday, 14 November 2026 from 9:00 AM to 12:30 PM; winter uniform mandatory from 16 November.',
    category: NewsCategory.Academics,
    publishedDate: '02 November 2026',
    readTimeMinutes: 2,
    author: 'Principal’s Office',
    authorRole: 'Official Parent Notice',
    bodyParagraphs: [
      'All parents are cordially invited to attend the Term-I Parent-Teacher Meeting on Saturday, 14 November 2026 between 9:00 AM and 12:30 PM to review answer sheets and holistic progress cards.',
      'Students must attend in neat school uniform along with parents. Full winter uniform will be observed across Pre-School to Class X effective Monday, 16 November 2026.',
    ],
  },
  {
    id: 'zonal-yoga-and-athletic-meet-medals',
    tier: 3,
    circularNo: 'VPS/SPT/2026-27/05',
    title: 'VPS Contingent Wins 9 Medals in Panipat District & Inter-School Yoga & Kho-Kho Meet',
    deck: 'Sub-junior and junior boys and girls brought laurels in rhythmic yoga postures, 100m sprint, and inter-school Kho-Kho.',
    category: NewsCategory.Sports,
    publishedDate: '29 September 2026',
    readTimeMinutes: 2,
    author: 'Physical Education Dept.',
    authorRole: 'Sports Desk',
    bodyParagraphs: [
      'Representing Victor Public School in the Panipat District Inter-School Sports Tournament, our students secured 3 Gold, 4 Silver, and 2 Bronze medals in Yoga and Kho-Kho events.',
      'Chairman Sh. V. P. Panchal and Manager Mr. Gaurav Panchal felicitated all medal winners with certificates and trophies during Monday’s morning assembly.',
    ],
  },
];

export const MANDATORY_DISCLOSURE_ROWS = [
  { label: 'Name of the School', value: 'Victor Public School' },
  { label: 'Affiliation / Board', value: 'Affiliated to C.B.S.E., New Delhi (NCERT Curriculum)' },
  { label: 'Medium & Category', value: 'English-Medium Co-Educational School' },
  { label: 'Year of Establishment', value: '1996' },
  { label: 'Complete Postal Address', value: 'Krishan Nagar, Tehsil Camp, Panipat, Haryana – 132103' },
  { label: 'Official Email ID', value: 'info@victorpublicschool.org.in' },
  { label: 'Official Contact Numbers', value: '+91-8375908693, 0180-2639151' },
  { label: 'Campus Safety & Health', value: 'Earthquake-Resistant, Fire Safety Certified, CCTV & Infirmary' },
];

export const ADMISSIONS_CRITERIA = {
  nursery: {
    heading: 'Pre-School (Nursery) & Pre-Primary (KG) Entry',
    ageRule:
      'Pre-School (Nursery): 3+ years · Pre-Primary (KG): 4+ years · Class I: 5+/6+ years as per NEP 2020 & State Education norms (as on 31 March 2027).',
    process:
      'Transparent Neighbourhood, Sibling & Alumni priority parameters. Zero written test or formal interview for Nursery & KG children.',
    timings: '8:30 AM – 12:30 PM (Dedicated Toy Room & Activity Wing)',
  },
  primary: {
    heading: 'Primary Wing (Class I to Class V)',
    ageRule:
      'Age appropriate as per CBSE & Haryana Education norms with Birth Certificate / previous school record.',
    process:
      'Friendly readiness interaction & document verification (Birth Certificate, Aadhaar / PPP Family ID & Residence Proof).',
    timings: '8:00 AM – 1:45 PM (Smart Class, Computer, Music & Dance)',
  },
  secondary: {
    heading: 'Middle & Secondary Wing (Class VI to Class X)',
    ageRule:
      'Passed previous class from a recognised school with countersigned Transfer Certificate (TC) / SLC & UDISE PEN.',
    process:
      'Basic NCERT subject interaction in English, Hindi, Maths & Science + previous report card review.',
    timings: '7:50 AM – 2:00 PM (Science, Maths & IT Practical Labs)',
  },
};

export const VPS_DOCUMENTS_REQUIRED = [
  {
    id: 'dob_aadhaar',
    title: 'Date of Birth (DOB) Certificate & Child’s Aadhaar Card',
    detail: 'Self-attested photocopy along with original for verification at School Office.',
  },
  {
    id: 'residence_ppp',
    title: 'Residence Proof & Haryana Parivar Pehchan Patra (PPP / Family ID)',
    detail: 'Electricity Bill, Ration Card, Voter ID, Aadhaar Address, or PPP Family ID copy.',
  },
  {
    id: 'parents_aadhaar_photos',
    title: 'Aadhaar Cards of Both Father & Mother + Passport Photos',
    detail: '4 recent coloured passport-size photographs of the child and 2 each of Mother & Father.',
  },
  {
    id: 'blood_medical',
    title: 'Child’s Blood Group Report & Immunisation Record',
    detail: 'Required for student health card in the school Medical / Infirmary room.',
  },
  {
    id: 'sibling_category_tc',
    title: 'Sibling / Alumni Proof, Category Certificate (SC/BC) or Previous SLC/TC',
    detail: 'If applicable; School Leaving Certificate (SLC / TC) & UDISE PEN required for Class II onwards.',
  },
];

export const CAMPUS_FAQS = [
  {
    question: 'Where exactly is Victor Public School located in Panipat?',
    answer:
      'Victor Public School is prominently located at Krishan Nagar, Tehsil Camp, Panipat (Haryana – 132103), minutes away from Fatehpuri Chowk, Panipat Junction Railway Station, and GT Road (NH-44), easily accessible from Ram Nagar, Desraj Colony, Model Town, Sector 11–12, and Sanoli Road.',
  },
  {
    question: 'What is “Panchmukhi Shiksha” taught at Victor Public School?',
    answer:
      'Panchmukhi Shiksha is our signature five-fold development programme that nurtures every student’s Intellectual, Physical, Emotional, Moral, and Spiritual growth alongside strict NCERT and CBSE academics.',
  },
  {
    question: 'How can parents apply for admission and check the fee structure?',
    answer:
      'Parents can fill out the Online Registration & Enquiry Form right below on this page or collect the offline registration form directly from the School Office at Krishan Nagar, Tehsil Camp, Panipat between 8:30 AM and 1:30 PM.',
  },
  {
    question: 'What safety and healthcare facilities are available inside the school?',
    answer:
      'Our school building is earthquake-resistant and equipped with modern firefighting systems, 24×7 CCTV camera surveillance across corridors and gates, RO drinking water, a dedicated Medical Infirmary, and safe school transport.',
  },
];
