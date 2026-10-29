"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Sparkles, Code, Mail, Briefcase } from "lucide-react";
import { useLanguage } from "@/src/context/language-context";
import { portfolioIntro, portfolioIntroBs } from "@/src/data/personal";
import { cn } from "@/lib/utils";


function getMessageText(message: { content?: string; parts?: Array<{ type: string; text?: string }> }): string {
  if (message.parts?.length) {
    return message.parts
      .filter((p): p is { type: string; text: string } => p.type === "text" && "text" in p)
      .map((p) => p.text)
      .join("");
  }
  return message.content ?? "";
}

export function PortfolioChat() {
  const { t, language } = useLanguage();
  const isBs = language === 'bs';
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages, append, input, setInput, status, error, reload } = useChat({
    api: "/api/chat",
    body: { language },
    initialMessages: [
      { id: "welcome", role: "assistant", content: isBs ? portfolioIntroBs : portfolioIntro },
    ],
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    setMessages(previous => previous.map(message => message.id === 'welcome'
      ? { ...message, content: isBs ? portfolioIntroBs : portfolioIntro } : message));
  }, [isBs, setMessages]);

  useEffect(() => {
    const log = scrollRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, status]);

  const quickActions = [
    {
      icon: Sparkles,
      text: isBs ? 'O Adinu' : 'About Adin',
      message: isBs ? 'Reci mi nešto o Adinu' : 'Tell me about Adin',
      color: "from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30",
    },
    {
      icon: Code,
      text: isBs ? 'Projekti' : 'Projects',
      message: isBs ? 'Koji su Adinovi projekti?' : 'What projects has Adin built?',
      color: "from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30",
    },
    {
      icon: Briefcase,
      text: isBs ? 'Vještine' : 'Skills',
      message: isBs ? 'Koje tehnologije Adin koristi?' : 'What are Adin’s technical skills?',
      color: "from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30",
    },
    {
      icon: Mail,
      text: isBs ? 'Kontakt' : 'Contact',
      message: isBs ? 'Kako mogu kontaktirati Adina?' : 'How can I contact Adin?',
      color: "from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30",
    },
  ];

  const handleQuickAction = (message: string) => {
    if (!isLoading) {
      append({ role: "user", content: message });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card border border-primary/20 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
        {/* Header - same style as terminal */}
        <div className="bg-secondary px-4 py-3 flex items-center gap-2 border-b border-primary/10">
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" />
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer" />
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer" />
          </div>
          <span className="font-mono text-xs text-primary ml-2 flex items-center gap-2">
            <Bot className="w-4 h-4" />
            {isBs ? 'Portfolio asistent' : 'Portfolio assistant'}
          </span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} role="log" aria-label={isBs ? 'Razgovor s asistentom' : 'Conversation with assistant'} aria-live="polite" className="bg-background p-4 h-80 overflow-y-auto font-mono text-sm flex flex-col gap-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.role === "user" ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role !== "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 whitespace-pre-wrap",
                    message.role === "user"
                      ? "bg-primary/15 border border-primary/20 text-foreground"
                      : "bg-secondary border border-primary/10 text-muted-foreground"
                  )}
                >
                  {getMessageText(message).split(/(https?:\/\/[^\s]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g).map((part, index) => {
                    if (/^https?:\/\//.test(part)) {
                      const url = part.replace(/[.,;!?)]+$/, '');
                      return <a key={index} className="chat-link" href={url} target="_blank" rel="noopener noreferrer">{url}</a>;
                    }
                    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(part)) return <a key={index} className="chat-link" href={`mailto:${part}`}>{part}</a>;
                    return part;
                  })}
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 items-center text-muted-foreground"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
          {error && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
              <p className="font-medium">{isBs ? 'Poruka nije poslana.' : 'Message could not be sent.'}</p>
              <p className="mt-1 text-muted-foreground">
                {isBs ? 'Pokušaj ponovo ili se javi putem emaila.' : 'Try again or get in touch by email.'}
              </p>
              <button type="button" className="chat-retry" onClick={() => reload()} disabled={isLoading}>{isBs ? 'Pokušaj ponovo' : 'Try again'}</button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-3 border-t border-primary/10">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.text}
                onClick={() => handleQuickAction(action.message)}
                disabled={isLoading}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 bg-gradient-to-r ${action.color} text-foreground border border-primary/10 disabled:opacity-50 disabled:cursor-not-allowed`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <action.icon className="w-3 h-3" />
                {action.text}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim() || isLoading) return;
            append({ role: "user", content: input.trim() });
            setInput("");
          }}
          className="bg-secondary px-4 py-3 border-t border-primary/10 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chat?.inputPlaceholder ?? "Ask about projects, skills, contact..."}
            aria-label={isBs ? 'Pitaj o Adinovim projektima' : 'Ask about Adin’s projects'}
            className="flex-1 bg-background border border-primary/20 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            aria-label={isBs ? 'Pošalji poruku' : 'Send message'}
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
