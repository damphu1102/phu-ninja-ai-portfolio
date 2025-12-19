import React from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      id: "spree",
      title: "Spree e-commerce",
      description: "A fully customizable e-commerce experience built with Next.js, featuring a modern UI and seamless checkout process.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800", // Placeholder for ecommerce
      techStack: ["NextJS", "TypeScript", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "platzi",
      title: "Platzi Fake Store",
      description: "A dynamic product showcase utilizing the Platzi API, demonstrating efficient state management and data fetching.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800", // Product shot
      techStack: ["ReactJS", "TypeScript", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "s-flow",
      title: "S-Flow Media",
      description: "An immersive streaming platform interface with dark mode, smooth transitions, and responsive content grid.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800", // Streaming/Media
      techStack: ["ReactJS", "Redux", "SCSS"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "weather",
      title: "Weather Intelligence",
      description: "Real-time weather dashboard providing detailed forecasts and environmental analytics for major cities.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800", // Weather
      techStack: ["VueJS", "ChartJS", "OpenWeatherMap"],
      liveUrl: "#",
      githubUrl: "#"
    }
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
                  Contributed to developing the user interface for internal management applications, focusing on intuitive design and optimizing user workflows.
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
                             {/* Overlay - Darken slightly on hover for focus */}
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>
                             
                            <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* Action Buttons - Always visible on image bottom */}
                            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center gap-4 z-20 pt-12">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="rounded-full bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-[#00ff84] hover:text-black hover:border-[#00ff84] transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="rounded-full bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                                >
                                    <Github className="w-4 h-4 mr-2" /> Code
                                </Button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-1">
                            <h3 className="text-2xl font-bold text-[#00ff84] mb-3">{project.title}</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                                {project.description}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-3">
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
