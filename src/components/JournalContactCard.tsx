import React from "react";
import { Mail } from "lucide-react";
import OwlIllustration from "./OwlIllustration";

type JournalContactCardProps = {
  message?: string;
  href?: string;
  actionLabel?: string;
  className?: string;
};

export default function JournalContactCard({
  message = "A note,   a hello,\n or a story of your own?",
  href = "/contact",
  actionLabel = "Say Hello",
  className = "",
}: JournalContactCardProps) {
  return (
    <section className={`contact-card ${className}`.trim()}>
      <OwlIllustration />
      <div className="contact-card-copy">
        <p>{message}</p>
        <a href={href}>
          {actionLabel} <Mail size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
