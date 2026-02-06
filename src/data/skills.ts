export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    color: "from-orange-500 to-amber-400",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "C", level: 75 },
      { name: "MIPS Assembly", level: 70 },
    ],
  },
  {
    name: "Frontend",
    color: "from-pink-500 to-rose-400",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    name: "Backend & Systems",
    color: "from-cyan-500 to-blue-400",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "REST APIs", level: 80 },
      { name: "Cache Design", level: 85 },
      { name: "Memory Mgmt", level: 80 },
      { name: "SQL", level: 70 },
    ],
  },
];

export const tools: string[] = [
  "Git",
  "Linux",
  "VS Code",
  "Figma",
  "Terminal",
  "Docker",
  "PostgreSQL",
  "Firebase",
];
