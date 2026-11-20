export default function TermsPage() {
    const sections = [
        {
            num: "01",
            title: "Introduction",
            icon: "📋",
            iconBg: "#EEEDFE",
            dotColor: "#7F77DD",
            content: (
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                    These Terms and Conditions govern the use of the Journal platform,
                    including submission, review, publication, and access to scholarly
                    content. By using this platform, you agree to comply with these terms.
                </p>
            ),
        },
        {
            num: "02",
            title: "Eligibility",
            icon: "✅",
            iconBg: "#E1F5EE",
            dotColor: "#1D9E75",
            items: [
                "Users must provide accurate and complete information",
                "Authors must have the legal authority to submit content",
                "Users must comply with all applicable laws and regulations",
            ],
        },
        {
            num: "03",
            title: "User Accounts",
            icon: "👤",
            iconBg: "#E6F1FB",
            dotColor: "#378ADD",
            items: [
                "Users are responsible for maintaining account confidentiality",
                "Any activity under the account is the responsibility of the user",
                "The Journal reserves the right to suspend accounts if misuse is detected",
            ],
        },
        {
            num: "04",
            title: "Submission of Manuscripts",
            icon: "📤",
            iconBg: "#EAF3DE",
            dotColor: "#639922",
            items: [
                "All submissions must comply with editorial guidelines",
                "Submitted work must be original and unpublished",
                "Authors must ensure proper citations and references",
            ],
        },
        {
            num: "05",
            title: "Review & Editorial Process",
            icon: "🔍",
            iconBg: "#FAEEDA",
            dotColor: "#BA7517",
            content: (
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                    All manuscripts undergo a structured editorial process including desk
                    screening, peer review, revision, and final decision as per Journal policy.
                </p>
            ),
        },
        {
            num: "06",
            title: "Editorial Decision",
            icon: "⚖️",
            iconBg: "#F1EFE8",
            dotColor: "#888780",
            content: (
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                    The decision of the Editor-in-Chief and Editorial Board regarding
                    acceptance or rejection is final and binding.
                </p>
            ),
        },
        {
            num: "07",
            title: "Copyright & Licensing",
            icon: "©",
            iconBg: "#EEEDFE",
            dotColor: "#7F77DD",
            content: (
                <>
                    <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: "0 0 10px" }}>
                        Authors retain copyright ownership. By submitting, authors grant the
                        Journal a non-exclusive license to publish and distribute the work.
                    </p>
                    <span style={{ display: "inline-block", fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", background: "#E1F5EE", color: "#0F6E56" }}>
                        CC BY 4.0 License
                    </span>
                </>
            ),
        },
        {
            num: "08",
            title: "Open Access Policy",
            icon: "🔓",
            iconBg: "#E6F1FB",
            dotColor: "#378ADD",
            content: (
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                    All published articles are made freely accessible under open access
                    licensing, ensuring unrestricted availability to the public.
                </p>
            ),
        },
        {
            num: "09",
            title: "User Conduct",
            icon: "🛡️",
            iconBg: "#FAECE7",
            dotColor: "#D85A30",
            items: [
                "No plagiarism, fraud, or unethical practices",
                "No misuse of the platform or interference with workflow",
                "No submission of false or misleading information",
            ],
        },
        {
            num: "10",
            title: "Limitation of Liability",
            icon: "📄",
            iconBg: "#FBEAF0",
            dotColor: "#D4537E",
            content: (
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                    The Journal and its Editorial Board are not responsible for the content
                    of published articles. Responsibility lies solely with the author(s).
                </p>
            ),
        },
        {
            num: "11",
            title: "Termination",
            icon: "🚫",
            iconBg: "#FAECE7",
            dotColor: "#D85A30",
            content: (
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                    The Journal reserves the right to suspend or terminate access to users
                    who violate these terms or engage in misconduct.
                </p>
            ),
        },
        {
            num: "12",
            title: "Amendments",
            icon: "✏️",
            iconBg: "#EAF3DE",
            dotColor: "#639922",
            content: (
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                    The Journal reserves the right to modify these terms at any time. Updated
                    terms will be published on the official website.
                </p>
            ),
        },
    ];

    const card = {
        background: "#fff",
        border: "0.5px solid #e8e8e8",
        borderRadius: "12px",
        padding: "1.25rem 1.5rem",
    };

    const highlights = [
        { icon: "©", label: "Authors retain copyright", color: "#7F77DD", bg: "#EEEDFE" },
        { icon: "🔓", label: "Open access publishing", color: "#378ADD", bg: "#E6F1FB" },
        { icon: "👥", label: "Double-blind peer review", color: "#1D9E75", bg: "#E1F5EE" },
        { icon: "🛡️", label: "Zero tolerance for plagiarism", color: "#D85A30", bg: "#FAECE7" },
    ];

    return (
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem", fontFamily: "inherit" }}>

            {/* Header */}
            <div style={{ borderBottom: "0.5px solid #e2e2e2", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "#999", textTransform: "uppercase", margin: "0 0 8px" }}>
                    IJLSG · Effective January 01, 2026
                </p>
                <h1 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px", color: "#111" }}>
                    Terms &amp; Conditions
                </h1>
                <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
                    Please read these terms carefully before using the Journal platform.
                </p>
            </div>

            {/* Key Highlights */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginBottom: "20px" }}>
                {highlights.map((h) => (
                    <div
                        key={h.label}
                        style={{ background: h.bg, borderRadius: "10px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px" }}
                    >
                        <span style={{ fontSize: "18px" }}>{h.icon}</span>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: h.color, lineHeight: 1.4 }}>{h.label}</span>
                    </div>
                ))}
            </div>

            {/* Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {sections.map((s) => (
                    <div key={s.num} style={card}>
                        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#bbb", textTransform: "uppercase", margin: "0 0 6px" }}>
                            {s.num}
                        </p>
                        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111", margin: "0 0 12px", display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ width: "28px", height: "28px", borderRadius: "6px", background: s.iconBg, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                                {s.icon}
                            </span>
                            {s.title}
                        </h2>

                        {s.content}

                        {s.items && (
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                                {s.items.map((item, i) => (
                                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "#555", lineHeight: 1.65 }}>
                                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.dotColor, marginTop: "8px", flexShrink: 0 }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>


        </div>
    );
}