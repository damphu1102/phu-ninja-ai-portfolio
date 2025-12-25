import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
}

const ExperienceSection = () => {
  const experiences: Experience[] = [
    {
      id: "ninja-ai",
      company: "Ninja AI",
      position: "Frontend Developer Intern",
      location: "Hanoi, Vietnam",
      startDate: "Jan 2024",
      endDate: "Present",
      description: [
        "Developed and maintained responsive web applications using ReactJS and TypeScript",
        "Collaborated with UI/UX designers to implement pixel-perfect designs",
        "Optimized application performance and improved page load times by 40%",
        "Participated in code reviews and contributed to team best practices"
      ],
      technologies: ["ReactJS", "TypeScript", "Tailwind CSS", "Git"]
    },
    {
      id: "freelance",
      company: "Freelance",
      position: "Web Developer",
      location: "Remote",
      startDate: "Jun 2023",
      endDate: "Dec 2023",
      description: [
        "Built custom websites for small businesses and startups",
        "Implemented responsive designs and cross-browser compatibility",
        "Integrated third-party APIs and payment gateways",
        "Provided ongoing maintenance and support for clients"
      ],
      technologies: ["HTML/CSS", "JavaScript", "ReactJS", "WordPress"]
    },
    {
      id: "personal-projects",
      company: "Personal Projects",
      position: "Self-taught Developer",
      location: "Hanoi, Vietnam",
      startDate: "Jan 2022",
      endDate: "May 2023",
      description: [
        "Completed multiple online courses on web development",
        "Built portfolio projects to practice new technologies",
        "Contributed to open-source projects on GitHub",
        "Learned best practices for clean code and software architecture"
      ],
      technologies: ["JavaScript", "ReactJS", "Node.js", "MongoDB"]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-transparent relative overflow-hidden reveal-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,255,132,0.06)_0%,transparent_70%)] pointer-events-none -z-10 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-[#00ff84]/50"></span>
            <span className="text-[#00ff84] font-medium tracking-widest uppercase text-sm">Experience</span>
            <span className="h-[1px] w-12 bg-[#00ff84]/50"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            My <span className="text-[#00ff84]">Professional</span> Journey
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg">
            A timeline of my career development and the valuable experiences I've gained along the way.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00ff84] via-[#00ff84]/50 to-transparent md:-translate-x-1/2"></div>

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#00ff84] rounded-full md:-translate-x-1/2 shadow-[0_0_20px_rgba(0,255,132,0.5)] z-10 mt-6"></div>

              {/* Content Card */}
              <div className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-[#00ff84]/30 transition-all duration-500 hover:-translate-y-1 group">
                  {/* Company & Position */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#00ff84] mb-1 group-hover:text-white transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-white font-semibold flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-[#00ff84] mt-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-300 bg-white/5 hover:border-[#00ff84]/50 hover:text-[#00ff84] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
