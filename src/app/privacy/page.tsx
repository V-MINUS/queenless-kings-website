import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Queen Less Kings',
  description:
    'Learn how Queen Less Kings collects, uses, and protects personal data across our website, mailing list, and partner integrations.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-brand-cream">
      <section className="mx-auto max-w-5xl px-6 py-24 space-y-10">
        <header>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-crimson/80">Queen Less Kings</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-brand-cream/70 text-lg">
            Effective February 26, 2026. We take privacy seriously so artists, collaborators, and fans can engage
            with confidence.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">1. Data We Collect</h2>
          <ul className="list-disc space-y-2 pl-6 text-brand-cream/80">
            <li>Contact details you share via forms, bookings, or newsletter signups.</li>
            <li>Analytics data (pages visited, device type) captured through privacy-friendly tools.</li>
            <li>Content you provide when requesting collaborations, submissions, or feedback.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">2. How We Use Your Data</h2>
          <p className="text-brand-cream/80">
            We respond to enquiries, schedule releases, deliver newsletters, and measure campaign performance. We do
            not sell personal data. We only share information with vetted processors that help us operate the Queen
            Less Kings platform (email, hosting, automation, social scheduling, analytics).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">3. Cookies & Tracking</h2>
          <p className="text-brand-cream/80">
            Cookies are kept to a minimum. Analytics and marketing pixels are only used to improve the fan experience
            and are never linked to sensitive information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">4. Data Rights</h2>
          <p className="text-brand-cream/80">
            Request access, corrections, or deletion any time by emailing
            <a className="ml-1 text-brand-crimson underline" href="mailto:privacy@queenlesskingsband.com">
              privacy@queenlesskingsband.com
            </a>
            . We reply within 30 days and confirm once actions are complete.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">5. Third-Party Processors</h2>
          <p className="text-brand-cream/80">
            We rely on providers for hosting, analytics, email, automation, ticketing, and social APIs. Each partner is
            reviewed for GDPR compliance and only receives the minimum data needed to perform contracted work.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-brand-crimson">6. Updates</h2>
          <p className="text-brand-cream/80">
            We update this policy when launching new services or integrations. Material changes will be announced on
            this page with a new effective date.
          </p>
        </section>

        <footer className="pt-6 border-t border-brand-crimson/30 text-brand-cream/70">
          <p>Questions? Email privacy@queenlesskingsband.com.</p>
          <p className="mt-2">
            Need the legal terms?{' '}
            <Link href="/terms" className="text-brand-crimson underline">
              View our Terms of Service
            </Link>
            .
          </p>
        </footer>
      </section>
    </main>
  )
}
