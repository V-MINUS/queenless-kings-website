import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | Queen Less Kings',
  description:
    'Contractual terms governing use of Queen Less Kings digital services, mailing list, and collaborations.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-brand-cream">
      <section className="mx-auto max-w-5xl px-6 py-24 space-y-10">
        <header>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-crimson/80">Queen Less Kings</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-brand-cream/70 text-lg">
            Effective February 26, 2026. These terms outline how we deliver services, protect the band’s IP, and
            collaborate with partners, labels, promoters, and fans.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">1. Acceptance</h2>
          <p className="text-brand-cream/80">
            By using our website, newsletter, booking forms, or automation tools you agree to these terms. If you act
            on behalf of a label, promo company, or venue, you warrant that you have authority to make commitments
            for your organization.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">2. Services</h2>
          <ul className="list-disc pl-6 space-y-2 text-brand-cream/80">
            <li>Creative strategy, campaign planning, and content scheduling.</li>
            <li>API-driven workflows (n8n, social publishing, AI-assisted writing).</li>
            <li>Live events, merch drops, experiential activations, and fan engagement tools.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">3. User Responsibilities</h2>
          <p className="text-brand-cream/80">
            Provide accurate information, keep shared credentials secure, and don’t upload unlawful or infringing
            content. Reverse engineering or exploiting our code, workflows, or access tokens is prohibited.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">4. Intellectual Property</h2>
          <p className="text-brand-cream/80">
            Queen Less Kings owns the music, artwork, brand assets, code, and creative direction. Partners receive a
            limited, revocable license to use deliverables in the context of the agreed campaign or show.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">5. Liability</h2>
          <p className="text-brand-cream/80">
            We operate on a best-effort basis. We are not liable for platform outages, third-party API downtime, or
            indirect damages. Paid projects will include their own statements of work and payment milestones.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">6. Termination</h2>
          <p className="text-brand-cream/80">
            We may suspend access if these terms are violated. You can end access at any time by emailing
            <a className="ml-1 text-brand-crimson underline" href="mailto:legal@queenlesskingsband.com">
              legal@queenlesskingsband.com
            </a>
            . We’ll confirm termination and remove any optional data we host on your behalf.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">7. Contact</h2>
          <p className="text-brand-cream/80">
            Legal and compliance: legal@queenlesskingsband.com. General enquiries and bookings:
            bookings@queenlesskingsband.com.
          </p>
        </section>

        <footer className="pt-6 border-t border-brand-crimson/30 text-brand-cream/70">
          <p>
            Looking for privacy details?{' '}
            <Link href="/privacy" className="text-brand-crimson underline">
              Read our Privacy Policy
            </Link>
            .
          </p>
        </footer>
      </section>
    </main>
  )
}
