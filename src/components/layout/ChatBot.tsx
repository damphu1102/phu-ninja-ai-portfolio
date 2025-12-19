import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import "./ChatBot.css";
import {
  Bot,
  Send,
  X,
  Image,
  MoreHorizontal,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsUp,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I am PhuGPT 🤖 I can help you learn about Dam Huu Phu and the Ninja AI Internship Program. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const questionsScrollRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Who is Dam Huu Phu?",
    "What is the Ninja AI Internship?",
    "How to apply for internship?",
    "What skills are needed?",
    "Is the internship paid?",
    "How long is the internship?",
    "Job placement support?",
    "Is experience required?",
    "Is it online or offline?",
    "Real project experience?",
    "What is the internship roadmap?",
    "Certificate upon completion?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility - Show earlier to visualize progress
      if (window.scrollY > 50) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Calculate progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionKey] = useState(() => 'session_' + Math.random().toString(36).substr(2, 9));

  // ... (sendMessage function remains same) ...
  // Need to include sendMessage and other functions if I replace the whole block or be careful.
  // I will just use ReplaceFileContent for the JSX part and imports if possible.
  // But I need to add state.
  // I will add imports and state at top, then layout at bottom.
  // This tool call is for Imports and Hooks.


  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      console.log('Sending message to chatbot:', { content, sessionId, sessionKey });
      const response = await fetch('https://tfwqbxfrjpxwhxorjxip.supabase.co/functions/v1/chatbot-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          sessionId,
          sessionKey,
        }),
      });

      const data = await response.json();
      console.log('Chatbot response:', response.status, data);

      if (response.ok) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        
        // Save session ID for future messages
        if (data.sessionId && !sessionId) {
          setSessionId(data.sessionId);
        }
      } else {
        console.error('Chatbot error response:', data);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.error || "Sorry, an error occurred. Please try again later.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat network error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, connection error. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };


  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const scrollQuestions = (direction: 'left' | 'right') => {
    if (questionsScrollRef.current) {
      const scrollAmount = 200;
      const currentScroll = questionsScrollRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      questionsScrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <>
          {/* AI Chatbot Button - moved to left as requested */}
          <div className="fixed bottom-6 left-6 z-50">
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-primary text-white shadow-green animate-pulse-glow btn-scale relative overflow-hidden chatbot-pulse"
            >
              <Bot className="w-6 h-6" />
            </Button>
          </div>

          {/* Scroll To Top Button - Right Side */}
          {showScrollTop && (
            <div className="fixed bottom-6 right-6 z-50">
              <div 
                className="relative w-14 h-14 flex items-center justify-center cursor-pointer btn-scale" 
                onClick={scrollToTop}
              >
                {/* Progress Ring SVG */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                  {/* Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#00ff84"
                    strokeWidth="2"
                    strokeOpacity="0.2"
                  />
                  {/* Progress Indicator */}
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#00ff84"
                    strokeWidth="3"
                    strokeDasharray="289.03" // 2 * pi * 46
                    strokeDashoffset={289.03 - (scrollProgress / 100) * 289.03}
                    strokeLinecap="round"
                    className="transition-all duration-100 ease-out"
                  />
                </svg>

                <Button
                  className="w-10 h-10 rounded-full bg-black/80 text-[#00ff84] p-0 shadow-none hover:bg-black group border-none z-10"
                >
                  <ChevronsUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Chat Window - moved to left to align with buttons */}
      {isOpen && (
        <Card className="fixed bottom-24 left-6 w-[350px] md:w-[400px] h-[500px] z-50 flex flex-col bg-card/95 backdrop-blur-md border shadow-xl animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-center font-semibold">PhúGPT</h3>
                <p className="text-center text-xs text-white/80">
                  AI Assistant
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isUser
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  {message.isUser ? (
                    message.content
                  ) : (
                    <div 
                      className="prose prose-sm max-w-none text-foreground"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-lg rounded-bl-none text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce animate-bounce-delay-1"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce animate-bounce-delay-2"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions - show initially and after each conversation */}
          {(messages.length === 1 || (messages.length > 1 && messages[messages.length - 1].isUser === false)) && !isTyping && (
            <div className="px-4 py-2 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-muted-foreground">
                  Suggested questions:
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQuestions(!showQuestions)}
                  className="text-muted-foreground hover:text-primary p-1 h-auto"
                >
                  {showQuestions ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </Button>
              </div>
              {showQuestions && (
                <div className="relative">
                  <div
                    ref={questionsScrollRef}
                    className="flex gap-2 overflow-x-auto flex-1 py-1"
                    style={{
                      scrollbarWidth: 'auto',
                      msOverflowStyle: 'auto'
                    }}
                  >
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="secondary"
                        size="sm"
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs h-auto p-2 text-center whitespace-nowrap flex-shrink-0 min-w-fit"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2 items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <Image className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") sendMessage(inputValue);
                }}
                className="flex-1 text-sm"
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => sendMessage(inputValue)}
                size="sm"
                className="bg-primary text-white hover:bg-primary-dark"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
