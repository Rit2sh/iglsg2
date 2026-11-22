export default function GuidelinesPage() {
    const timeline = [
        { label: "Acknowledgement", time: "Within 2 hours", dotColor: "#1D9E75", bg: "#E1F5EE" },
        { label: "Desk Screening", time: "3–4 days", dotColor: "#378ADD", bg: "#E6F1FB" },
        { label: "Peer Review", time: "2–3 weeks", dotColor: "#7F77DD", bg: "#EEEDFE" },
        { label: "Final Decision", time: "Within 1 week", dotColor: "#BA7517", bg: "#FAEEDA" },
        { label: "Publication", time: "Within 1 week after acceptance", dotColor: "#D85A30", bg: "#FAECE7" },
    ];

    const reviewOutcomes = [
        { label: "Acceptance", color: "#0F6E56", bg: "#E1F5EE" },
        { label: "Minor Revisions", color: "#185FA5", bg: "#E6F1FB" },
        { label: "Major Revisions", color: "#BA7517", bg: "#FAEEDA" },
        { label: "Rejection", color: "#993C1D", bg: "#FAECE7" },
    ];

    const sections = [
        {
            num: "01",
            title: "Purpose",
            icon: "🎯",
            iconBg: "#EEEDFE",
            dotColor: "#7F77DD",
            content: (
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                    This policy establishes a transparent and structured framework for submission,
                    evaluation, review, and publication of manuscripts, ensuring academic rigour,
                    ethical compliance, and quality.
                </p>
            ),
        },
        {
            num: "02",
            title: "Submission Process",
            icon: "📤",
            iconBg: "#E6F1FB",
            dotColor: "#378ADD",
            items: [
                "All manuscripts must be submitted via the official submission system",
                "Submission must include title, abstract, keywords, and author details",
                "Acknowledgement of submission is issued immediately",
            ],
        },
        {
            num: "03",
            title: "Desk Screening",
            icon: "🔍",
            iconBg: "#E1F5EE",
            dotColor: "#1D9E75",
            intro: "All manuscripts undergo preliminary evaluation based on:",
            items: ["Relevance to journal scope", "Basic academic quality"],
            footer: "Manuscripts may be rejected or forwarded for peer review.",
        },
        {
            num: "04",
            title: "Peer Review Process",
            icon: "👥",
            iconBg: "#FAEEDA",
            dotColor: "#BA7517",
            items: [
                "Double-blind review system is followed",
                "Each manuscript is reviewed by at least two experts",
                "Evaluation is based on originality, structure, methodology, and citations",
            ],
            custom: (
                <div style={{ marginTop: "14px" }}>
                    <p style={{ fontSize: "13px", color: "#777", margin: "0 0 8px" }}>Review outcomes may include:</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {reviewOutcomes.map((o) => (
                            <span
                                key={o.label}
                                style={{
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    background: o.bg,
                                    color: o.color,
                                }}
                            >
                                {o.label}
                            </span>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            num: "05",
            title: "Revision & Editing",
            icon: "✏️",
            iconBg: "#FBEAF0",
            dotColor: "#D4537E",
            items: [
                "Authors must revise manuscripts based on reviewer comments",
                "Editorial team performs language and formatting corrections",
                "Revised manuscripts must be resubmitted within the deadline",
            ],
        },
        {
            num: "06",
            title: "Final Decision",
            icon: "⚖️",
            iconBg: "#F1EFE8",
            dotColor: "#888780",
            intro: "Final decision is made by the Editor-in-Chief in consultation with the Editorial Director based on:",
            items: ["Academic quality", "Reviewer feedback", "Overall contribution"],
            footer: "The decision is final and cannot be challenged.",
        },
        {
            num: "07",
            title: "Publication",
            icon: "📰",
            iconBg: "#EAF3DE",
            dotColor: "#639922",
            items: [
                "Accepted manuscripts are scheduled for publication",
                "Final proofreading is conducted before release",
                "Publication occurs within the prescribed timeframe",
            ],
        },
        {
            num: "08",
            title: "Ethical Standards",
            icon: "🛡️",
            iconBg: "#EEEDFE",
            dotColor: "#7F77DD",
            items: [
                "Strict anti-plagiarism policy is enforced",
                "All submissions remain confidential",
                "Conflicts of interest must be disclosed",
            ],
        },
        {
            num: "10",
            title: "Author Responsibilities",
            icon: "✍️",
            iconBg: "#E6F1FB",
            dotColor: "#378ADD",
            items: [
                "Ensure originality and authenticity",
                "Avoid plagiarism and copyright violations",
                "Maintain academic integrity",
            ],
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
                    JIAS · 2026
                </p>
                <h1 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px", color: "#111" }}>
                    Author Guidelines &amp; Editorial Process
                </h1>
                <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
                    Editorial Process Standard Operating Procedure Policy, 2026
                </p>
            </div>

            {/* Timeline Card */}
            <div style={{ ...card, marginBottom: "12px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#bbb", textTransform: "uppercase", margin: "0 0 6px" }}>
                    09
                </p>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "28px", height: "28px", borderRadius: "6px", background: "#FAECE7", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
                        ⏱️
                    </span>
                    Timeline
                </h2>
                <div style={{ position: "relative", paddingLeft: "16px" }}>
                    {/* vertical line */}
                    <div style={{ position: "absolute", left: "5px", top: "8px", bottom: "8px", width: "1px", background: "#e8e8e8" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                        {timeline.map((t, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "8px 0" }}>
                                <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: t.dotColor, border: "2px solid #fff", outline: `2px solid ${t.dotColor}33`, flexShrink: 0, marginLeft: "-5px" }} />
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1, flexWrap: "wrap", gap: "4px" }}>
                                    <span style={{ fontSize: "14px", color: "#333", fontWeight: 500 }}>{t.label}</span>
                                    <span style={{ fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: t.bg, color: t.dotColor }}>
                                        {t.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
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

                        {s.intro && (
                            <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.65, margin: "0 0 10px" }}>
                                {s.intro}
                            </p>
                        )}

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

                        {s.custom}

                        {s.footer && (
                            <p style={{ fontSize: "13px", color: "#888", marginTop: "10px", marginBottom: 0, fontStyle: "italic" }}>
                                {s.footer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}