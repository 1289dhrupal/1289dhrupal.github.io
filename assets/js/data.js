/**
 * MASTER DATA SOURCE
 * Update this file to change content across the portfolio.
 */

// --- IMPACT METRICS ---
const impactData = [
    { label: 'Workflow Reduction', value: 50, suffix: '%', desc: 'Via Laravel Automation', color: 'blue' },
    { label: 'Performance Boost', value: 300, suffix: '%', desc: 'API Refactoring (Vue/PHP)', color: 'emerald' },
    { label: 'Build Time Reduction', value: 90, suffix: '%', desc: 'Optimized DevOps Pipelines', color: 'purple' },
    { label: 'Client Retention', value: 20, suffix: '%', desc: 'Via Custom WordPress Features', color: 'amber' }
];

// --- SKILLS DATA (TEXT LIST) ---
const skillsTextData = [
    {
        title: "PHP Ecosystem",
        level: "Expert",
        icon: "🐘",
        desc: "4 Years exp. Deep expertise in <strong>Laravel</strong> automation, API architecture, and legacy optimization."
    },
    {
        title: "Database Engineering",
        level: "Expert",
        icon: "🗄️",
        desc: "MySQL specialist. Proficient in <strong>Indexing, Query Optimization, Triggers,</strong> and Stored Procedures."
    },
    {
        title: "Cloud & DevOps",
        level: "Solid",
        icon: "☁️",
        desc: "Production GCP experience (Compute Engine, Pub/Sub). Ownership of deployment pipelines and Webhooks."
    },
    {
        title: "AI Integration",
        level: "Specialist",
        icon: "🤖",
        desc: "Practical implementation of <strong>OpenAI Function Calling</strong> for structured data normalization in production apps."
    }
];

// --- SKILLS CHART DATA (RADAR) ---
const skillsChartData = {
    labels: ['Backend (PHP)', 'Database', 'Frontend', 'DevOps', 'AI Integration', 'Leadership'],
    datasets: [{
        label: 'Proficiency Level',
        data: [95, 90, 75, 80, 85, 80],
        fill: true,
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgb(37, 99, 235)',
        pointBackgroundColor: 'rgb(37, 99, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(37, 99, 235)'
    }]
};

