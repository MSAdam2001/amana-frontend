"use client";

import { useState } from "react";
import Link from "next/link";

const safetySections = [
  {
    id: "before-hiring",
    number: "01",
    title: "Before you hire",
    description:
      "Take a few moments to understand who you're hiring and what the job involves.",
    items: [
      {
        icon: "👤",
        title: "Review the artisan profile",
        text: "Look through the artisan's services, experience, portfolio, location, and profile information.",
      },
      {
        icon: "⭐",
        title: "Check ratings and reviews",
        text: "Use reviews from previous customers to understand the artisan's work and communication.",
      },
      {
        icon: "📸",
        title: "Look at their work",
        text: "Review photos or videos of previous work when available. A portfolio can help you understand their experience.",
      },
      {
        icon: "💬",
        title: "Discuss the job",
        text: "Explain what you need, ask questions, and make sure both sides understand the work before starting.",
      },
    ],
  },
  {
    id: "during-job",
    number: "02",
    title: "During the job",
    description:
      "Clear communication and agreed expectations help make the experience better for everyone.",
    items: [
      {
        icon: "📋",
        title: "Confirm the scope",
        text: "Make sure you and the artisan agree on what needs to be done before work begins.",
      },
      {
        icon: "💰",
        title: "Understand the price",
        text: "Discuss labour, materials, transport, and any other expected costs before proceeding.",
      },
      {
        icon: "📱",
        title: "Keep communication clear",
        text: "Use clear messages and keep important job details available for reference.",
      },
      {
        icon: "🔐",
        title: "Protect your account",
        text: "Never share your password, login codes, OTPs, or other account security information with anyone.",
      },
    ],
  },
  {
    id: "for-artisans",
    number: "03",
    title: "For artisans",
    description:
      "A safe marketplace works both ways. Customers and artisans should treat each other with respect.",
    items: [
      {
        icon: "🧰",
        title: "Describe your services honestly",
        text: "Show customers what you actually do and keep your service information accurate.",
      },
      {
        icon: "📸",
        title: "Show real work",
        text: "Use photos and videos that represent your own work and experience.",
      },
      {
        icon: "🤝",
        title: "Agree before starting",
        text: "Discuss the job requirements, expected costs, materials, and timing with the customer.",
      },
      {
        icon: "🚩",
        title: "Report suspicious behaviour",
        text: "If a customer or another user behaves suspiciously or violates Amana rules, report the issue.",
      },
    ],
  },
];

const faqs = [
  {
    question: "Does Amana guarantee every artisan?",
    answer:
      "Amana provides a platform for customers and artisans to connect. Customers should review available profile information, portfolios, ratings, reviews, and job details before hiring. Any verification labels shown on Amana should only be treated as verification for the information or checks that Amana actually performs.",
  },
  {
    question: "What should I check before hiring an artisan?",
    answer:
      "Start with the artisan's profile, services, portfolio, reviews, rating, experience, and service area. Then discuss your specific job requirements, timing, materials, and expected price before work begins.",
  },
  {
    question: "Should I share my OTP or password with an artisan?",
    answer:
      "No. Never share your Amana password, OTP, verification code, or other account security information with another person.",
  },
  {
    question: "What should I do if something feels suspicious?",
    answer:
      "Stop and take a moment before continuing. Do not share sensitive information or make a decision under pressure. Use Amana's reporting or support options to report the problem.",
  },
  {
    question: "How should customers and artisans agree on payment?",
    answer:
      "Both sides should clearly understand the expected cost before work starts. Discuss labour, materials, transport, additional work, and any other relevant costs so there are fewer surprises later.",
  },
  {
    question: "Can I report a problem with another user?",
    answer:
      "Yes. If you experience suspicious, abusive, fraudulent, or inappropriate behaviour, report the issue through the available Amana support and reporting channels.",
  },
];

function ShieldIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 3L20 6V11.5C20 16.7 16.7 20.4 12 22C7.3 20.4 4 16.7 4 11.5V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12L10.8 14.3L15.7 9.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12.5L9.5 17L19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SafetyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F3E8] text-[#123D38]">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#083A35] text-white">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#D5A63A]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#C85A3F]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          {/* Breadcrumb */}
          <div className="mb-10 flex items-center gap-2 text-sm text-white/60">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-white/90">Safety & Trust</span>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Hero copy */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D5A63A] text-[#083A35]">
                  <ShieldIcon size={15} />
                </span>

                <span>Amana Safety & Trust</span>
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Your safety
                <span className="block text-[#D5A63A]">
                  comes first.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                A safer way to find, hire, and work with local artisans.
                Learn how to protect your account, understand a job, and make
                better decisions on Amana.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/artisans"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#C85A3F] px-6 py-3.5 font-medium text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A94632]"
                >
                  Find an Artisan
                  <ArrowIcon size={18} />
                </Link>

                <button
                  type="button"
                  onClick={() => scrollToSection("before-hiring")}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-medium text-white transition-all duration-300 hover:bg-white/10"
                >
                  Learn how to stay safe
                </button>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-md lg:ml-auto">
              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl">
                {/* Top */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                      AMANA
                    </p>
                    <p className="mt-1 font-medium text-white">
                      Trust matters
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D5A63A] text-[#083A35]">
                    <ShieldIcon size={27} />
                  </div>
                </div>

                {/* Trust items */}
                <div className="space-y-3 py-5">
                  {[
                    "Review artisan profiles",
                    "Check portfolios & reviews",
                    "Agree on the job",
                    "Protect your account",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.045] p-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D5A63A]/15 text-[#D5A63A]">
                        <CheckIcon />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {item}
                        </p>
                      </div>

                      <span className="text-xs text-white/30">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom */}
                <div className="rounded-2xl bg-[#C85A3F] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                    Simple principle
                  </p>

                  <p className="mt-2 text-lg font-medium leading-7">
                    Know who you&apos;re hiring. Understand the job. Communicate
                    clearly.
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#DCE5E1] bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F3E8] text-[#0F4C45]">
                    <ShieldIcon size={22} />
                  </div>

                  <div>
                    <p className="text-xs text-[#60736F]">
                      Safety starts with
                    </p>
                    <p className="font-semibold text-[#123D38]">
                      informed decisions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST PROMISE
      ========================================================== */}
      <section className="border-b border-[#DCE5E1] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#C85A3F]">
              The Amana approach
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#083A35] sm:text-4xl">
              Trust is built through
              <span className="text-[#C85A3F]"> transparency.</span>
            </h2>

            <p className="mt-4 leading-7 text-[#60736F]">
              Amana is designed to give customers and artisans useful
              information before they decide to work together.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Know who you're hiring",
                text: "Explore profiles, services, portfolios, ratings, reviews, and available information before making a decision.",
                icon: "👤",
              },
              {
                number: "02",
                title: "Understand the job",
                text: "Discuss what needs to be done, timing, materials, pricing, and expectations before starting.",
                icon: "📋",
              },
              {
                number: "03",
                title: "Keep communication clear",
                text: "Good communication helps customers and artisans avoid misunderstandings and work together more confidently.",
                icon: "🤝",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group rounded-3xl border border-[#DCE5E1] bg-[#F8F3E8]/55 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                    {item.icon}
                  </div>

                  <span className="text-sm font-semibold text-[#C85A3F]">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold text-[#083A35]">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-[#60736F]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK NAVIGATION
      ========================================================== */}
      <section className="bg-[#F8F3E8]">
        <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-[#DCE5E1] bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-semibold text-[#083A35]">
                  Looking for something specific?
                </p>

                <p className="mt-1 text-sm text-[#60736F]">
                  Jump directly to the section you need.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  ["before-hiring", "Before you hire"],
                  ["during-job", "During the job"],
                  ["for-artisans", "For artisans"],
                  ["faqs", "FAQs"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="rounded-xl border border-[#DCE5E1] bg-[#F8F3E8] px-4 py-2.5 text-sm font-medium text-[#0F4C45] transition-colors hover:border-[#0F4C45]/30 hover:bg-[#0F4C45] hover:text-white"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN SAFETY SECTIONS
      ========================================================== */}
      <section className="bg-[#F8F3E8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#60736F]">
                  Safety guide
                </p>

                <nav className="mt-5 space-y-1">
                  {safetySections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#60736F] transition-colors hover:bg-white hover:text-[#083A35]"
                    >
                      <span className="text-xs font-semibold text-[#C85A3F]">
                        {section.number}
                      </span>

                      <span>{section.title}</span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => scrollToSection("faqs")}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#60736F] transition-colors hover:bg-white hover:text-[#083A35]"
                  >
                    <span className="text-xs font-semibold text-[#C85A3F]">
                      04
                    </span>

                    <span>FAQs</span>
                  </button>
                </nav>

                <div className="mt-8 rounded-2xl bg-[#083A35] p-5 text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D5A63A] text-[#083A35]">
                    <ShieldIcon size={21} />
                  </div>

                  <p className="mt-4 text-sm font-medium">
                    Something doesn't feel right?
                  </p>

                  <p className="mt-2 text-xs leading-5 text-white/55">
                    Stop, protect your information, and report the issue.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#D5A63A]"
                  >
                    Contact support
                    <ArrowIcon size={15} />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="space-y-20">
              {safetySections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  {/* Section header */}
                  <div className="flex gap-5">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F4C45] font-semibold text-white sm:flex">
                      {section.number}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 sm:hidden">
                        <span className="text-sm font-semibold text-[#C85A3F]">
                          {section.number}
                        </span>
                      </div>

                      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#083A35] sm:text-4xl">
                        {section.title}
                      </h2>

                      <p className="mt-3 max-w-2xl leading-7 text-[#60736F]">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <div
                        key={item.title}
                        className="group rounded-3xl border border-[#DCE5E1] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F8F3E8] text-xl">
                            {item.icon}
                          </div>

                          <div className="text-[#C85A3F] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <ArrowIcon size={18} />
                          </div>
                        </div>

                        <h3 className="mt-6 text-lg font-semibold text-[#083A35]">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#60736F]">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          IMPORTANT SECURITY REMINDER
      ========================================================== */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-[2rem] bg-[#0F4C45] text-white shadow-2xl">
            <div className="grid lg:grid-cols-[1fr_0.8fr]">
              <div className="p-8 sm:p-12 lg:p-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D5A63A] text-[#083A35]">
                  <ShieldIcon size={25} />
                </div>

                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-[#D5A63A]">
                  Important reminder
                </p>

                <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  Your account belongs to you.
                </h2>

                <p className="mt-5 max-w-xl leading-7 text-white/65">
                  Amana will never need your password or personal security
                  codes from another person. Keep your login details private
                  and be careful with unexpected requests.
                </p>
              </div>

              <div className="border-t border-white/10 bg-white/[0.04] p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
                <div className="space-y-4">
                  {[
                    "Never share your password",
                    "Never share an OTP or login code",
                    "Be careful with unexpected payment requests",
                    "Report suspicious behaviour",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D5A63A]/15 text-[#D5A63A]">
                        <CheckIcon />
                      </span>

                      <span className="text-sm text-white/80">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          REPORT PROBLEM
      ========================================================== */}
      <section className="bg-[#F8F3E8] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#C85A3F] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
                Need help?
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Something went wrong?
                <span className="block text-[#F8E9B8]">
                  We want to know about it.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-white/75">
                If you experience suspicious behaviour, a serious problem, or
                something that makes you uncomfortable, use Amana's support
                channels to report it.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-[#A94632] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F8F3E8]"
                >
                  Report a problem
                  <ArrowIcon size={18} />
                </Link>

                <Link
                  href="/help"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
                >
                  Visit Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section
        id="faqs"
        className="scroll-mt-24 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#C85A3F]">
              Frequently asked questions
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#083A35] sm:text-4xl">
              Safety questions,
              <span className="text-[#C85A3F]"> answered.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#60736F]">
              Simple answers to common questions about staying safe while
              using Amana.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[#DCE5E1] rounded-3xl border border-[#DCE5E1] bg-white">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-[#083A35] sm:text-lg">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DCE5E1] text-[#0F4C45] transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <span className="text-xl font-light leading-none">
                        +
                      </span>
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 pr-14 text-sm leading-7 text-[#60736F] sm:px-7 sm:pb-7">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="bg-[#F8F3E8] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C45] text-white shadow-lg">
            <ShieldIcon size={27} />
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-[-0.04em] text-[#083A35] sm:text-5xl">
            Ready to find the right artisan?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#60736F]">
            Explore artisan profiles, compare available information, and
            choose someone who fits your job.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/artisans"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C85A3F] px-7 py-3.5 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A94632]"
            >
              Find an Artisan
              <ArrowIcon size={18} />
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-[#0F4C45]/15 bg-white px-7 py-3.5 font-medium text-[#0F4C45] transition-all duration-300 hover:border-[#0F4C45]/30 hover:bg-[#0F4C45] hover:text-white"
            >
              How Amana works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}