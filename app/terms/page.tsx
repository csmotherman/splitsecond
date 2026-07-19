import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://playsplitsecond.com";
const CONTACT_EMAIL = "support@playsplitsecond.com";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "Read the terms that apply when you access or use SplitSecond.",
    alternates: {
        canonical: "/terms",
    },
    openGraph: {
        title: "Terms of Service | SplitSecond",
        description:
            "Read the terms that apply when you access or use SplitSecond.",
        url: `${SITE_URL}/terms`,
        siteName: "SplitSecond",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Terms of Service | SplitSecond",
        description:
            "Read the terms that apply when you access or use SplitSecond.",
    },
};

const effectiveDate = "July 19, 2026";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#0A0B0E] text-slate-100">
            <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
                <Link
                    href="/"
                    className="inline-flex text-sm font-semibold text-[#39FF14] transition hover:opacity-80"
                >
                    ← Back to SplitSecond
                </Link>

                <header className="mt-8 border-b border-white/10 pb-8">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#39FF14]">
                        Legal
                    </p>

                    <h1 className="mt-3 font-college text-5xl tracking-wider text-white sm:text-6xl">
                        Terms of Service
                    </h1>

                    <p className="mt-4 text-sm text-slate-400">
                        Effective date: {effectiveDate}
                    </p>
                </header>

                <article className="space-y-10 py-10 text-[15px] leading-7 text-slate-300">
                    <TermsSection title="1. Acceptance of These Terms">
                        <p>
                            These Terms of Service (&quot;Terms&quot;) govern
                            your access to and use of SplitSecond, including{" "}
                            <Link
                                href={SITE_URL}
                                className="text-[#39FF14] underline underline-offset-4"
                            >
                                playsplitsecond.com
                            </Link>
                            , its games, leaderboards, accounts, and related
                            services.
                        </p>

                        <p>
                            By accessing or using SplitSecond, you agree to these
                            Terms and our{" "}
                            <Link
                                href="/privacy"
                                className="text-[#39FF14] underline underline-offset-4"
                            >
                                Privacy Policy
                            </Link>
                            . If you do not agree, do not use SplitSecond.
                        </p>
                    </TermsSection>

                    <TermsSection title="2. Eligibility">
                        <p>
                            You must be at least 13 years old to create an
                            account or submit personal information through
                            SplitSecond.
                        </p>

                        <p>
                            If you are under the age of legal majority where you
                            live, you may use SplitSecond only with permission
                            from a parent or legal guardian who agrees to these
                            Terms on your behalf.
                        </p>
                    </TermsSection>

                    <TermsSection title="3. Accounts">
                        <p>
                            Some features may require an account. You agree to
                            provide accurate information and keep your account
                            information reasonably current.
                        </p>

                        <p>
                            You are responsible for activity occurring through
                            your account and for maintaining the security of
                            your login credentials and devices.
                        </p>

                        <p>
                            You may not impersonate another person, create an
                            account using information you do not have permission
                            to use, or transfer or sell your account without our
                            written permission.
                        </p>
                    </TermsSection>

                    <TermsSection title="4. Game Rules and Scores">
                        <p>
                            SplitSecond is a timing-based game in which players
                            attempt to stop a hidden timer near specified target
                            times. Rankings and scores may be calculated using
                            total error, round performance, completion status,
                            or other published game rules.
                        </p>

                        <p>
                            We may correct, invalidate, remove, or recalculate
                            scores and rankings where we reasonably believe
                            there was an error, exploit, cheating, automation,
                            duplicate submission, technical issue, or rule
                            violation.
                        </p>

                        <p>
                            Leaderboards may reset daily, weekly, seasonally, or
                            at other intervals. We do not guarantee that any
                            score, ranking, streak, record, or gameplay history
                            will remain available permanently.
                        </p>
                    </TermsSection>

                    <TermsSection title="5. Acceptable Use">
                        <p>You agree not to:</p>

                        <ul className="list-disc space-y-2 pl-6">
                            <li>
                                Use bots, scripts, macros, automation, modified
                                clients, browser manipulation, or external timing
                                tools to gain an unfair advantage.
                            </li>
                            <li>
                                Exploit bugs, vulnerabilities, race conditions,
                                or unintended behavior.
                            </li>
                            <li>
                                Submit fabricated, manipulated, duplicated, or
                                fraudulent scores.
                            </li>
                            <li>
                                Attempt to bypass authentication, rate limits,
                                anti-cheat systems, access controls, or security
                                measures.
                            </li>
                            <li>
                                Access another person&apos;s account without
                                permission.
                            </li>
                            <li>
                                Scrape, crawl, harvest, copy, or extract data
                                through automated means without written
                                permission.
                            </li>
                            <li>
                                Interfere with the operation, availability, or
                                security of SplitSecond.
                            </li>
                            <li>
                                Upload or distribute malicious software, harmful
                                code, spam, or unlawful content.
                            </li>
                            <li>
                                Use usernames, profile information, or
                                communications that are unlawful, threatening,
                                hateful, sexually explicit, deceptive, or
                                infringe another person&apos;s rights.
                            </li>
                            <li>
                                Use SplitSecond for any illegal or unauthorized
                                purpose.
                            </li>
                        </ul>
                    </TermsSection>

                    <TermsSection title="6. Usernames and Public Information">
                        <p>
                            Your username, display name, scores, rank, and
                            certain gameplay statistics may be visible to other
                            users or the public.
                        </p>

                        <p>
                            You may not choose a username that impersonates
                            another person, violates intellectual property
                            rights, contains prohibited content, or falsely
                            suggests an official relationship with SplitSecond.
                        </p>

                        <p>
                            We may change, hide, or remove usernames or profile
                            information that violate these Terms or create a
                            safety, legal, or operational concern.
                        </p>
                    </TermsSection>

                    <TermsSection title="7. Ownership and Intellectual Property">
                        <p>
                            SplitSecond and its software, design, branding,
                            artwork, text, game systems, logos, interfaces, and
                            other content are owned by SplitSecond or its
                            licensors and are protected by applicable
                            intellectual property laws.
                        </p>

                        <p>
                            Subject to these Terms, we grant you a limited,
                            personal, revocable, non-exclusive,
                            non-transferable, and non-sublicensable right to use
                            SplitSecond for lawful personal entertainment.
                        </p>

                        <p>
                            These Terms do not grant you ownership of
                            SplitSecond or permission to copy, distribute,
                            modify, reverse engineer, sell, sublicense, or create
                            derivative works from the service except where such
                            restrictions are prohibited by law.
                        </p>
                    </TermsSection>

                    <TermsSection title="8. Feedback">
                        <p>
                            If you send us ideas, feedback, suggestions, or
                            feature requests, you grant us permission to use,
                            modify, reproduce, and implement them without
                            restriction or compensation to you.
                        </p>
                    </TermsSection>

                    <TermsSection title="9. Third-Party Services">
                        <p>
                            SplitSecond may rely on or link to third-party
                            services, including authentication, hosting,
                            database, analytics, payment, advertising, and
                            communication providers.
                        </p>

                        <p>
                            We do not control and are not responsible for
                            third-party services, their availability, content,
                            security, or policies. Your use of those services
                            may be governed by separate terms.
                        </p>
                    </TermsSection>

                    <TermsSection title="10. Purchases and Paid Features">
                        <p>
                            SplitSecond may offer paid subscriptions, premium
                            features, virtual items, or other purchases in the
                            future.
                        </p>

                        <p>
                            Prices, billing periods, renewal terms, included
                            features, and cancellation instructions will be
                            shown before purchase. Payments may be processed by
                            a third-party payment provider.
                        </p>

                        <p>
                            Except where required by law or expressly stated at
                            purchase, fees are non-refundable. We may change
                            paid offerings prospectively, but changes will not
                            retroactively alter an already completed purchase.
                        </p>
                    </TermsSection>

                    <TermsSection title="11. Suspension and Termination">
                        <p>
                            We may suspend, restrict, or terminate access to
                            SplitSecond where we reasonably believe you have
                            violated these Terms, created security or legal
                            risk, cheated, abused the service, or interfered
                            with other users.
                        </p>

                        <p>
                            We may also discontinue all or part of SplitSecond
                            at any time. Upon termination, your right to use the
                            service ends immediately.
                        </p>
                    </TermsSection>

                    <TermsSection title="12. Service Availability and Changes">
                        <p>
                            We may modify, update, suspend, remove, or
                            discontinue any part of SplitSecond, including game
                            modes, scoring systems, accounts, leaderboards,
                            challenges, features, or content.
                        </p>

                        <p>
                            We do not guarantee uninterrupted availability,
                            error-free operation, permanent storage, or
                            compatibility with every browser or device.
                        </p>
                    </TermsSection>

                    <TermsSection title="13. Disclaimer of Warranties">
                        <p className="uppercase">
                            To the maximum extent permitted by law, SplitSecond
                            is provided &quot;as is&quot; and &quot;as
                            available&quot; without warranties of any kind,
                            whether express, implied, or statutory.
                        </p>

                        <p className="uppercase">
                            We disclaim warranties of merchantability, fitness
                            for a particular purpose, title,
                            non-infringement, accuracy, availability, security,
                            and uninterrupted or error-free operation.
                        </p>

                        <p>
                            Some jurisdictions do not allow certain warranty
                            disclaimers, so some of these exclusions may not
                            apply to you.
                        </p>
                    </TermsSection>

                    <TermsSection title="14. Limitation of Liability">
                        <p className="uppercase">
                            To the maximum extent permitted by law,
                            SplitSecond and its owners, operators, affiliates,
                            contractors, and service providers will not be
                            liable for indirect, incidental, special,
                            consequential, exemplary, or punitive damages, or
                            for loss of data, profits, goodwill, access,
                            rankings, scores, or other intangible losses.
                        </p>

                        <p className="uppercase">
                            To the maximum extent permitted by law, our total
                            liability for claims arising from or relating to
                            SplitSecond will not exceed the greater of the
                            amount you paid us during the twelve months before
                            the claim or fifty U.S. dollars.
                        </p>

                        <p>
                            Some jurisdictions do not permit certain liability
                            limitations, so some limitations may not apply to
                            you.
                        </p>
                    </TermsSection>

                    <TermsSection title="15. Indemnification">
                        <p>
                            To the extent permitted by law, you agree to defend,
                            indemnify, and hold harmless SplitSecond and its
                            owners, operators, affiliates, contractors, and
                            service providers from claims, liabilities,
                            damages, losses, and expenses arising from your
                            misuse of the service, violation of these Terms, or
                            violation of another person&apos;s rights.
                        </p>
                    </TermsSection>

                    <TermsSection title="16. Governing Law">
                        <p>
                            These Terms are governed by the laws of the State of
                            Michigan, without regard to conflict-of-law rules,
                            except where applicable law requires otherwise.
                        </p>

                        <p>
                            Any legal action arising from these Terms or
                            SplitSecond will be brought in a state or federal
                            court with jurisdiction in Michigan, unless
                            applicable consumer law provides you with another
                            right.
                        </p>
                    </TermsSection>

                    <TermsSection title="17. Changes to These Terms">
                        <p>
                            We may update these Terms from time to time. We will
                            update the effective date when changes are made.
                            Material changes may also be communicated through
                            SplitSecond or another reasonable method.
                        </p>

                        <p>
                            Your continued use of SplitSecond after revised
                            Terms become effective constitutes acceptance of the
                            revised Terms.
                        </p>
                    </TermsSection>

                    <TermsSection title="18. General Provisions">
                        <p>
                            If any provision of these Terms is found
                            unenforceable, the remaining provisions will remain
                            in effect.
                        </p>

                        <p>
                            Our failure to enforce a provision is not a waiver
                            of that provision. You may not assign these Terms
                            without our written permission. We may assign these
                            Terms as part of a business transfer,
                            reorganization, or similar transaction.
                        </p>

                        <p>
                            These Terms and the Privacy Policy form the entire
                            agreement between you and SplitSecond concerning
                            the service.
                        </p>
                    </TermsSection>

                    <TermsSection title="19. Contact Us">
                        <p>Questions about these Terms may be sent to:</p>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                            <p className="font-bold text-white">SplitSecond</p>
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="text-[#39FF14] underline underline-offset-4"
                            >
                                {CONTACT_EMAIL}
                            </a>
                        </div>
                    </TermsSection>
                </article>
            </div>
        </main>
    );
}

function TermsSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="space-y-4">
            <h2 className="font-college text-3xl tracking-wide text-white">
                {title}
            </h2>
            {children}
        </section>
    );
}