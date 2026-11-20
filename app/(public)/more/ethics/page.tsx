export default function EthicsPage() {
    const highlights = [
        { icon: "🛡️", label: "Zero tolerance for plagiarism", color: "#D85A30", bg: "#FAECE7" },
        { icon: "👥", label: "Double-blind peer review", color: "#1D9E75", bg: "#E1F5EE" },
        { icon: "🔒", label: "Full confidentiality", color: "#378ADD", bg: "#E6F1FB" },
        { icon: "⚖️", label: "Conflict of interest disclosure", color: "#7F77DD", bg: "#EEEDFE" },
    ];

    const roleCards = [
        {
            role: "Authors",
            icon: "✍️",
            iconBg: "#EEEDFE",
            dotColor: "#7F77DD",
            items: [
                "Submit only original and unpublished work",
                "Ensure proper citation of all sources",
                "Avoid plagiarism, fabrication, or falsification of data",
                "Disclose any conflicts of interest",
                "Ensure all co-authors have approved the submission",
            ],
        },
        {
            role: "Editors",
            icon: "📝",
            iconBg: "#E1F5EE",
            dotColor: "#1D9E75",
            items: [
                "Make fair and unbiased editorial decisions",
                "Maintain confidentiality of submitted manuscripts",
                "Ensure a transparent and timely review process",
                "Avoid conflicts of interest in decision-making",
            ],
        },
        {
            role: "Reviewers",
            icon: "🔍",
            iconBg: "#E6F1FB",
            dotColor: "#378ADD",
            items: [
                "Provide objective and constructive feedback",
                "Maintain strict confidentiality of manuscripts",
                "Disclose conflicts of interest before reviewing",
                "Complete reviews within prescribed timelines",
            ],
        },
    ];

    const policies = [
        {
            num: "05",
            title: "Plagiarism Policy",
            icon: "🚫",
            iconBg: "#FAECE7",
            dotColor: "#D85A30",
            content:
                "All manuscripts are subject to plagiarism detection. Any form of plagiarism, including self-plagiarism, will result in rejection or retraction of the article.",
            badge: { label: "Zero Tolerance", color: "#993C1D", bg: "#FAECE7" },
        },
        {
            num: "06",
            title: "Peer Review Process",
            icon: "👥",
            iconBg: "#E1F5EE",
            dotColor: "#1D9E75",
            content:
                "The Journal follows a double-blind peer review system to ensure impartiality. Identities of authors and reviewers remain confidential throughout the process.",
            badge: { label: "Double-Blind", color: "#0F6E56", bg: "#E1F5EE" },
        },
        {
            num: "07",
            title: "Conflict of Interest",
            icon: "⚖️",
            iconBg: "#F1EFE8",
            dotColor: "#888780",
            content:
                "All participants in the publication process must disclose any financial or personal relationships that may influence their work or decisions.",
        },
        {
            num: "08",
            title: "Retraction Policy",
            icon: "↩️",
            iconBg: "#FAEEDA",
            dotColor: "#BA7517",
            content:
                "Articles may be retracted in cases of ethical violations, including plagiarism, data falsification, or serious errors. Retractions will be clearly indicated and documented.",
        },
        {
            num: "09",
            title: "Data Integrity",
            icon: "📊",
            iconBg: "#EAF3DE",
            dotColor: "#639922",
            content:
                "Authors must ensure accuracy and reliability of data. Any manipulation or misrepresentation of data is strictly prohibited.",
        },
        {
            num: "10",
            title: "Confidentiality",
            icon: "🔒",
            iconBg: "#E6F1FB",
            dotColor: "#378ADD",
            content:
                "All submissions and communications are treated as confidential and must not be disclosed to unauthorized parties.",
        },
    ];

    const card = {
        background: "#fff",
        border: "0.5px solid #e8e8e8",
        borderRadius: "12px",
        padding: "1.25rem 1.5rem",
    };

    return (
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem", fontFamily: "inherit" }}>

            {/* Header */}
            <div style={{ borderBottom: "0.5px solid #e2e2e2", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "#999", textTransform: "uppercase", margin: "0 0 8px" }}>
                    IJLSG · Publication Ethics
                </p>
                <h1 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px", color: "#111" }}>
                    Publication Ethics &amp; Malpractice Statement
                </h1>
                <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
                    In accordance with international academic publishing standards.
                </p>
            </div>

            {/* Intro */}
            <div style={{ ...card, marginBottom: "20px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#bbb", textTransform: "uppercase", margin: "0 0 6px" }}>01</p>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "28px", height: "28px", borderRadius: "6px", background: "#EEEDFE", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>📌</span>
                    Introduction
                </h2>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                    The Journal is committed to maintaining the highest standards of publication ethics, transparency, and integrity.
                    All parties involved in the publication process — including authors, editors, and reviewers — are expected to adhere to these ethical principles.
                </p>
            </div>

            {/* Key Highlights */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginBottom: "20px" }}>
                {highlights.map((h) => (
                    <div key={h.label} style={{ background: h.bg, borderRadius: "10px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "18px" }}>{h.icon}</span>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: h.color, lineHeight: 1.4 }}>{h.label}</span>
                    </div>
                ))}
            </div>

            {/* Role Cards 02–04 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px", marginBottom: "12px" }}>
                {roleCards.map((r, idx) => (
                    <div key={r.role} style={card}>
                        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#bbb", textTransform: "uppercase", margin: "0 0 6px" }}>
                            {String(idx + 2).padStart(2, "0")}
                        </p>
                        <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#111", margin: "0 0 12px", display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ width: "26px", height: "26px", borderRadius: "6px", background: r.iconBg, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0 }}>
                                {r.icon}
                            </span>
                            Responsibilities of {r.role}
                        </h2>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                            {r.items.map((item, i) => (
                                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#555", lineHeight: 1.6 }}>
                                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: r.dotColor, marginTop: "7px", flexShrink: 0 }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Policy Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {policies.map((p) => (
                    <div key={p.num} style={card}>
                        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#bbb", textTransform: "uppercase", margin: "0 0 6px" }}>
                            {p.num}
                        </p>
                        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ width: "28px", height: "28px", borderRadius: "6px", background: p.iconBg, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                                {p.icon}
                            </span>
                            {p.title}
                            {p.badge && (
                                <span style={{ marginLeft: "4px", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: p.badge.bg, color: p.badge.color }}>
                                    {p.badge.label}
                                </span>
                            )}
                        </h2>
                        <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>{p.content}</p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={{ marginTop: "2rem", borderRadius: "12px", background: "#F8F7FF", border: "0.5px solid #CECBF6", padding: "1.25rem 1.5rem", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ fontSize: "20px", flexShrink: 0 }}>🌐</span>
                <p style={{ fontSize: "13px", color: "#534AB7", lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
                    This Ethics Statement reflects the Journal's commitment to maintaining integrity, transparency, and academic excellence in scholarly publishing.
                </p>
            </div>
        </div>
    );
}