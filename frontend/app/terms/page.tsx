import type { Metadata } from "next";
import { FrevoHeader } from "@/components/frevo/FrevoHeader";
import { FrevoFooter } from "@/components/frevo/FrevoFooter";
import { LegalDoc } from "@/components/agency/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Service — FREVO",
  description:
    "The terms and conditions that govern project briefs, talent matching, milestone escrow, and IP handover on FREVO.",
};

export default function TermsPage() {
  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <FrevoHeader />
      <main className="bg-dark text-on-ink">
        <LegalDoc
          title="Terms of Service"
          updated="October 2026"
          sections={[
            {
              h: "Acceptance of Terms",
              p: [
                "By accessing or using the FREVO platform, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our platform or services.",
              ],
            },
            {
              h: "Platform Model & Project Scopes",
              p: [
                "FREVO operates as a curated creative marketplace matching businesses with independent creative specialists and pods.",
                "Every project initiated on FREVO requires an agreed scope detailing deliverables, timelines, milestone checkpoints, and objective acceptance criteria before production begins.",
              ],
            },
            {
              h: "Milestone Escrow & Payment Protection",
              p: [
                "To protect both clients and creators, funds for active milestones are deposited into FREVO Escrow prior to work commencing.",
                "Escrow funds are released to the freelancer or pod only upon client review and formal milestone approval against agreed criteria.",
                "Objective mediation is provided by FREVO if a submitted deliverable materially differs from the agreed brief specifications.",
              ],
            },
            {
              h: "Intellectual Property (IP) Handover",
              p: [
                "Upon final milestone approval and payment release, 100% full, unencumbered intellectual property rights, source files, and commercial licenses for the delivered work transfer automatically and unconditionally to the client.",
                "Freelancers retain the right to showcase delivered creative work in their personal portfolios unless a formal Non-Disclosure Agreement (NDA) specifies otherwise.",
              ],
            },
            {
              h: "Community & Platform Integrity",
              p: [
                "Users agree to provide authentic portfolio samples, deliver honest project evaluations, adhere to agreed revision cycles, and refrain from circumventing milestone protections or engaging in fee avoidance.",
              ],
            },
            {
              h: "Contact & Support",
              p: [
                "Questions regarding project agreements, milestone protections, or these terms? Reach our platform team at hello@frevo.co.",
              ],
            },
          ]}
        />
      </main>
      <FrevoFooter />
    </>
  );
}
