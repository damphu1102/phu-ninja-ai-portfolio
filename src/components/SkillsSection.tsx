import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Layers, 
  Code, 
  Cpu, 
  PenTool, 
  Atom, 
  Wind, 
  FileCode, 
  Database,
  GitGraph,
  Server,
  Layout,
  Smartphone
} from "lucide-react";

interface Skill {
  id: string;
  category: "languages" | "frameworks" | "tools";
  name: string;
  description: string;
  proficiency: number;
  icon: React.ReactNode;
}

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState<"all" | "languages" | "frameworks" | "tools">("all");

  const skills: Skill[] = [
    {
      id: "js",
      category: "languages",
      name: "JavaScript",
      description: "The world's most popular programming language for creating dynamic and interactive web content.",
      proficiency: 95,
      icon: <div className="w-10 h-10 rounded bg-[#00ff84]/20 text-[#00ff84] flex items-center justify-center font-bold border border-[#00ff84]/50">JS</div>
    },
    {
      id: "ts",
      category: "languages",
      name: "TypeScript",
      description: "JavaScript with superpowers: a strongly typed superset that enables more robust and scalable code.",
      proficiency: 90,
      icon: <div className="w-10 h-10 rounded bg-[#00ff84]/20 text-[#00ff84] flex items-center justify-center font-bold border border-[#00ff84]/50">TS</div>
    },
    {
      id: "react",
      category: "frameworks",
      name: "ReactJS",
      description: "A powerful and popular JavaScript library for building flexible and reusable user interfaces (UIs).",
      proficiency: 92,
      icon: <Atom className="w-10 h-10 text-[#00ff84]" />
    },
    {
      id: "html",
      category: "languages",
      name: "HTML5",
      description: "The backbone of the web, providing structure and semantic meaning to content.",
      proficiency: 98,
      icon: <FileCode className="w-10 h-10 text-[#00ff84]" />
    },
    {
      id: "css",
      category: "languages",
      name: "CSS3",
      description: "Styling the web with modern layouts, animations, and responsive designs.",
      proficiency: 95,
      icon: <Layout className="w-10 h-10 text-[#00ff84]" />
    },
    {
      id: "tailwind",
      category: "frameworks",
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for rapidly building custom user interfaces.",
      proficiency: 95,
      icon: <Wind className="w-10 h-10 text-[#00ff84]" />
    },
    {
      id: "node",
      category: "frameworks",
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 engine for building scalable network applications.",
      proficiency: 85,
      icon: <Server className="w-10 h-10 text-[#00ff84]" />
    },
    {
      id: "git",
      category: "tools",
      name: "Git & GitHub",
      description: "Version control system tracking changes in code and coordinating work on files.",
      proficiency: 90,
      icon: <GitGraph className="w-10 h-10 text-[#00ff84]" />
    },
    {
      id: "figma",
      category: "tools",
      name: "Figma",
      description: "Interface design tool for prototyping and collaboration.",
      proficiency: 80,
      icon: <PenTool className="w-10 h-10 text-[#00ff84]" />
    }
  ];

  const filteredSkills = activeTab === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  const tabs = [
    { id: "all", label: "View all", icon: <Layers size={16} /> },
    { id: "languages", label: "Languages", icon: <Code size={16} /> },
    { id: "frameworks", label: "Frameworks & Libraries", icon: <Cpu size={16} /> },
    { id: "tools", label: "Tools & Design", icon: <PenTool size={16} /> },
  ];

  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden reveal-hidden">
        {/* Background Blob */}
        {/* Background Blob - Optimized with Gradient instead of Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,255,132,0.1)_0%,transparent_70%)] pointer-events-none -z-10"></div>

        <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col items-center mb-16 text-center">
                 <div className="flex items-center gap-4 mb-4">
                    <span className="h-[1px] w-12 bg-[#00ff84]/50"></span>
                    <span className="text-[#00ff84] font-medium tracking-widest uppercase text-sm">MY SKILLS</span>
                    <span className="h-[1px] w-12 bg-[#00ff84]/50"></span>
                 </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  The <span className="text-[#00ff84]">UX-Focused</span> Developer
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg">
                  A software engineer dedicated to transforming UX/UI designs into fast, functional, and accessible code. Focused on performance, semantics, and creating seamless user interactions.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex items-center bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 overflow-x-auto w-full max-w-full md:w-auto md:overflow-visible no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                                activeTab === tab.id
                                    ? "bg-[#00ff84]/10 text-[#00ff84] shadow-[0_0_10px_rgba(0,255,132,0.2)] border border-[#00ff84]/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => {
                    const isMatch = activeTab === "all" || skill.category === activeTab;
                    
                    return (
                        <div 
                            key={skill.id}
                            className={cn(
                                "group bg-[#0a0a0a] border rounded-2xl p-6 transition-all duration-500 relative overflow-hidden",
                                isMatch 
                                    ? "border-white/5 hover:border-[#00ff84]/30 hover:bg-[#0a0a0a]/80 hover:-translate-y-1 opacity-100 scale-100 z-10 shadow-lg" 
                                    : "border-transparent opacity-20 scale-95 grayscale blur-[1px] pointer-events-none"
                            )}
                             style={{ animationDelay: `${index * 0.05}s`, transitionDelay: `${index * 0.02}s` }}
                        >
                            {/* Hover Gradient Effect - Only for matched items */}
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-tr from-[#00ff84]/5 to-transparent opacity-0 transition-opacity duration-500",
                                isMatch && "group-hover:opacity-100"
                            )}></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-6">
                                    {skill.icon}
                                </div>
                                
                                <h3 className={cn("text-xl font-bold text-white mb-2 transition-colors", isMatch && "group-hover:text-[#00ff84]")}>{skill.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{skill.description}</p>
                                
                                {/* Progress Bar */}
                                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="h-full bg-[#00ff84] rounded-full shadow-[0_0_10px_rgba(0,255,132,0.5)] relative overflow-hidden"
                                        style={{ width: `${skill.proficiency}%` }}
                                    >
                                         {/* Shimmer effect on bar */}
                                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  );
};

export default SkillsSection;
