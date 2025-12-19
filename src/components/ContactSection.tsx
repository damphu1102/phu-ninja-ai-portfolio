import React from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden reveal-hidden">
        {/* Background Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00ff84]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Column: Contact Info */}
                <div className="space-y-8 animate-fade-in-left">
                    <div>
                         <div className="flex items-center gap-4 mb-4">
                            <span className="h-[1px] w-12 bg-[#00ff84]/50"></span>
                            <span className="text-[#00ff84] font-medium tracking-widest uppercase text-sm">CONTACT ME</span>
                         </div>
                        <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
                            Let's <span className="text-[#00ff84]">Contact</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            Always open to discussions, collaborations, and new opportunities. Feel free to get in touch and let's create impactful products together.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Email */}
                        <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                            <div className="w-14 h-14 rounded-full bg-[#00ff84]/10 flex items-center justify-center border border-[#00ff84]/20 group-hover:border-[#00ff84] group-hover:bg-[#00ff84] transition-all duration-300">
                                <Mail className="w-6 h-6 text-[#00ff84] group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Email Address</p>
                                <p className="text-white font-medium text-lg">damphu207@gmail.com</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                            <div className="w-14 h-14 rounded-full bg-[#00ff84]/10 flex items-center justify-center border border-[#00ff84]/20 group-hover:border-[#00ff84] group-hover:bg-[#00ff84] transition-all duration-300">
                                <Phone className="w-6 h-6 text-[#00ff84] group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Phone Number</p>
                                <p className="text-white font-medium text-lg">(+84) 397 706 411</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                            <div className="w-14 h-14 rounded-full bg-[#00ff84]/10 flex items-center justify-center border border-[#00ff84]/20 group-hover:border-[#00ff84] group-hover:bg-[#00ff84] transition-all duration-300">
                                <MapPin className="w-6 h-6 text-[#00ff84] group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Address Location</p>
                                <p className="text-white font-medium text-lg">Hoang Mai District, Hanoi</p>
                            </div>
                        </div>

                         {/* Zalo Button (User Preference) */}
                         <div 
                            className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform duration-300"
                            onClick={() => window.open("https://zalo.me/0785708631", "_blank")}
                        >
                            <div className="w-14 h-14 rounded-full bg-[#00ff84]/10 flex items-center justify-center border border-[#00ff84]/20 group-hover:border-[#00ff84] group-hover:bg-[#00ff84] transition-all duration-300">
                                <MessageCircle className="w-6 h-6 text-[#00ff84] group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Chat on Zalo</p>
                                <p className="text-white font-medium text-lg">Click to connect</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10 animate-fade-in-right">
                    <form className="space-y-8">
                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
                             <input 
                                type="text" 
                                className="w-full bg-transparent border-b border-white/20 px-1 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00ff84] transition-colors"
                                placeholder="Enter your name"
                             />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300 ml-1">Your Email</label>
                             <input 
                                type="email" 
                                className="w-full bg-transparent border-b border-white/20 px-1 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00ff84] transition-colors"
                                placeholder="Enter your email"
                             />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300 ml-1">Your Message</label>
                             <textarea 
                                className="w-full bg-transparent border-b border-white/20 px-1 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00ff84] transition-colors resize-none h-32"
                                placeholder="Tell me about your project"
                             />
                        </div>

                        <Button className="w-full h-12 bg-[#00ff84] hover:bg-[#00cc6a] text-black font-bold text-base rounded-full mt-4 transition-transform hover:scale-[1.02]">
                            Send Message
                            <Send className="ml-2 w-5 h-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
};

export default ContactSection;
