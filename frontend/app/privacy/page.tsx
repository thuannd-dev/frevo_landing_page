import type { Metadata } from "next";
import { FrevoHeader } from "@/components/frevo/FrevoHeader";
import { FrevoFooter } from "@/components/frevo/FrevoFooter";
import { LegalDoc } from "@/components/agency/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy — FREVO",
  description:
    "How FREVO collects, uses and protects client project briefs, freelancer profiles, and collaboration data.",
};

export default function PrivacyPage() {
  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <FrevoHeader />
      <main className="bg-dark text-on-ink">
        <LegalDoc
          title="Privacy Policy"
          updated="October 2026"
          sections={[
            {
              h: "Overview",
              p: [
                "FREVO (“we”, “us”, “our”) operates a curated creative freelance marketplace and collaboration platform. This policy explains what information we collect, why we collect it, and how your data is handled and protected when using our platform.",
              ],
            },
            {
              h: "Information We Collect",
              p: [
                "Project Briefs & Inquiries: When you post a project or contact us, we collect your name, business email, company details, project scope, deliverable specifications, and budget parameters.",
                "Freelancer & Pod Profiles: For creative talent, we collect portfolios, case studies, verified past deliveries, skill categories, and profile identity information.",
                "Collaboration & Escrow Records: Project communications, milestone agreements, approval logs, and transaction confirmations necessary to operate milestone-backed protection.",
                "Platform Usage: Standard analytics (browser type, device information, interactions) to optimize marketplace matchmaking and platform performance.",
              ],
            },
            {
              h: "How We Use Information",
              p: [
                "To connect businesses with curated creative talent and pods matching their precise project requirements.",
                "To facilitate structured milestone workflows, project scopes, escrow deposits, and deliverable sign-offs.",
                "To maintain security, prevent unauthorized access, and verify the integrity of the creative network. We never sell personal or company data.",
              ],
            },
            {
              h: "Confidentiality & Creative IP",
              p: [
                "All project briefs, unpublished production files, brand assets, and creative deliverables shared within project scopes remain strictly confidential between the client and the engaged freelancer or pod.",
              ],
            },
            {
              h: "Service Processors & Infrastructure",
              p: [
                "We partner with secure cloud hosting, media delivery networks, and payment infrastructure providers. These partners process data strictly on our behalf under rigorous security commitments.",
              ],
            },
            {
              h: "Your Rights & Inquiries",
              p: [
                "You may request access to, correction of, or deletion of your profile or account information at any time. For privacy inquiries or data requests, contact us at hello@frevo.co.",
              ],
            },
          ]}
        />
      </main>
      <FrevoFooter />
    </>
  );
}
