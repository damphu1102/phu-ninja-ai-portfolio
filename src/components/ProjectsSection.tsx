import React from "react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      id: "devlog",
      title: "DevLog - Tech Blog Platform",
      description:
        "A modern tech blog platform with a minimalist design featuring dark/light mode, article search & filtering by category, reading time estimation, table of contents, focus mode, and a beautiful reading experience for Vietnamese tech developers.",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
      techStack: ["ReactJS", "TypeScript", "Tailwind CSS", "Vite"],
      liveUrl: "https://devlog-pink.vercel.app/",
    },
    {
      id: "edu-ai",
      title: "EduAI - Educational Platform",
      description:
        "A role-based educational platform translating complex Figma designs into pixel-perfect, responsive React components for 20+ screens. Features real-time notifications via WebSockets, RESTful API integration with Axios, and global state management with Redux Toolkit.",
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800",
      techStack: ["ReactJS", "TypeScript", "Tailwind CSS", "Redux Toolkit", "WebSockets"],
      githubUrl: "https://github.com/damphu1102/eduAI",
    },
    {
      id: "crm-system",
      title: "CRM System - Customer Management",
      description:
        "Scalable Customer Relationship Management dashboard handling large datasets of user interactions. Features interactive Chart.js data visualizations, multi-step forms with React Hook Form & Zod validation, and Agile/Scrum API collaboration with Swagger integration.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      techStack: ["ReactJS", "TypeScript", "Tailwind CSS", "Chart.js", "React Hook Form", "Zod"],
      githubUrl: "https://github.com/chinhkrb113/CRM_system",
    },
    {
      id: "dms",
      title: "DMS - Distribution Management System",
      description:
        "Mobile Distribution Management System for warehouse and inventory tracking. Implements barcode scanning, real-time inventory updates, offline data synchronization, and intuitive mobile interfaces optimized for fast-paced warehouse environments.",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      techStack: ["React Native", "Expo", "TypeScript", "Redux", "RESTful APIs"],
      githubUrl: "https://github.com/MLuc24/dms",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden reveal-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,255,132,0.08)_0%,transparent_70%)] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-[#00ff84]/50"></span>
            <span className="text-[#00ff84] font-medium tracking-widest uppercase text-sm">MY PROJECTS</span>
            <span className="h-[1px] w-12 bg-[#00ff84]/50"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Intuitive, <span className="text-[#00ff84]">User-Friendly</span>, Efficient
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg">
            Contributed to developing the user interface for internal management applications,
            focusing on intuitive design and optimizing user workflows.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00ff84]/30 hover:bg-[#0a0a0a]/80 transition-all duration-500 animate-fade-in hover:-translate-y-1 relative flex flex-col h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="h-64 sm:h-72 w-full overflow-hidden relative flex-shrink-0">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Action Buttons */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center gap-4 z-20 pt-12">
                  {/* Live Demo Button */}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-[#00ff84] hover:text-black hover:border-[#00ff84] transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-black/50 backdrop-blur-md border border-white/10 text-gray-500 cursor-not-allowed translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </span>
                  )}

                  {/* GitHub Button */}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    >
                      <Github className="w-4 h-4 mr-2" /> Code
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-black/50 backdrop-blur-md border border-white/10 text-gray-500 cursor-not-allowed translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Github className="w-4 h-4 mr-2" /> Code
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-[#00ff84] mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full border border-white/10 text-xs sm:text-sm text-gray-300 bg-white/5 hover:border-[#00ff84]/50 hover:text-[#00ff84] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
