import React from "react";
import { GraduationCap, Award, Calendar, ExternalLink } from "lucide-react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  gpa?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  logo?: string;
}

const EducationSection = () => {
  const education: Education[] = [
    {
      id: "university",
      institution: "Hanoi University of Science and Technology",
      degree: "Bachelor's Degree",
      field: "Information Technology",
      startDate: "2021",
      endDate: "2025",
      description: "Focused on software engineering, web development, and database management. Participated in programming competitions and tech clubs.",
      gpa: "3.2/4.0"
    }
  ];

  const certifications: Certification[] = [
    {
      id: "meta-frontend",
      name: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta (Coursera)",
      date: "Dec 2023",
      credentialUrl: "#"
    },
    {
      id: "react-advanced",
      name: "Advanced React Patterns",
      issuer: "Frontend Masters",
      date: "Oct 2023",
      credentialUrl: "#"
    },
    {
      id: "javascript-algo",
      name: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "Aug 2023",
      credentialUrl: "#"
    },
    {
      id: "responsive-web",
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "Jun 2023",
      credentialUrl: "#"
    }
  ];

  return (
    <section id="education" className="py-24 bg-transparent relative overflow-hidden reveal-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-[#00ff84]/50"></span>
            <span className="text-[#00ff84] font-medium tracking-widest uppercase text-sm">Education</span>
            <span className="h-[1px] w-12 bg-[#00ff84]/50"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Academic <span className="text-[#00ff84]">Background</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
            My educational journey and professional certifications that have shaped my expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Education Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <GraduationCap className="w-7 h-7 text-[#00ff84]" />
              Education
            </h3>
            
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-[#00ff84]/30 transition-all duration-500 hover:-translate-y-1 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00ff84]/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-[#00ff84]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#00ff84] transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-[#00ff84] font-medium mb-2">{edu.field}</p>
                      <p className="text-gray-400 text-sm mb-3">{edu.institution}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {edu.startDate} - {edu.endDate}
                        </span>
                        {edu.gpa && (
                          <span className="text-[#00ff84]">GPA: {edu.gpa}</span>
                        )}
                      </div>
                      
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Award className="w-7 h-7 text-[#00ff84]" />
              Certifications
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 hover:border-[#00ff84]/30 transition-all duration-500 hover:-translate-y-1 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ff84]/20 to-[#00ff84]/5 flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-[#00ff84]" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white mb-1 group-hover:text-[#00ff84] transition-colors">
                          {cert.name}
                        </h4>
                        <p className="text-gray-400 text-sm">{cert.issuer}</p>
                        <p className="text-gray-500 text-xs mt-1">{cert.date}</p>
                      </div>
                    </div>
                    
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#00ff84] transition-colors p-2"
                        title="View Credential"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