// --- EXPERIENCE DATA ---
const experienceData = [
    {
        id: 1,
        role: "Senior Software Engineer",
        company: "Sellergize (Remote)",
        period: "Jan 2025 – Present",
        type: "Full-time",
        focus: "Focus: High Autonomy",
        typeColor: "bg-blue-100 text-blue-700",
        icon: "🚀",
        stories: [
            { title: "50% Workflow Reduction", desc: "Designed a Laravel admin panel automating manual data entry, saving ~40 hours/month." },
            // { title: "Scalable Streaming", desc: "Integrated Google Pub/Sub for real-time data streaming." },
            // {
            //     title: "Backend Architecture",
            //     desc: "Led the backend design for a mobile shopping platform. Built a crawling layer using Selenium/Python to scrape coupon sites securely. Implemented an AI parsing engine that sends DOM elements to OpenAI to identify CSS selectors, normalizing unstructured data into structured formats. Integrated a central store intelligence system for popularity metrics."
            // },
            //     ],
            //     stack: ["Laravel", "Vue.js", "Python", "Google Pub/Sub", "OpenAI API"]
            // },
            // {
            //     id: 2,
            //     role: "Software Engineer (Contract)",
            //     company: "Sellergize (Remote)",
            //     period: "Mar 2024 – Dec 2024",
            //     type: "Contract",
            //     focus: "Focus: Infrastructure",
            //     typeColor: "bg-amber-100 text-amber-700",
            //     icon: "⚙️",
            //     stories: [
            { title: "The DevOps Transformation", desc: "Replaced manual triggers with <strong>Webhooks & APIs</strong>, reducing release time from hours to 2 minutes." },
            { title: "Cloud Reliability", desc: "Automated backups for 8 GCP servers, achieving zero errors and saving ~1 hr/day." },
            { title: "Leadership", desc: "Mentored 4 juniors, conducting code reviews focused on injection safety." }
        ],
        // stack: ["Laravel", "Vue.js", "Python", "Google Pub/Sub", "OpenAI API"]
        // stack: ["Webhooks/API", "GCP", "Selenium", "GitHub"]
        stack: ["Laravel", "Vue.js", "Python", "Google Pub/Sub", "OpenAI API", "Webhooks/API", "GCP", "Selenium", "GitHub"]
    },
    {
        id: 3,
        role: "Product Engineer",
        company: "Seclore (Mumbai)",
        period: "Sep 2022 – Sep 2023",
        type: "Full-time",
        focus: "Focus: Precision Execution",
        typeColor: "bg-blue-100 text-blue-700",
        icon: "🔒",
        stories: [
            { title: "Zero Critical Bugs", desc: "Championed TDD and used JUnit to achieve zero post-release bugs in a security-critical environment." },
            { title: "IP Geolocation Module", desc: "Built a Java Spring Boot MVC microservice using MaxMind MMDB for geo-restricted file access compliance. Deployed via <strong>Docker</strong>." },
            { title: "Build Optimization", desc: "Reduced build times from 1.5 days to 2 hours (90% reduction) via automation scripts." }
        ],
        stack: ["Java Spring Boot", "Docker", "React.js", "TDD", "VAPT"]
    },
    {
        id: 4,
        role: "Software Developer",
        company: "Sellergize (Mumbai)",
        period: "Aug 2020 – Sep 2022",
        type: "Full-time",
        focus: "Focus: Requirement-Based",
        typeColor: "bg-blue-100 text-blue-700",
        icon: "💻",
        stories: [
            { title: "300% Performance Boost", desc: "Re-architected core user panel using Vue.js and PHP REST APIs." },
            { title: "Database Engineering", desc: "Heavy usage of MySQL triggers, stored procedures, and my.ini optimization." },
            { title: "Revenue Impact", desc: "Developed 15+ WordPress plugins/features contributing to a 20% increase in client retention." }
        ],
        stack: ["PHP", "Vue.js", "MySQL", "WordPress"]
    },
    // {
    //     id: 5,
    //     role: "Project Trainee (Internship)",
    //     company: "Trivia Softwares (Mumbai)",
    //     period: "Jun 2019 – Aug 2019",
    //     type: "Internship",
    //     focus: "Focus: Waterfall SDLC",
    //     typeColor: "bg-slate-100 text-slate-600",
    //     icon: "🎓",
    //     stories: [
    //         { title: "Java Foundations", desc: "Developed a Student Management System using Java SE 11, learning core OOP principles." },
    //         { title: "SDLC", desc: "Gained practical experience working within a Waterfall development lifecycle." }
    //     ],
    //     stack: ["Java SE 11", "Waterfall", "MySQL"]
    // }
];

