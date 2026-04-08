export interface Skill { idx:string; name:string; level:number; tag:string }
export interface Project { id:string; num:string; featured?:boolean; award?:string; title:string; desc:string; bullets:string[]; tags:string[] }
export interface TimelineItem { date:string; org:string; role:string; desc:string }
export interface Cert { icon:string; name:string; issuer:string }
export interface CurrentlyItem { emoji:string; label:string; val:string; sub:string }
export interface Book { title:string; height:number; bg:string; note:string; status:string }
export interface JournalEntry { date:string; tag:string; text:string }
export interface SocialLink { label:string; icon?:string; href:string; external?:boolean }

export const SKILLS:Skill[]=[
  {idx:"01",name:"Python · Java · C++",level:80,tag:"Programming"},
  {idx:"02",name:"AWS · Oracle Cloud",level:70,tag:"Cloud"},
  {idx:"03",name:"IoT · Embedded C · Arduino",level:85,tag:"Hardware"},
  {idx:"04",name:"UI/UX · User Research",level:72,tag:"Design"},
  {idx:"05",name:"MATLAB · Power Systems",level:75,tag:"Engineering"},
  {idx:"06",name:"LLM Prompting · AI Tools",level:68,tag:"AI"},
];

export const PROJECTS:Project[]=[
  {id:"irrigation",num:"01 / Featured",featured:true,award:"🏆 IEEE Best Paper · STPEC 2025",
   title:"Smart Irrigation System",
   desc:"IoT-based precision agriculture solution that automates water delivery based on live soil data.",
   bullets:["Arduino + soil moisture sensors + solenoid valve control loop","Presented at 4th IEEE STPEC 2025 — awarded Best Paper","Designed for real-world agricultural deployment"],
   tags:["Arduino","IoT","Sensors","Automation","IEEE"]},
  {id:"autohire",num:"02",title:"AutoHire Smart Resume Portal",
   desc:"Cloud-based resume upload portal using AWS with a cleaner and more secure user experience.",
   bullets:["Used AWS S3, Lambda, and API Gateway","Focused on secure uploads and simple UI flow"],
   tags:["AWS S3","Lambda","API Gateway","UI Design"]},
  {id:"pollution",num:"03",title:"Pollution Detection System",
   desc:"Real-time air quality monitoring unit integrated with a mobile app for live data visualization.",
   bullets:["Gas sensors tracking CO, CO₂, and PM2.5 levels","Wireless data transmission to backend API","Mobile app with real-time dashboard and alerts"],
   tags:["Gas Sensors","Flutter","Flask","Real-time API"]},
  {id:"accident",num:"04",title:"Accident Prevention System",
   desc:"Real-time obstacle detection system for vehicles — a low-cost safety solution using embedded hardware.",
   bullets:["Arduino + ultrasonic sensors for proximity detection","Buzzer alerts scaled to distance — no screen required"],
   tags:["Arduino","Ultrasonic","Safety","Embedded C"]},
];

export const TIMELINE:TimelineItem[]=[
  {date:"2023 – Present",org:"VIT Chennai",role:"B.Tech — Electrical & Electronics Engineering",
   desc:"3rd-year student exploring Power Systems Analysis, Embedded Systems, Renewable Energy, and IoT. Active IEEE research contributor."},
  {date:"Jan 2025",org:"IEEE STPEC 2025",role:"Best Paper Award 🏆",
   desc:"Paper on Smart Irrigation System awarded Best Paper at the 4th IEEE International Conference on Smart Technologies for Power, Energy, and Control."},
  {date:"Sept – Oct 2025",org:"Edunet Foundation",role:"Virtual Intern — Conversational Data Analysis with LLMs",
   desc:"Built conversational AI pipelines using LLMs. Applied Chain-of-Thought and Tree-of-Thought prompting strategies."},
  {date:"Summer 2026",org:"Ispat Company",role:"Incoming Summer Intern — Industrial / Steel Sector",
   desc:"Confirmed internship applying core EEE knowledge in a real-world manufacturing and automation context."},
];

export const CERTS:Cert[]=[
  {icon:"☁️",name:"Oracle Cloud Infrastructure AI Foundations Associate",issuer:"Oracle · 2025"},
  {icon:"☁️",name:"Oracle Cloud Infrastructure Foundations Associate",issuer:"Oracle · 2025"},
  {icon:"🎨",name:"Google UX Design Professional Certificate",issuer:"Google · UX Foundations & Process"},
  {icon:"💻",name:"C, C++ & Python Training Certificate",issuer:"IIT Bombay"},
  {icon:"🏆",name:"IEEE Best Paper Award",issuer:"STPEC 2025 · IEEE Conference"},
  {icon:"🤖",name:"Conversational AI with LLMs",issuer:"Edunet Foundation · 2025"},
];

export const CURRENTLY:CurrentlyItem[]=[
  {emoji:"🚀",label:"Building",val:"together.: Better Plans",sub:"app connecting people"},
  { emoji:"📚", label:"Reading", val:"The Three-Body Problem", sub:"Liu Cixin" },
  {emoji:"⚽",label:"Following",val:"La Liga & UCL",sub:"This season's a banger"},
];

