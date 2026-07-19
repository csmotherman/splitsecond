import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://playsplitsecond.com";
const CONTACT_EMAIL = "support@playsplitsecond.com";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Learn how SplitSecond collects, uses, stores, and protects information.",
    alternates: {
        canonical: "/privacy",
    },
    openGraph: {
        title: "Privacy Policy | SplitSecond",
        description:
            "Learn how SplitSecond collects, uses, stores, and protects information.",
        url: `${SITE_URL}/privacy`,
        siteName: "SplitSecond",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Privacy Policy | SplitSecond",
        description:
            "Learn how SplitSecond collects, uses, stores, and protects information.",
    },
};

const effectiveDate = "July 19, 2026";

export default function PrivacyPolicyPage() {
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
                        Privacy Policy
                    </h1>

                    <p className="mt-4 text-sm text-slate-400">
                        Effective date: {effectiveDate}
                    </p>
                </header>

                <article className="space-y-10 py-10 text-[15px] leading-7 text-slate-300">
                    <PolicySection title="1. Introduction">
                        <p>
                            This Privacy Policy explains how SplitSecond
                            (&quot;SplitSecond,&quot; &quot;we,&quot;
                            &quot;us,&quot; or &quot;our&quot;) collects, uses,
                            stores, and shares information when you visit or use{" "}
                            <Link
                                href={SITE_URL}
                                className="text-[#39FF14] underline underline-offset-4"
                            >
                                playsplitsecond.com
                            </Link>{" "}
                            and related SplitSecond services.
                        </p>

                        <p>
                            By using SplitSecond, you acknowledge the practices
                            described in this Privacy Policy. If you do not agree
                            with this policy, please do not use the service.
                        </p>
                    </PolicySection>

                    <PolicySection title="2. Information We Collect">
                        <h3 className="font-bold text-white">
                            Information you provide
                        </h3>

                        <ul className="list-disc space-y-2 pl-6">
                            <li>
                                Account information, such as your email address,
                                username, display name, and profile image.
                            </li>
                            <li>
                                Information received when you sign in through an
                                authentication provider, such as Google.
                            </li>
                            <li>
                                Communications you send to us, including support
                                requests, feedback, or reports.
                            </li>
                        </ul>

                        <h3 className="pt-2 font-bold text-white">
                            Gameplay information
                        </h3>

                        <ul className="list-disc space-y-2 pl-6">
                            <li>
                                Scores, timing results, total error, rankings,
                                streaks, completed challenges, and gameplay
                                history.
                            </li>
                            <li>
                                Public leaderboard information, which may
                                include your username, display name, score, rank,
                                and related game statistics.
                            </li>
                        </ul>

                        <h3 className="pt-2 font-bold text-white">
                            Information collected automatically
                        </h3>

                        <ul className="list-disc space-y-2 pl-6">
                            <li>
                                Device and browser information, such as browser
                                type, operating system, device type, and language
                                settings.
                            </li>
                            <li>
                                Technical information, such as IP address,
                                timestamps, referring pages, error logs, and
                                general usage activity.
                            </li>
                            <li>
                                Cookies, authentication tokens, local storage,
                                and similar technologies used to keep you signed
                                in, remember preferences, operate the game, and
                                improve performance.
                            </li>
                        </ul>
                    </PolicySection>

                    <PolicySection title="3. How We Use Information">
                        <p>We may use information to:</p>

                        <ul className="list-disc space-y-2 pl-6">
                            <li>Create, authenticate, and manage accounts.</li>
                            <li>
                                Operate daily challenges, practice modes,
                                leaderboards, profiles, and other game features.
                            </li>
                            <li>
                                Save scores, calculate rankings, and prevent
                                duplicate or fraudulent submissions.
                            </li>
                            <li>
                                Detect cheating, abuse, security incidents,
                                automated activity, and violations of our Terms
                                of Service.
                            </li>
                            <li>
                                Maintain, troubleshoot, secure, and improve
                                SplitSecond.
                            </li>
                            <li>
                                Analyze general usage and performance trends.
                            </li>
                            <li>
                                Respond to support requests and communicate
                                service-related information.
                            </li>
                            <li>
                                Comply with legal obligations and enforce our
                                rights.
                            </li>
                        </ul>
                    </PolicySection>

                    <PolicySection title="4. Cookies and Local Storage">
                        <p>
                            SplitSecond may use cookies, browser storage, and
                            similar technologies to maintain authentication,
                            save preferences, remember game state, prevent
                            abuse, and understand how the service performs.
                        </p>

                        <p>
                            You may be able to block or delete cookies through
                            your browser settings. However, doing so may prevent
                            sign-in, score submission, saved preferences, or
                            other parts of SplitSecond from functioning
                            correctly.
                        </p>
                    </PolicySection>

                    <PolicySection title="5. How We Share Information">
                        <p>
                            We do not sell your personal information. We may
                            share information in the following circumstances:
                        </p>

                        <ul className="list-disc space-y-2 pl-6">
                            <li>
                                <strong className="text-white">
                                    Service providers:
                                </strong>{" "}
                                With companies that provide hosting,
                                authentication, databases, infrastructure,
                                analytics, security, or other services needed to
                                operate SplitSecond.
                            </li>
                            <li>
                                <strong className="text-white">
                                    Public features:
                                </strong>{" "}
                                Usernames, scores, rankings, and certain game
                                statistics may be displayed publicly on
                                leaderboards and profile-related features.
                            </li>
                            <li>
                                <strong className="text-white">
                                    Legal reasons:
                                </strong>{" "}
                                When reasonably necessary to comply with law,
                                legal process, court orders, or valid government
                                requests.
                            </li>
                            <li>
                                <strong className="text-white">
                                    Safety and enforcement:
                                </strong>{" "}
                                To investigate fraud, cheating, security threats,
                                abuse, or violations of our terms.
                            </li>
                            <li>
                                <strong className="text-white">
                                    Business transfers:
                                </strong>{" "}
                                In connection with a merger, acquisition,
                                financing, reorganization, sale of assets, or
                                similar transaction.
                            </li>
                            <li>
                                <strong className="text-white">
                                    With your direction:
                                </strong>{" "}
                                When you ask us or authorize us to share
                                information.
                            </li>
                        </ul>
                    </PolicySection>

                    <PolicySection title="6. Third-Party Services">
                        <p>
                            SplitSecond may rely on third-party service
                            providers, including:
                        </p>

                        <ul className="list-disc space-y-2 pl-6">
                            <li>
                                Supabase for authentication, database, and
                                backend services.
                            </li>
                            <li>
                                Google for optional Google sign-in and related
                                authentication information.
                            </li>
                            <li>
                                Vercel for website hosting, deployment, and
                                infrastructure.
                            </li>
                            <li>
                                Analytics, monitoring, payment, advertising, or
                                email providers if those features are added.
                            </li>
                        </ul>

                        <p>
                            These providers may process information under their
                            own privacy policies and contractual obligations.
                            SplitSecond is not responsible for the privacy
                            practices of third-party websites or services that
                            we do not control.
                        </p>
                    </PolicySection>

                    <PolicySection title="7. Data Retention">
                        <p>
                            We retain information for as long as reasonably
                            necessary to operate SplitSecond, maintain accounts
                            and leaderboards, resolve disputes, enforce
                            agreements, protect the service, and comply with
                            legal obligations.
                        </p>

                        <p>
                            Some gameplay records may be retained after account
                            deletion in aggregated, de-identified, backup,
                            security, or fraud-prevention records. Public
                            leaderboard entries may be removed, anonymized, or
                            retained depending on the nature of the record and
                            operational needs.
                        </p>
                    </PolicySection>

                    <PolicySection title="8. Data Security">
                        <p>
                            We use reasonable administrative, technical, and
                            organizational safeguards intended to protect
                            information. However, no website, database,
                            transmission, or storage system can be guaranteed to
                            be completely secure.
                        </p>

                        <p>
                            You are responsible for protecting access to your
                            account, device, and sign-in credentials. Please
                            notify us if you believe your account has been
                            compromised.
                        </p>
                    </PolicySection>

                    <PolicySection title="9. Your Choices and Rights">
                        <p>
                            Depending on where you live, you may have rights
                            concerning your personal information, including the
                            ability to request access, correction, deletion, or
                            a copy of certain information.
                        </p>

                        <p>
                            You may also update certain profile information
                            through your account. To submit a privacy request,
                            contact us at{" "}
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="text-[#39FF14] underline underline-offset-4"
                            >
                                {CONTACT_EMAIL}
                            </a>
                            . We may need to verify your identity before
                            completing a request.
                        </p>

                        <p>
                            We may deny or limit a request where permitted by
                            law, including when information must be retained for
                            security, fraud prevention, legal compliance, or the
                            rights of others.
                        </p>
                    </PolicySection>

                    <PolicySection title="10. Account Deletion">
                        <p>
                            You may request deletion of your SplitSecond account
                            by contacting{" "}
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="text-[#39FF14] underline underline-offset-4"
                            >
                                {CONTACT_EMAIL}
                            </a>
                            .
                        </p>

                        <p>
                            Account deletion may permanently remove your profile
                            and access to saved gameplay information. Certain
                            records may remain where reasonably necessary for
                            security, backups, fraud prevention, legal
                            compliance, or dispute resolution.
                        </p>
                    </PolicySection>

                    <PolicySection title="11. Children’s Privacy">
                        <p>
                            SplitSecond is not directed to children under 13,
                            and we do not knowingly collect personal information
                            from children under 13.
                        </p>

                        <p>
                            If you are under 13, do not create an account or
                            submit personal information. If we learn that we
                            collected personal information from a child under 13
                            without legally required authorization, we will take
                            reasonable steps to delete it.
                        </p>

                        <p>
                            A parent or guardian who believes a child provided
                            personal information may contact{" "}
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="text-[#39FF14] underline underline-offset-4"
                            >
                                {CONTACT_EMAIL}
                            </a>
                            .
                        </p>
                    </PolicySection>

                    <PolicySection title="12. International Users">
                        <p>
                            SplitSecond is operated from the United States. If
                            you access the service from another country, your
                            information may be transferred to and processed in
                            the United States or other locations where our
                            service providers operate.
                        </p>
                    </PolicySection>

                    <PolicySection title="13. Changes to This Policy">
                        <p>
                            We may update this Privacy Policy from time to time.
                            When we do, we will update the effective date at the
                            top of this page. Material changes may also be
                            communicated through the website or another
                            reasonable method.
                        </p>

                        <p>
                            Your continued use of SplitSecond after an updated
                            policy becomes effective means the updated policy
                            will apply to your continued use.
                        </p>
                    </PolicySection>

                    <PolicySection title="14. Contact Us">
                        <p>
                            Questions or requests regarding this Privacy Policy
                            may be sent to:
                        </p>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                            <p className="font-bold text-white">SplitSecond</p>
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="text-[#39FF14] underline underline-offset-4"
                            >
                                {CONTACT_EMAIL}
                            </a>
                        </div>
                    </PolicySection>
                </article>
            </div>
        </main>
    );
}

function PolicySection({
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