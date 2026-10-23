export default {
  "projects": [
    {
      "id": "south",
      "category": "web",
      "label": "Website development & QA",
      "title": "AWS Student Community Day South Summit",
      "year": "October 7, 2026",
      "art": "south",
      "status": "Website development",
      "summary": "Built an interactive event website with React, TypeScript, Vite, and Tailwind CSS, with Playwright checks across 3 viewport sizes and axe-core accessibility checks.",
      "tech": [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Playwright",
        "axe-core"
      ],
      "url": "https://aws.scd-south.cloud/",
      "details": [
        "Developed reusable components and centralized typed event content for desktop, tablet, and mobile layouts.",
        "Implemented the animated entrance, scroll-driven interactions, themes, speaker and sponsor showcases, venue details, FAQs, and external Luma registration and SYNC links.",
        "Implemented Playwright/Chromium checks at 375, 768, and 1440 pixels for registration links, theme persistence, overflow, image loading, and runtime errors.",
        "Integrated axe-core scans, keyboard focus checks, reduced-motion checks, TypeScript validation, and Node tests."
      ],
      "note": "QA scope: automated Chromium viewport checks. This does not imply physical-device certification or complete accessibility compliance.",
      "image": "/projects/scd-south.png",
      "imageAlt": "Official AWS Student Community Day South Summit event artwork",
      "brandImage": true
    },
    {
      "id": "mega",
      "category": "web",
      "label": "Website quality assurance",
      "title": "SCD Mega Manila",
      "year": "September 11, 2026",
      "art": "mega",
      "status": "QA contribution",
      "summary": "Tested responsiveness, performance, navigation, and content across 4 Android devices with 2–8 GB RAM and Android 10–14.",
      "tech": [
        "Real-device QA",
        "Content validation",
        "Bug reporting"
      ],
      "url": "https://www.aws-scd.cloud/",
      "details": [
        "Checked four Android configurations: 2 GB / Android 10, 3 GB / Android 11, 8 GB / Android 13, and 4 GB / Android 14.",
        "Identified lag on lower-memory devices and interaction issues during rapid swiping.",
        "Reviewed layout readability, spacing, navigation, registration links, maps, speaker information, and schedule consistency."
      ],
      "note": "Physical-device findings belong to this project; they are separate from the SCD South Chromium viewport checks.",
      "image": "/projects/scd-mega-manila.png",
      "imageAlt": "Official AWS Student Community Day Mega Manila event artwork",
      "brandImage": true
    },
    {
      "id": "sync",
      "category": "web",
      "label": "Functional & usability QA",
      "title": "SYNC Event Platform",
      "year": "September 11, 2026",
      "art": "sync",
      "status": "QA contribution",
      "summary": "Performed functional and usability QA for a platform serving 400+ users, reviewing navigation, schedule access, and mobile interactions.",
      "tech": [
        "Functional QA",
        "Mobile usability",
        "User journeys"
      ],
      "url": "https://sync.aws-scd.cloud/",
      "details": [
        "Reviewed attendee-facing navigation, schedule access, page transitions, and mobile usability.",
        "Compared loading and interaction behavior with the SCD Mega Manila website to identify responsiveness and performance differences."
      ],
      "note": "My contribution was quality assurance, rather than development of the platform.",
      "image": "/projects/sync.png",
      "imageAlt": "Current SYNC event platform branding",
      "brandImage": true
    },
    {
      "id": "email",
      "category": "automation",
      "label": "Python automation · AWS Alpha",
      "title": "Community Email Automation",
      "year": "June 23, 2025",
      "art": "email",
      "status": "Repository project",
      "summary": "Developed a Python email sender with 5 reusable HTML templates for applicant decisions, partnerships, sponsorships, and speaker communications.",
      "tech": [
        "Python",
        "HTML email",
        "Reusable templates"
      ],
      "url": "https://github.com/athycc/aws-email-automation",
      "details": [
        "Created template-based communication for applicant acceptance, applicant rejection, partnerships, sponsorships, and speakers.",
        "Integrated reusable layouts and image support so organization communications share a consistent presentation."
      ],
      "note": "The repository is available for review. No delivery-volume or time-saving figures are asserted.",
      "image": "/projects/archive/email.webp",
      "imageAlt": "AWS email automation repository README showing Python and HTML template support",
      "brandImage": true,
      "imageWidth": 1000,
      "imageHeight": 208
    },
    {
      "id": "backlog",
      "category": "data",
      "label": "Data analytics · Eskwelabs",
      "title": "Product Backlog Dashboard",
      "year": "2026",
      "image": "/projects/archive/backlog.webp",
      "status": "Internship output",
      "summary": "Built a Power BI dashboard tracking 170 backlog items across 9 initiatives and 40 epics, with reporting across 36 stories and 427.33 story points.",
      "tech": [
        "Power BI",
        "KPI tracking",
        "Backlog analysis"
      ],
      "video": "/videos/product-demo.mp4",
      "details": [
        "Organized backlog status, urgency, priority, and sprint progress for stakeholder reporting.",
        "Built views covering 170 items, 9 initiatives, 40 epics, and 36 stories totaling 427.33 story points."
      ],
      "note": "Dashboard metrics describe the dataset and reporting scope, rather than a measured productivity improvement.",
      "archive": "https://drive.google.com/drive/folders/122VPxokv9yFkh3wk8OUBiZoyVhNaEWN4",
      "imageAlt": "Power BI Product Backlog Dashboard with 170 total items",
      "brandImage": true,
      "imageWidth": 1000,
      "imageHeight": 579,
      "resource": "https://drive.google.com/file/d/1Uh9bJjxc0A22boYsUxMzbzf83pK0wQaQ/view?usp=drive_link",
      "resourceLabel": "Open dashboard PDF"
    },
    {
      "id": "capycademy",
      "category": "automation",
      "label": "Team lead · APPCON 2024",
      "title": "Capycademy",
      "year": "75 / 178 teams",
      "art": "academy",
      "status": "Competition application",
      "summary": "Led development of a skills gap application, qualifying 75th among 178 teams in APPCON 2024.",
      "tech": [
        "React",
        "FastAPI",
        "Supabase",
        "AI services"
      ],
      "details": [
        "Led the team developing an application addressing skills gaps.",
        "Worked with React, ShadCN, Tailwind CSS, Zustand, TanStack Query, Axios, Python, FastAPI, Supabase, and AI services."
      ],
      "note": "APPCON 2024: qualified 75th among 178 teams. Original interface images and presentation are available in the project folder.",
      "archive": "https://drive.google.com/drive/folders/10Turmdj5dJxymT1nazKWnjTAuPLTrBmg",
      "image": "/projects/archive/capy.webp",
      "imageAlt": "Capycademy learning interface with a course path and learning progress",
      "brandImage": true,
      "imageWidth": 1000,
      "imageHeight": 530,
      "resource": "https://drive.google.com/file/d/1PRYsDeffIIBvqUPual322HVbgf4calIz/view?usp=drive_link",
      "resourceLabel": "Watch project demo"
    },
    {
      "id": "robotics",
      "category": "exploration",
      "label": "Robotics competition · TIP",
      "title": "Autonomous Sumobot",
      "year": "Champion · 2023",
      "art": "robot",
      "status": "Competition build",
      "summary": "Built a championship-winning Arduino sumobot with motor control, edge detection, and opponent tracking.",
      "tech": [
        "Arduino Uno",
        "IR sensors",
        "L298N",
        "Motor control"
      ],
      "details": [
        "Built and programmed an autonomous sumobot using Arduino Uno, DC motors, an L298N driver, IR sensors, and a lightweight chassis.",
        "Tested and iterated to improve speed, responsiveness, and stability during matches."
      ],
      "note": "Champion, Technological Institute of the Philippines Robotics Competition, May 6, 2023.",
      "archive": "https://drive.google.com/drive/folders/1S564VR7LJtovR2mT28XPlipMC3YsSBXH",
      "image": "/projects/archive/robotics.webp",
      "imageAlt": "Catherine and her robotics team with their competition build",
      "brandImage": true,
      "imageWidth": 1000,
      "imageHeight": 638
    },
    {
      "id": "looker",
      "category": "data",
      "label": "Financial analytics · Eskwelabs",
      "title": "Financial Dashboard",
      "year": "2026",
      "image": "/assets/dashboard-detail.jpg",
      "status": "Internship output",
      "summary": "Developed financial reporting covering 92 programs, $39.1M in revenue, 19,025 students, and a 42.7% gross margin.",
      "tech": [
        "Power BI",
        "P&L analysis",
        "Cost analysis"
      ],
      "video": "/videos/financial-looker.mp4",
      "details": [
        "Created financial, P&L, and cost analysis dashboards for stakeholder reporting and business decisions.",
        "Analyzed a dataset spanning 92 programs, $39.1M revenue, 19,025 students, and a 42.7% gross margin."
      ],
      "note": "Figures describe the analyzed dataset; they do not represent revenue generated by my work.",
      "archive": "https://drive.google.com/drive/folders/122VPxokv9yFkh3wk8OUBiZoyVhNaEWN4",
      "imageAlt": "Financial dashboard with program, revenue, student, and gross margin reporting",
      "brandImage": true,
      "resource": "https://drive.google.com/file/d/188QVEm6pZugXMkiR1mU7qrMpp5vDL9Sf/view?usp=drive_link",
      "resourceLabel": "Watch dashboard demo"
    },
    {
      "id": "credivest",
      "category": "exploration",
      "label": "Lead programmer · Home Credit Hackada",
      "title": "Credivest · Home Credit Hackada",
      "year": "3rd Runner-Up · 2024",
      "art": "credivest",
      "status": "Concept prototype",
      "summary": "Led development of a customer engagement platform with a loyalty system for Home Credit Philippines, earning 3rd Runner-Up.",
      "tech": [
        "React",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Figma"
      ],
      "details": [
        "Served as lead programmer for the customer engagement and loyalty platform.",
        "Presented the prototype at KadaKareer’s Home Credit Hackada Competition on November 18, 2024."
      ],
      "note": "Competition prototype; original interface screenshots are available in the project folder.",
      "archive": "https://drive.google.com/drive/folders/1ozoGQhvZdlvmvb0Atjy6ZMTUtgxEi5h1",
      "image": "/projects/archive/credivest.webp",
      "imageAlt": "Credivest customer engagement interface in the Home Credit application",
      "brandImage": true,
      "imageWidth": 549,
      "imageHeight": 1000
    },
    {
      "id": "poro",
      "title": "Poro · Time Management",
      "category": "web",
      "label": "Time management web application",
      "year": "Project archive",
      "status": "Archived project",
      "summary": "A time management web application presenting a monthly calendar, tasks, and an activity overview.",
      "archive": "https://drive.google.com/drive/folders/157KtG4CGbU0aJH4nN7eNxeYS-HxjJgRr",
      "image": "/projects/archive/poro.webp",
      "imageAlt": "Poro · Time Management original project image",
      "brandImage": true,
      "tech": [
        "Calendar UI",
        "Task organization"
      ],
      "details": [
        "Developed a time management web application; the original screenshot shows the calendar and task overview."
      ],
      "note": "View the original project materials in its dedicated Google Drive folder.",
      "imageWidth": 798,
      "imageHeight": 396
    },
    {
      "id": "gabay",
      "title": "Gabay",
      "category": "exploration",
      "label": "Mobile interface prototype",
      "year": "Project archive",
      "status": "Archived project",
      "summary": "A mobile interface concept presenting conversations, charts, and a dashboard overview.",
      "archive": "https://drive.google.com/drive/folders/1MTaMhuUPGgy8sYWmtd18Tfati9xcz0VQ",
      "image": "/projects/archive/gabay.webp",
      "imageAlt": "Gabay original project image",
      "brandImage": true,
      "tech": [
        "Mobile UI",
        "Dashboard design"
      ],
      "details": [
        "Created a mobile interface concept; original project materials show conversation, dashboard, and chart views."
      ],
      "note": "View the original project materials in its dedicated Google Drive folder.",
      "imageWidth": 633,
      "imageHeight": 925
    },
    {
      "id": "skillgap",
      "title": "Skills Gap Assessment Research",
      "category": "exploration",
      "label": "Research & prototype · Tech Careerscape",
      "year": "3rd Runner-Up · 2023",
      "status": "Archived project",
      "summary": "Researched skills gaps in Philippine companies and proposed an assessment platform, earning 3rd Runner-Up.",
      "archive": "https://drive.google.com/drive/folders/1d0lsU1-cBcNqNIWLcn2RafRWIE6Thl15",
      "image": "/projects/archive/skillgap.webp",
      "imageAlt": "Skills Gap Assessment Research original project image",
      "brandImage": true,
      "tech": [
        "Research",
        "Skills assessment",
        "Prototyping"
      ],
      "details": [
        "Researched workplace skills gaps and proposed an assessment website with course recommendations and progress tracking.",
        "Presented the research and prototype at PUP Programmers Guild Tech Careerscape on September 16, 2023."
      ],
      "note": "View the original project materials in its dedicated Google Drive folder.",
      "imageWidth": 1000,
      "imageHeight": 563
    }
  ],
  "experience": [
    {
      "role": "Marketing Intern",
      "org": "Exist Software Labs Inc.",
      "period": "Hybrid · August 2026–Present",
      "summary": "Create healthcare marketing content, research industry events, and develop requirements and workflows for AI agent automation.",
      "bullets": [
        "Prepare healthcare content for a 12-image LinkedIn campaign, translating hospital information system concepts into accessible messaging.",
        "Research events across 6 sectors in the Philippines and ASEAN: healthcare, banking, retail, energy, AI, and API management.",
        "Develop requirements and workflows using AI agent automation for the marketing department."
      ]
    },
    {
      "role": "Marketing Intern",
      "org": "Edukasyon.ph",
      "period": "Hybrid · March–June 2026",
      "summary": "Automated outreach with Apps Script and built a social media KPI dashboard tracking a 280K quarterly target.",
      "bullets": [
        "Automated email workflows using Google Apps Script, Gmail, and Google Sheets.",
        "Built a social media KPI dashboard to monitor campaign performance against a 280K quarterly target.",
        "Researched EDCOM, financial literacy, LGBTQ+ inclusion, marketing strategies, and AWS re/Start.",
        "Managed community engagement, social monitoring, and content execution."
      ]
    },
    {
      "role": "Data Analyst Intern",
      "org": "Eskwelabs",
      "period": "Hybrid · February–May 2026",
      "summary": "Built backlog reporting across 170 items and financial dashboards covering 92 programs and $39.1M in analyzed revenue.",
      "bullets": [
        "Built a Power BI Product Backlog Dashboard across 170 items, 9 initiatives, and 40 epics.",
        "Reported backlog urgency and sprint progress across 36 stories totaling 427.33 story points.",
        "Developed a Financial Dashboard analyzing 92 programs, $39.1M revenue, 19,025 students, and a 42.7% gross margin.",
        "Created P&L and cost analysis dashboards for stakeholder reporting."
      ]
    },
    {
      "role": "Research Intern",
      "org": "Heartful Hospitality",
      "period": "Remote · June–October 2025",
      "summary": "Reviewed Alzheimer’s care interventions and developed evidence-based recommendations for senior wellness.",
      "bullets": [
        "Conducted a systematic literature review using PubMed, Google Scholar, and WHO sources.",
        "Authored a research paper comparing community, technology-based, and hybrid dementia care models.",
        "Produced recommendations supporting senior wellness initiatives."
      ]
    },
    {
      "role": "IT Support & Data Management",
      "org": "Philippine National Police (QCPD)",
      "period": "Onsite · January–May 2022",
      "summary": "Developed a QCPD sector website and managed digital documentation workflows supporting departmental operations.",
      "bullets": [
        "Developed and deployed a QCPD sector website.",
        "Managed digital documentation workflows for departmental operations."
      ]
    }
  ],
  "volunteering": [
    [
      "Speaker Coordinator · DEVCON Manila",
      "Hybrid · April 2025–March 2026",
      "Coordinated technical presentations, speakers, and program schedules."
    ],
    [
      "Host · CaffeineAI",
      "Onsite · October 2025",
      "Interviewed hackathon guests, mentors, participants, and volunteers."
    ],
    [
      "Stage Manager & Usher · UNLEASH Philippines",
      "Onsite · September 2025",
      "Coordinated stage flow, performers, and technical cues."
    ],
    [
      "Secretariat & Usher · IoT Conference of the Philippines",
      "Onsite · September 2025",
      "Supported documentation, scheduling, communication, and attendee guidance."
    ],
    [
      "Program Manager · DEVCON Manila Game On Game Jam",
      "Onsite · August 2025",
      "Coordinated facilities, staff, speakers, schedules, resources, and activities."
    ],
    [
      "Speaker Coordinator · Arduino Day Philippines",
      "Hybrid · January–March 2025",
      "Coordinated technical presentations and speaker communications."
    ]
  ],
  "skills": [
    [
      "Frontend",
      "TypeScript",
      "JavaScript",
      "React.js",
      "Next.js",
      "React Native",
      "Tailwind CSS"
    ],
    [
      "Backend & databases",
      "Python",
      "FastAPI",
      "PHP",
      "Java",
      "MySQL",
      "Supabase",
      "Firebase"
    ],
    [
      "Analytics & visualization",
      "Power BI",
      "Looker Studio",
      "Data visualization",
      "KPI tracking",
      "P&L analysis",
      "Business reporting"
    ],
    [
      "Automation",
      "Google Apps Script",
      "Google Workspace",
      "Google AI Studio",
      "AI workflow design"
    ],
    [
      "Testing & security",
      "Playwright",
      "Responsive testing",
      "Network traffic analysis",
      "Vulnerability management"
    ],
    [
      "Build & collaboration",
      "Git & GitHub",
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Node.js",
      "Figma",
      "Canva",
      "Trello",
      "Bash",
      "PowerShell",
      "Arduino IDE"
    ],
    [
      "Marketing & operations",
      "B2B content development",
      "Email campaigns",
      "Event coordination"
    ]
  ],
  "certifications": [
    [
      "DataCamp · Certified Data Science Associate",
      "June 2025"
    ],
    [
      "DataCamp · Certified Data Analyst Associate",
      "June 2025"
    ],
    [
      "Oracle · Oracle Fusion AI Foundation Associate",
      "March 2025"
    ],
    [
      "KodeKloud · CompTIA Security+ training",
      "May 2025"
    ],
    [
      "QCSP, DOST-ASTI & DLSU-DCT · Quantum and Blockchain Lecture and Hackathon Series",
      "March 2025"
    ],
    [
      "NVIDIA · Elevate Emerging Technologies",
      "January 2025"
    ],
    [
      "DataCamp · Introductory Python, AI, Machine Learning & Data Science courses",
      "December 2024"
    ],
    [
      "Data Engineering Pilipinas · DataCamp Scholar",
      "December 2025"
    ],
    [
      "Security Blue Team · Blue Team Junior Analyst",
      "October 2024"
    ],
    [
      "OPSWAT Academy · Cybersecurity Fundamentals Associate",
      "October 2024"
    ],
    [
      "Data Analytics Philippines · MySQL Querying Fundamentals",
      "October 2024"
    ]
  ],
  "awards": [
    [
      "75 / 178",
      "APPCON 2024 · OTIS Japan Incorporation",
      "April 21, 2025 · Team lead, skills gap application."
    ],
    [
      "11th",
      "SEEN 2025 CTF · GDG PUP × CyberPH",
      "August 20, 2025 · Network analysis and digital forensics."
    ],
    [
      "116 / 199",
      "Trend University CTF · Trend Micro",
      "August 22, 2025 · Reverse engineering and OSINT."
    ],
    [
      "3rd Runner-Up",
      "Home Credit Hackada · KadaKareer",
      "November 18, 2024 · Lead programmer, customer engagement and loyalty platform. React, TypeScript, JavaScript, Tailwind CSS, Figma."
    ],
    [
      "3rd Runner-Up",
      "Tech Careerscape · PUP Programmers Guild",
      "September 16, 2023 · Skills gap research and assessment prototype."
    ],
    [
      "Champion",
      "Robotics Competition · TIP",
      "May 6, 2023 · Autonomous Arduino sumobot."
    ]
  ]
};
