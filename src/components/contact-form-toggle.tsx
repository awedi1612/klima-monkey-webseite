"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageSquareText } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { cn } from "@/lib/utils";

export function ContactFormToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-background-card px-6 py-4 text-left transition-colors hover:border-brand-primary cursor-pointer"
      >
        <span className="flex items-center gap-3 text-sm font-semibold">
          <MessageSquareText className="h-4 w-4 text-brand-primary" />
          Lieber direkt schreiben statt Quiz?
        </span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-3xl border border-border bg-background-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
