import {
  generateText,
  convertToCoreMessages,
  createDataStreamResponse,
  formatDataStreamPart,
  type Message,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { personalInfo, portfolioIntro, portfolioLead } from "@/src/data/personal";
import { projects } from "@/src/data/projects";
import { skillCategories, tools } from "@/src/data/skills";

const PORTFOLIO_SYSTEM = `You are Adin's AI assistant — friendly, helpful, and passionate about technology. You speak like a real developer who loves building things.

Your personality:
- Enthusiastic about coding and problem-solving
- Humble but confident in your abilities
- Love sharing knowledge about projects
- Always ready to help people connect with Adin

About Adin (speak naturally):
Hey! I'm Adin — a 21-year-old software engineer at IUS (third year, Software Engineering + Management minor). I build practical projects with web dev (Next.js, React, TypeScript) and low-level stuff (C, MIPS Assembly). When I'm not coding, I manage a café — honestly, it's taught me so much about what people actually want from technology!

I love solving real problems and always eager to take on new challenges. Currently focused on building better user experiences.

--- PROJECT DETAILS (use these when asked about specific projects) ---
News Portal: Modern news platform built with Next.js, React, TypeScript. Fast content delivery, clean design, intuitive UX. Shows my web development skills.

Lens Caffe QR Menu: Digital ordering system for restaurants. QR code integration, seamless experience. Built with Next.js, React, Tailwind CSS. Practical solution for a real business need.

Cache Simulator: Educational tool that visualizes CPU cache behavior. Built with HTML/CSS/JavaScript, lots of attention to detail. Helps students understand how memory works.

Healthcare Management: Comprehensive SQL database system for patient management and medical records. Shows my database design skills.

Currency Converter: Real-time currency converter built in MIPS Assembly. Demonstrates my low-level programming abilities — challenging but rewarding!

Playwright Testing: Software testing project using TypeScript and Playwright framework. Shows my commitment to code quality.

--- SKILLS BREAKDOWN ---
Languages: Python, JavaScript, TypeScript, C, MIPS Assembly
Frontend: React, Next.js, Tailwind CSS, HTML/CSS, Framer Motion
Backend & Systems: Node.js, REST APIs, Cache Design, Memory Management, SQL
Tools: Git, Linux, VS Code, Figma, Terminal, Docker, PostgreSQL, Firebase

--- CONTACT INFO ---
Email: adin.brkic0302@gmail.com
GitHub: github.com/Brega0302
LinkedIn: linkedin.com/in/adin-brkic-6971472b8
Location: Bosnia and Herzegovina

--- HOW TO RESPOND ---
- Keep it conversational and natural
- Share specific details when asked
- Be enthusiastic about projects
- If someone seems interested, suggest they check out the projects or contact Adin
- Never be pushy — just helpful and friendly
- If you don't know something, just say so honestly

Example responses:
"Oh, the News Portal? That was a fun one! Built it with Next.js and TypeScript to deliver content super fast. Really proud of how clean the user experience turned out."

"The café management experience? Game-changer! Working directly with customers taught me how to build tech people actually want to use."

If someone wants to collaborate: "That sounds awesome! Adin's always excited about new ideas. Shoot him an email at adin.brkic0302@gmail.com or check out his projects on GitHub!"`;

const INTRO_WITH_LEAD = `${portfolioIntro}\n\n${portfolioLead}`;

function getFallbackReply(userText: string): string {
  const q = userText.trim().toLowerCase();
  if (!q || /\b(hi|hello|hey|hiya)\b/.test(q)) {
    return "Hey there! I'm here to chat about Adin's work and projects. What interests you most?";
  }
  if (/\b(about|who|bio|introduce|you)\b/.test(q)) {
    return portfolioIntro;
  }
  if (/\b(ius|study|studies|student|university|school)\b/.test(q)) {
    return "I'm at IUS studying Software Engineering with a Management minor — third year! Really enjoying the mix of technical and business skills. The management minor actually helps a lot with building user-focused stuff.";
  }
  if (/\b(cafe|café|coffee|manage|managing)\b/.test(q)) {
    return "Oh, the café experience? Game-changer! Working directly with customers taught me so much about what people actually want from technology. It's one thing to build something, totally different to see people use it every day.";
  }
  if (/\b(skill|skills|tech|stack|technolog)\b/.test(q)) {
    return "I work with quite a few technologies! Languages: Python, JavaScript, TypeScript, C, MIPS Assembly. Frontend: React, Next.js, Tailwind CSS, HTML/CSS, Framer Motion. Backend & Systems: Node.js, REST APIs, Cache Design, Memory Management, SQL. Tools: Git, Linux, VS Code, Docker, PostgreSQL. Always learning and building with them!";
  }
  if (/\b(project|work|portfolio|built)\b/.test(q)) {
    return "I've built some cool projects! News Portal (modern web platform), Lens Caffe QR Menu (restaurant tech), Cache Simulator (educational tool), Healthcare Management (SQL database), and even a Currency Converter in MIPS Assembly. Each one taught me something different!";
  }
  if (/\b(contact|email|reach|hire|talk)\b/.test(q)) {
    return "Want to connect? Awesome! You can reach Adin at adin.brkic0302@gmail.com. He's always excited to chat about new ideas or collaborations. Also on GitHub and LinkedIn if you prefer!";
  }
  return "Ask me anything about Adin's projects, skills, or how we can work together!";
}

export const maxDuration = 30;

function sendFallbackStream(userText: string): Response {
  const reply = getFallbackReply(userText);
  return createDataStreamResponse({
    execute: (dataStream) => {
      dataStream.write(formatDataStreamPart("text", reply));
      dataStream.write(
        formatDataStreamPart("finish_message", {
          finishReason: "stop",
          usage: { promptTokens: 0, completionTokens: 0 },
        })
      );
    },
  });
}

export async function POST(req: Request) {
  let messages: Array<Omit<Message, "id">>;
  try {
    const body = await req.json();
    messages = body.messages ?? [];
  } catch {
    return sendFallbackStream("");
  }

  const lastUser = messages.filter((m) => m.role === "user").pop();
  const userText = (lastUser && "content" in lastUser ? lastUser.content : "") || "";

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return sendFallbackStream(userText);
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: PORTFOLIO_SYSTEM,
      messages: convertToCoreMessages(messages),
    });
    return createDataStreamResponse({
      execute: (dataStream) => {
        dataStream.write(formatDataStreamPart("text", text));
        dataStream.write(
          formatDataStreamPart("finish_message", {
            finishReason: "stop",
            usage: { promptTokens: 0, completionTokens: 0 },
          })
        );
      },
    });
  } catch {
    return sendFallbackStream(userText);
  }
}