export const BOOKS:Book[]=[
  {title:"Project Hail Mary",height:200,bg:"linear-gradient(180deg,#1a3a5c,#0f2035)",
   note:"The engineering problem-solving in this book is the most satisfying thing I've read.",status:"📖 Currently reading"},
  {title:"The Design of Everyday Things",height:175,bg:"linear-gradient(180deg,#2d1a0f,#5c3416)",
   note:"Now I can't use a bad door handle without getting mildly angry.",status:"✅ Read"},
  {title:"Atomic Habits",height:188,bg:"linear-gradient(180deg,#1a2d1a,#2d5c2d)",
   note:"The 1% rule hit different during exam prep. Small systems > big motivation.",status:"✅ Read"},
  {title:"Zero to One",height:160,bg:"linear-gradient(180deg,#2d1a2d,#5c1a5c)",
   note:"Made me think about why I'm building things, not just how.",status:"✅ Read"},
  {title:"Surely You're Joking, Mr. Feynman",height:192,bg:"linear-gradient(180deg,#2d2a1a,#5c541a)",
   note:"Curiosity as a lifestyle — the best engineers are just relentlessly curious people.",status:"✅ Read"},
  {title:"The Almanack of Naval Ravikant",height:168,bg:"linear-gradient(180deg,#1a1a2d,#1a1a5c)",
   note:"Specific knowledge and leverage — concepts I think about every time I pick a new skill.",status:"📖 Reading"},
];

export const JOURNAL:JournalEntry[]=[
  {date:"Mar 2026",tag:"Design",text:'Good UI is invisible. You only notice it when it\'s missing — like a door with no handle. How it feels to use is also part of how it works.'},
  {date:"Feb 2026",tag:"Engineering",text:"Spent 3 hours debugging a sensor that was reading wrong. Turned out it was upside down. The lesson was to question your assumptions before touching the code."},
  {date:"Jan 2026",tag:"AI",text:"LLMs are strange tools — the better your question, the better the answer. Good engineers have always known that framing the problem correctly is half the solution."},
  {date:"Dec 2025",tag:"Life",text:"Visited the Jain temples in Thirumalai. There's something quietly powerful about spaces built to last centuries."},
];

export const FOOTER_SOCIALS:SocialLink[]=[
  {label:"✉ Email",href:"mailto:thisispurab01@gmail.com"},
  {label:"in LinkedIn",href:"https://linkedin.com/in/purabjain01/",external:true},
  {label:"⌥ GitHub",href:"https://github.com/PurabJain-77",external:true},
  {label:"𝕏 Twitter",href:"https://x.com/"},
  {label:"⌨ LeetCode",href:"https://leetcode.com/u/thisispurab/",external:true},
  {label:"✦ Behance",href:"https://www.behance.net/purabjain2",external:true},
  {label:"📚 Goodreads",href:"https://www.goodreads.com/user/show/145908897-purab",external:true},
];

export const TYPEWRITER_PHRASES=["builds practical systems\nwith a clean,\nhuman touch.","turns circuits into\nexperiences\npeople love.","bridges hardware\nand cloud\nwith design thinking.","makes IoT systems\nthat actually\nmake sense."];
export const MARQUEE_ITEMS=["IEEE Best Paper Award","AWS Cloud Architecture","Google UX Design","Oracle Cloud Certified","IoT Systems","VIT Chennai · EEE","Power Systems · MATLAB","Embedded C · Arduino"];
export const BELIEFS=[{num:"01",text:'"Good design should feel inevitable — not clever."'},{num:"02",text:'"The best engineers understand what the user actually needs."'},{num:"03",text:'"Constraints are where the interesting problems live."'}];
export const TERMINAL_COMMANDS:Record<string,string>={
  help:`Available commands:\nwhoami · skills · projects · contact · clear · exit · ls · date · weather`,
  whoami:`Purab Jain — EEE student at VIT Chennai.\nBuilder of IoT systems, cloud tools, and thoughtful UIs.\nIEEE Best Paper Award winner · STPEC 2025.`,
  ls:`~/portfolio\n├── about.md\n├── projects/\n│   ├── smart_irrigation.ieee\n│   ├── autohire_aws.cloud\n│   ├── pollution_detector.iot\n│   └── obstacle_detection.embedded\n├── skills.json\n└── contact.txt`,
  skills:`{\n  "programming": ["Python","Java","C++","MATLAB"],\n  "cloud": ["AWS S3","Lambda","API Gateway","Oracle Cloud"],\n  "hardware": ["Arduino","IoT","Embedded C","Sensors"],\n  "design": ["UI/UX","User Research","Google UX Certified"]\n}`,
  projects:`→ Smart Irrigation System — IEEE Best Paper STPEC 2025\n→ AutoHire — AWS Cloud Resume Portal\n→ Pollution Detection & Management System\n→ Real-Time Accident Prevention System`,
  contact:`✉  thisispurab01@gmail.com\nin linkedin.com/in/purabjain01/\ngh github.com/PurabJain-77\n⌨  leetcode.com/u/thisispurab/\n✦  behance.net/purabjain2`,
  weather:`Fetching Chennai weather...\n→ Chennai, India · ~30°C · Humid & partly cloudy`,
};
