export default function PrivacyPolicyPage() {
    const sections = [
        {
            num: "01",
            title: "Purpose",
            icon: "🎯",
            iconBg: "#EEEDFE",
            dotColor: "#7F77DD",
            content: (
                <p>
                    This Policy establishes a framework governing copyright ownership,
                    licensing, dissemination, and data management, ensuring protection of
                    author rights while enabling broad access to scholarly work.
                </p>
            ),
        },
        {
            num: "02",
            title: "Copyright Ownership",
            icon: "©",
            iconBg: "#E6F1FB",
            dotColor: "#378ADD",
            items: [
                "Authors retain full copyright ownership of their work",
                "Submission does not transfer ownership to the Journal",
                "Authors maintain control over reuse and distribution",
            ],
        },
        {
            num: "03",
            title: "License Granted",
            icon: "📄",
            iconBg: "#E1F5EE",
            dotColor: "#1D9E75",
            intro: "Authors grant the Journal a non-exclusive, worldwide, perpetual license to:",
            items: [
                "Publish and reproduce the work",
                "Archive and distribute across platforms",
                "Promote scholarly dissemination globally",
            ],
        },
        {
            num: "04",
            title: "Open Access Policy",
            icon: "🔓",
            iconBg: "#FAEEDA",
            dotColor: "#BA7517",
            content: (
                <>
                    <p>
                        All articles are published under open access, ensuring free and
                        unrestricted public availability.
                    </p>
                    <span
                        style={{
                            display: "inline-block",
                            marginTop: "10px",
                            fontSize: "12px",
                            fontWeight: 500,
                            padding: "4px 12px",
                            borderRadius: "6px",
                            background: "#E1F5EE",
                            color: "#0F6E56",
                        }}
                    >
                        CC BY 4.0 License
                    </span>
                </>
            ),
        },
        {
            num: "05",
            title: "Author Rights",
            icon: "✍️",
            iconBg: "#FBEAF0",
            dotColor: "#D4537E",
            items: [
                "Use work for academic and research purposes",
                "Reuse content in future publications",
                "Deposit work in repositories or personal platforms",
                "Distribute copies with proper attribution",
            ],
        },
        {
            num: "06",
            title: "Rights of the Journal",
            icon: "📰",
            iconBg: "#EAF3DE",
            dotColor: "#639922",
            items: [
                "Publish and distribute articles in all formats",
                "Archive in databases and indexing services",
                "Promote research globally",
            ],
        },
        {
            num: "07",
            title: "Data Retention & Deletion",
            icon: "🗂️",
            iconBg: "#FAECE7",
            dotColor: "#D85A30",
            intro: "Only the final published version (Version of Record) is permanently stored.",
            items: [
                "Submitted manuscripts and revisions are deleted",
                "Reviewer reports and editorial records are removed",
                "Deletion occurs after 3 months of publication or rejection",
            ],
        },
        {
            num: "08",
            title: "Author Responsibilities",
            icon: "✅",
            iconBg: "#E1F5EE",
            dotColor: "#1D9E75",
            items: [
                "Ensure originality of work",
                "Avoid copyright infringement",
                "Provide proper citations",
            ],
        },
        {
            num: "09",
            title: "Third-Party Material",
            icon: "🔗",
            iconBg: "#EEEDFE",
            dotColor: "#7F77DD",
            content: (
                <p>
                    Authors must obtain permission for third-party content and provide
                    proper attribution.
                </p>
            ),
        },
        {
            num: "10",
            title: "Self-Archiving",
            icon: "📦",
            iconBg: "#E6F1FB",
            dotColor: "#378ADD",
            items: [
                "Pre-print, post-print, and published versions may be archived",
                "Proper citation of original publication is required",
            ],
        },
        {
            num: "11",
            title: "Limitation of Liability",
            icon: "⚖️",
            iconBg: "#F1EFE8",
            dotColor: "#888780",
            content: (
                <p>
                    The views expressed in published articles belong solely to the authors.
                    The Journal and Editorial Board bear no responsibility for content
                    accuracy or legal implications.
                </p>
            ),
        },
    ];

    return (
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem", fontFamily: "inherit" }}>

            {/* Header */}
            <div style={{ borderBottom: "0.5px solid #e2e2e2", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "#999", textTransform: "uppercase", margin: "0 0 8px" }}>
                    JIAS · 2026
                </p>
                <h1 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px", color: "#111" }}>
                    Copyright &amp; Licensing Policy
                </h1>
                <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
                    Governing copyright ownership, licensing, dissemination, and data management for all published works.
                </p>
            </div>

            {/* Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {sections.map((s) => (
                    <div
                        key={s.num}
                        style={{
                            background: "#fff",
                            border: "0.5px solid #e8e8e8",
                            borderRadius: "12px",
                            padding: "1.25rem 1.5rem",
                        }}
                    >
                        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#bbb", textTransform: "uppercase", margin: "0 0 6px" }}>
                            {s.num}
                        </p>
                        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111", margin: "0 0 12px", display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ width: "28px", height: "28px", borderRadius: "6px", background: s.iconBg, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                                {s.icon}
                            </span>
                            {s.title}
                        </h2>

                        {s.intro && (
                            <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.65, margin: "0 0 10px" }}>
                                {s.intro}
                            </p>
                        )}

                        {s.content && (
                            <div style={{ fontSize: "14px", color: "#555", lineHeight: 1.65 }}>
                                {s.content}
                            </div>
                        )}

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