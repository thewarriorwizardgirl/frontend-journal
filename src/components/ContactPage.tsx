import React from "react";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import BrandMark from "./BrandMark";
import JournalContactCard from "./JournalContactCard";

const email = "thewarriorwizardgirl@gmail.com";
const whatsappUrl =
  "https://wa.me/919873816925?text=Hello%20Vidhi%2C%20I%27d%20love%20a%20callback.";

export default function ContactPage() {
  return (
    <div className="page-shell" id="top">
      <header className="masthead">
        <div className="masthead-meta">
          <span>Field notes · Stories · Small adventures</span>
          <span>By Vidhi Aggarwal</span>
        </div>
        <div className="masthead-row">
          <h1 className="journal-title">Say hello</h1>
          <a
            className="brand-lockup"
            href="https://thewarriorwizardgirl.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span>The Warrior Wizard Girl</span>
            <BrandMark />
          </a>
        </div>
      </header>
      <main className="contact-page-layout">
        <section className="contact-page-copy">
          <span className="eyebrow">My inbox is open</span>
          <h2>Every good story starts with a hello.</h2>
          <div className="contact-options">
            <a className="contact-option" href={`mailto:${email}`}>
              <span className="contact-option-icon">
                <Mail size={21} aria-hidden="true" />
              </span>
              <span>
                <small>Email me</small>
                <strong>{email}</strong>
              </span>
            </a>
            <a
              className="contact-option"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-option-icon">
                <MessageCircle size={21} aria-hidden="true" />
              </span>
              <span>
                <small>Request a WhatsApp callback</small>
                <strong>+91 98738 16925</strong>
              </span>
            </a>
          </div>
          <a
            className="back-to-journal"
            href="/"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to the journal
          </a>
        </section>
        <JournalContactCard
          className="contact-card--contact-page"
          message="A little note goes a long way. I’d love to hear from you."
          href={`mailto:${email}`}
          actionLabel="Email me"
        />
      </main>
      <ContactFooter />
    </div>
  );
}

function ContactFooter() {
  return (
    <footer className="site-footer">
      <strong>The Warrior Wizard Girl</strong>
      <span>A small corner of the internet, always open.</span>
      <a href={`mailto:${email}`}>{email}</a>
    </footer>
  );
}