// --- PROJECT DATA ---
const projectData = [
    {
        title: "IP Geolocation & Access Control",
        category: "professional",
        stack: ["Spring Boot", "MaxMind", "Docker"],
        desc: "Built a core security module for Seclore to enforce geo-restricted file access compliance.",
        secret: "Used MaxMind MMDB for high-speed offline resolution and an abstracted Repo layer for future-proofing.",
        link: null
    },
    {
        title: "Academic Git Monitoring System",
        category: "academic",
        stack: ["PHP", "Vue.js", "OpenAI API", "MySQL"],
        desc: "MSc Dissertation. A tool for professors to fairly evaluate student contributions.",
        secret: "Used <strong>OpenAI Function Calling</strong> to solve AI hallucinations and force structured JSON output.",
        link: "https://github.com/1289dhrupal/msc_project"
    },
    {
        title: "Mobile Shopping App Backend",
        category: "professional",
        stack: ["Laravel", "Python", "Pub/Sub", "OpenAI"],
        desc: "Sellergize. Architecture for a Gecko-based browser app.",
        secret: "Built a crawling layer with Selenium and an AI Normalization layer to parse unstructured coupon text.",
        link: "#",
        action: "openArchitecture",
        linkText: "View Architecture",
    },
    {
        title: "Anti-Theft Android Model",
        category: "academic",
        stack: ["Android", "ML", "SVM-RBF"],
        desc: "Research Paper published in ITM Web of Conferences.",
        secret: "Hybrid model using ML for detection (0.76 Accuracy) and SMS for remote access functionality.",
        link: "https://doi.org/10.1051/itmconf/20203203021"
    },
    {
        title: "Dairy Transaction System",
        category: "freelance",
        stack: ["Flutter", "PHP", "MySQL"],
        desc: "Freelance Client. Full lifecycle development.",
        secret: "Collaborated with a frontend dev; I built the PHP backend and handled minor Flutter fixes.",
        link: null
    },
    {
        title: "Hate Speech Detection",
        category: "academic",
        stack: ["Python", "ML"],
        desc: "ML model classifying tweets as offensive/non-offensive.",
        secret: "Achieved 85% accuracy using Python libraries.",
        link: "https://colab.research.google.com/drive/1ZbkaEfmy_aQnsCiJcFYdJ987dpqk-wLM?usp=sharing"
    },
    {
        title: "Blood Donation System",
        category: "academic",
        stack: ["PHP", "JS", "HTML"],
        desc: "Multilingual platform to enhance donor appointment tracking.",
        secret: "Live project focusing on accessibility.",
        link: "https://bloodbanksddmo.herokuapp.com/"
    },
    {
        title: "Mini Project (Angular)",
        category: "learning",
        stack: ["Angular"],
        desc: "Self-taught project to learn framework fundamentals.",
        secret: "Focused on components and data binding structure.",
        link: null
    }
];

// --- EDUCATION DATA ---
const educationData = [
    {
        degree: "MSc Advanced Computer Science",
        institution: "University of Leicester, UK (Distinction)",
        period: "2023 - 2024",
        details: "<strong>Modules:</strong> Big Data (Spark), Cloud Computing (Hadoop), Agile Automation (Gradle).",
        colorClass: "border-l-4 border-blue-600 pl-4 bg-white p-4 rounded-r-lg shadow-sm"
    },
    {
        degree: "BE Computer Engineering",
        institution: "Ramrao Adik Institute of Technology, India",
        period: "2016 - 2020",
        details: "<strong>Award:</strong> 2nd Runner Up (3rd/861) in National Coding Competition.",
        colorClass: "border-l-4 border-blue-600 pl-4 bg-white p-4 rounded-r-lg shadow-sm"
    }
];

// --- CERTIFICATION DATA ---
const certificationData = [
    {
        title: "Laravel Essential Training",
        link: "https://www.linkedin.com/learning/certificates/8fd09d2cab366281d5df18e0c4872201dc2ccdbe8ddc027221519924c58774ec?trk=share_certificate",
        platform: "LinkedIn Learning"
    },
    {
        title: "Java Programming",
        link: null, // No link provided for offline course
        platform: "Offline Course"
    },
    {
        title: "Problem Solving (Basic) - Gold Badge",
        link: "https://www.hackerrank.com/certificates/1cffca3019ca",
        platform: "HackerRank"
    },
    {
        title: "Data Scientist with R Track",
        link: "https://www.datacamp.com/statement-of-accomplishment/track/ef287fd01021131b76d9f376778eb6f63cba172c",
        platform: "DataCamp"
    },
    {
        title: "OOP in Java",
        link: "http://coursera.org/verify/specialization/BSDARFGELNEP",
        platform: "Coursera"
    },
    {
        title: "Modern Python 3",
        link: null,
        platform: "Udemy"
    },
    {
        title: "Web Developer",
        link: "https://www.udemy.com/certificate/UC-36a7c89d-77d1-4629-a5c9-a85e6a162971/",
        platform: "Udemy"
    }
];