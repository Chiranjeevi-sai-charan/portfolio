import { useParams, Link } from "react-router-dom";
import Reveal from "../components/Reveal";

const CASE_STUDY_DATA = {
  sage: {
    title: "Sage: AI-Powered HR Assistant",
    overview: {
      projectName: "Sage: AI-Powered HR Assistant",
      date: "3 months",
      role: "Lead Product Designer",
      team: "Solo Design & Development",
      objective: "Design and ship an AI-powered HR chatbot that serves 1000+ employees with instant access to HR policies, source-verified answers, role-based document access, and multilingual support.",
      targetAudience: [
        "Employees seeking instant answers to HR policy questions",
        "HR Admins managing HR documents and user permissions",
        "System Admins ensuring compliance and security"
      ],
      toolsUsed: [
        "Claude",
        "Figma",
        "Figma Make",
        "Claude Code",
        "Vercel",
        "Whispr Flow"
      ]
    },
    problem: {
      statement: "Employees across a 1000+ person global company are trapped in HR knowledge chaos. With 50+ HR policy documents scattered across HR systems, employees face three critical issues:",
      issues: [
        { title: "Information Silos", desc: "Employees don't know which HR document contains the answer. Policies are fragmented across multiple locations." },
        { title: "Search Overload", desc: "Manual document searches return 50+ irrelevant results. Employees can't distinguish current from outdated policies." },
        { title: "Consistency Gap", desc: "Different HR staff give slightly different answers to the same policy question. Employees receive conflicting guidance." }
      ],
      consequence: "This forces employees to email HR for even simple policy questions, creating 2-3 day delays.",
      impact: [
        { label: "HR Team Burnout", value: "12-15 policy questions per day (60% of HR time wasted on repetitive inquiries)." },
        { label: "Compliance Risk", value: "Inconsistent policy communication creates audit trail gaps. No proof of when or how employees were informed." },
        { label: "Employee Friction", value: "2-3 day email wait for instant answers that should be self-service." },
        { label: "Equity Gap", value: "Multilingual employees (18% Japanese staff) wait 2-3 days longer for translated HR answers." }
      ],
      goals: [
        "Eliminate HR knowledge silos by centralizing all 50+ HR policy documents in one searchable chatbot.",
        "Reduce HR support load by 60% through employee self-service HR queries.",
        "Ensure 100% policy consistency by providing source attribution (every answer shows the official HR policy document).",
        "Enable instant multilingual access (English and Japanese) for all employees.",
        "Implement role-based security so sensitive HR docs are protected, but employees still self-serve within their access level.",
        "Create audit-proof compliance trail so HR can demonstrate when and how policies were communicated."
      ]
    },
    research: {
      objective: "The objective of this research was to understand the <span style=\"font-weight: 800;\">pain points</span> employees faced when trying to access HR policies and information. The business goal was to <span style=\"font-weight: 800;\">reduce HR support load by 60%</span> through <span style=\"font-weight: 800;\">employee self-service</span> and <span style=\"font-weight: 800;\">improve policy consistency</span> across the organization.",
      methods: "We distributed a <span style=\"font-weight: 800;\">Microsoft Form</span> to employees across multiple departments with targeted questions about their current workflow, pain points, and how they currently access HR policies. We also <span style=\"font-weight: 800;\">conducted informal conversations</span> with key HR stakeholders to understand the <span style=\"font-weight: 800;\">administrative challenges</span> they face daily.",
      synthesize: {
        intro: "Five key themes emerged:",
        themes: [
          { num: 1, title: "Knowledge fragmentation", desc: "Employees spent significant time searching for HR policies and often found information unclear or incomplete. A single policy question required browsing multiple documents." },
          { num: 2, title: "Trust barrier", desc: "Employees wanted to verify chatbot answers against official policy sources before making decisions based on the information." },
          { num: 3, title: "Multilingual gap", desc: "HR policy documents existed only in English, creating delays and confusion for Japanese-speaking employees who needed clarification or translation." },
          { num: 4, title: "Access frustration", desc: "Admins couldn't upload documents directly without IT approval, slowing policy updates by 3 days. Employees saw irrelevant HR policies from other departments, causing confusion about what applied to them." },
          { num: 5, title: "Compliance gap", desc: "No audit mechanism existed to prove when and how employees were informed about HR policy changes. HR had no way to track which policies were accessed or by whom." }
        ]
      },
      personas: [
        {
          name: "Aditya",
          role: "Operations Supervisor",
          location: "Hyderabad office",
          age: 28,
          goals: "Quickly find answers to HR questions (leave policies, overtime, promotion criteria) without emailing HR.",
          painPoints: "Often forgets which HR documents to check. Gets conflicting information from colleagues. Worried about making decisions based on outdated or incorrect policy information.",
          techComfort: "High (uses Slack, cloud tools daily).",
          behavior: "Asks HR questions at 7 PM and expects next-day answers."
        },
        {
          name: "Priya",
          role: "HR Manager, Department Head",
          location: "Hyderabad office",
          age: 34,
          goals: "Empower employees to self-serve HR questions while maintaining compliance and controlling access to sensitive documents.",
          painPoints: "Spends significant time answering repetitive HR questions. Cannot track who accessed which documents. Worried about data security of sensitive HR records.",
          techComfort: "Medium (comfortable with basic tools, frustrated with complex systems).",
          behavior: "Needs direct upload capability for new HR policies. Wants metrics showing how often employees use self-service vs. email HR."
        },
        {
          name: "Kenji",
          role: "IT Manager, System Admin",
          location: "Tokyo office",
          age: 41,
          goals: "Maintain security and audit compliance for HR data across all departments and geographies.",
          painPoints: "Worried about data breaches if employees access sensitive HR docs without proper permissions. Needs to control who can upload documents and manage users. Requires complete audit logs for compliance.",
          techComfort: "Very High (manages infrastructure).",
          behavior: "Demands role-based access control, complete audit trails, and compliance reporting for regulatory requirements."
        }
      ],
      journeyMaps: [
        {
          persona: "Aditya",
          scenario: "Needs to Know About Leave Policy",
          stages: [
            {
              stage: "Awareness",
              current: "Realizes he needs leave info before submitting request",
              pain: "Uncertainty (which HR document?)",
              opportunity: "Clear, guided access via chatbot"
            },
            {
              stage: "Search",
              current: "Opens email, drafts to HR, waits for response",
              pain: "Time waste (2-3 days)",
              opportunity: "Instant answer from chatbot"
            },
            {
              stage: "Verification",
              current: "Gets email response, wonders if it's current policy",
              pain: "Trust gap",
              opportunity: "View source HR policy document directly"
            },
            {
              stage: "Action",
              current: "Submits leave request",
              pain: "Confident? Uncertain",
              opportunity: "Full confidence with verified info from official policy"
            }
          ]
        },
        {
          persona: "Priya",
          scenario: "Manages HR Document Uploads and User Permissions",
          stages: [
            {
              stage: "Upload",
              current: "Email IT to upload HR policy; IT asks clarifying questions; 3-day turnaround",
              pain: "Slow, dependency on IT",
              opportunity: "Direct upload interface for admins"
            },
            {
              stage: "Organize",
              current: "HR policy docs pile up; no way to archive old versions",
              pain: "Cluttered, confusing",
              opportunity: "Archive system with version control (active/archived/deleted)"
            },
            {
              stage: "Permission",
              current: "Manually grant access via spreadsheets; lose track of who has what",
              pain: "Error-prone, manual work",
              opportunity: "Role-based auto-assignment based on department"
            },
            {
              stage: "Track",
              current: "No way to know if employees accessed HR docs or asked questions",
              pain: "Blind spot on compliance",
              opportunity: "Usage analytics dashboard showing which policies accessed when"
            }
          ]
        }
      ],
      application: {
        intro: "Based on these findings, we designed eight core solutions:",
        solutions: [
          { name: "Conversational AI Interface (Chatbot)", description: "Employees ask HR policy questions in natural language. The bot returns instant answers with citations to source documents. This directly addresses knowledge fragmentation by eliminating search friction." },
          { name: "Answer Verification with Source Attribution", description: "Every chatbot response includes citations and links to the exact HR policy documents. Users click citations to view the source material. This directly solves the trust barrier finding by proving answers come from official policy." },
          { name: "Intelligent Department Routing", description: "Users select their department before asking questions. This ensures they only receive HR policies relevant to their role and access level. Admins can pre-assign departments based on user role. This addresses confusion from irrelevant information." },
          { name: "Role-Based Access Control", description: "Three tiers (User, Admin, System Admin) control who can upload documents, manage users, and access sensitive HR data. Users see only HR policies relevant to their department. This directly addresses the access frustration and compliance gap findings." },
          { name: "Document Management System (Admin Backend)", description: "Admins upload HR policies directly without IT approval. System automatically archives previous versions when new ones are uploaded. Three states: Active, Archived, Deleted. Admins can restore from deleted section. This addresses the compliance gap and streamlines policy updates." },
          { name: "User Management Dashboard (Admin Backend)", description: "Admins add, remove, and assign roles to users within their department. System Admins manage users across all departments. This empowers admins to self-manage their department without IT dependency." },
          { name: "Admin Analytics Dashboard", description: "Track usage patterns: which HR policy questions are asked most, which documents accessed most, user engagement metrics. Helps HR understand which policies need clarification or updating. This directly addresses the compliance gap by proving policy communication." },
          { name: "Multilingual Support (English and Japanese)", description: "Language toggle in header switches entire interface between English and Japanese. Both chatbot responses and HR policy documents available in both languages. This directly solves the multilingual equity gap finding." }
        ]
      },
      reflection: "The research revealed that employees do not distrust the system itself. They distrust unverified information. By making source attribution and policy verification the core design principle, we built trust without needing perfect AI. Employees gained confidence because they could verify answers against official HR documents. This insight shaped every subsequent design decision and became the foundation for Sage's competitive advantage. The ability to instantly access official policy with proof of source transformed the employee experience from frustration to confidence."
    },
    tools: [
      { name: "Figma", category: "Design & Prototyping", description: "Created comprehensive design system with components, patterns, and comprehensive documentation for Sage." },
      { name: "React", category: "Frontend Framework", description: "Built interactive UI components with state management for seamless user experience." },
      { name: "TypeScript", category: "Programming Language", description: "Ensured type safety and improved developer experience across the codebase." },
      { name: "Next.js", category: "Full-Stack Framework", description: "Built scalable backend API endpoints and server-side rendering for HR chatbot platform." },
      { name: "Vercel", category: "Deployment & Hosting", description: "Deployed production application with automatic CI.CD pipeline and zero-downtime deployments." },
      { name: "Stripe", category: "Authentication & Security", description: "Implemented secure authentication and role-based access control for admin features." }
    ]
  },
  flowops: {
    title: "FlowOps",
    overview: null,
  },
  sentinel: {
    title: "Sentinel",
    overview: null,
  },
  myghmc: {
    title: "MyGHMC App Redesign",
    overview: null,
  },
};

export default function CaseStudy() {
  const { slug } = useParams();
  const caseStudy = CASE_STUDY_DATA[slug];

  if (!caseStudy) {
    return (
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "160px 24px 96px" }}>
        <Reveal>
          <Link to="/" style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
            ← Back home
          </Link>
          <h1 style={{ fontSize: "var(--fs-h1)", marginTop: 16 }}>Case study not found</h1>
        </Reveal>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 1000, margin: "0 auto", padding: "160px 24px 96px" }}>
      <Reveal>
        <Link to="/" style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
          ← Back home
        </Link>
        <h1 style={{ fontSize: "var(--fs-h1)", marginTop: 16 }}>
          {caseStudy.title.replace(" — ", ": ")}
        </h1>
      </Reveal>

      {caseStudy.overview && (
        <>
          <Reveal delay={0.05}>
            <div style={{
              marginTop: 48,
              marginBottom: 64,
              maxWidth: 800,
              margin: "48px auto 64px"
            }}>
              {/* HOOK QUESTION */}
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <h3 style={{
                  fontSize: 24,
                  lineHeight: "1.5",
                  color: "var(--accent)",
                  margin: 0,
                  fontFamily: "Georgia, serif",
                  fontWeight: 400,
                  fontStyle: "italic"
                }}>
                  Imagine needing an answer but waiting three days for an email response.
                </h3>
              </div>

              {/* HOOK CONTEXT */}
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <p style={{
                  fontSize: 15,
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                  margin: 0
                }}>
                  That is the reality for 1000+ employees. HR is drowning in repetitive questions. Policy documents exist only in English. Employees can't verify if answers are current. There is no single source of truth for HR policies.
                </p>
              </div>

              {/* SEPARATOR */}
              <div style={{
                height: "1px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                marginBottom: 32
              }}></div>

              {/* SOLUTION BOX */}
              <div style={{
                background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.04) 100%)",
                padding: "40px 36px",
                borderRadius: "12px",
                border: "1px solid rgba(76, 175, 80, 0.15)",
                textAlign: "center"
              }}>
                <h2 style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: "var(--ink)",
                  margin: "0 0 16px 0"
                }}>
                  Sage solves this.
                </h2>
                <p style={{
                  fontSize: 15,
                  lineHeight: "1.7",
                  color: "var(--ink-soft)",
                  margin: 0
                }}>
                  Instant HR answers. Source verification in every response. Role-based access. Multilingual support (English and Japanese). Complete audit trail.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: "2rem", marginBottom: 24, fontWeight: 700, color: "var(--accent)" }}>
              Project Overview
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: 48,
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
                  Project Name
                </div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>
                  {caseStudy.overview.projectName}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
                  Date
                </div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>
                  {caseStudy.overview.date}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
                  Your Role
                </div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>
                  {caseStudy.overview.role}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
                  Team Members
                </div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>
                  {caseStudy.overview.team}
                </div>
              </div>
              {caseStudy.overview.toolsUsed && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
                    Tools Used
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {caseStudy.overview.toolsUsed.map((tool) => (
                      <div key={tool} style={{
                        backgroundColor: "var(--accent-soft)",
                        color: "var(--accent-text)",
                        padding: "8px 16px",
                        borderRadius: "999px",
                        fontSize: 14,
                        fontWeight: 600
                      }}>
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
                  Objective
                </div>
                <div style={{ fontSize: 16, lineHeight: "1.6" }}>
                  {caseStudy.overview.objective}
                </div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
                  Target Audience
                </div>
                <ul style={{ fontSize: 16, lineHeight: "1.8", paddingLeft: 20 }}>
                  {caseStudy.overview.targetAudience.map((audience) => (
                    <li key={audience}>{audience}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
        </>
      )}

      {!caseStudy.overview && (
        <Reveal delay={0.1}>
          <p style={{ marginTop: 24, color: "var(--ink-soft)", fontSize: 16 }}>
            This case study is coming soon. In the meantime, check out the other case studies.
          </p>
        </Reveal>
      )}

      {caseStudy.problem && (
        <Reveal delay={0.2}>
          <div style={{ marginTop: 96 }}>
            <h2 style={{ fontSize: "2rem", marginBottom: 32, fontWeight: 700, color: "var(--accent)" }}>
              The Problem
            </h2>

            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 18, lineHeight: "1.8", marginBottom: 24 }}>
                {caseStudy.problem.statement}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 24 }}>
                {caseStudy.problem.issues.map((issue) => (
                  <div key={issue.title} style={{
                    padding: 24,
                    border: "1px solid var(--ink-soft)",
                    borderRadius: 8,
                    backgroundColor: "rgba(255, 255, 255, 0.02)"
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: "var(--accent)" }}>
                      {issue.title}
                    </div>
                    <p style={{ fontSize: 14, lineHeight: "1.6", color: "var(--ink-soft)" }}>
                      {issue.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 16, lineHeight: "1.7", fontStyle: "italic", color: "var(--ink-soft)", paddingLeft: 20, borderLeft: "3px solid var(--accent)" }}>
                "{caseStudy.problem.consequence}"
              </p>
            </div>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 20, fontWeight: 700 }}>
                Impact
              </h3>
              <div style={{ display: "grid", gap: 16 }}>
                {caseStudy.problem.impact.map((item) => (
                  <div key={item.label} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16 }}>
                    <div style={{ fontWeight: 700, color: "var(--accent)" }}>
                      {item.label}
                    </div>
                    <div style={{ color: "var(--ink-soft)" }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 20, fontWeight: 700 }}>
                Goals
              </h3>
              <ol style={{ paddingLeft: 24, lineHeight: "1.8" }}>
                {caseStudy.problem.goals.map((goal, index) => (
                  <li key={index} style={{ marginBottom: 16, color: "var(--ink-soft)" }}>
                    {goal}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      )}

      {caseStudy.research && (
        <Reveal delay={0.3}>
          <div style={{ marginTop: 96 }}>
            <h2 style={{ fontSize: "2rem", marginBottom: 32, fontWeight: 700, color: "var(--accent)" }}>
              Research
            </h2>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 16, fontWeight: 700 }}>
                Define Your Objective
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)" }} dangerouslySetInnerHTML={{ __html: caseStudy.research.objective }} />
            </div>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 16, fontWeight: 700 }}>
                Research Methods
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)" }} dangerouslySetInnerHTML={{ __html: caseStudy.research.methods }} />
            </div>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 20, fontWeight: 700 }}>
                Synthesized Insights
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", marginBottom: 20, color: "var(--ink-soft)" }}>
                {caseStudy.research.synthesize.intro}
              </p>
              <div style={{ display: "grid", gap: 24 }}>
                {caseStudy.research.synthesize.themes.map((theme) => (
                  <div key={theme.num} style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 24 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                      ({theme.num}) {theme.title}
                    </div>
                    <p style={{ fontSize: 15, lineHeight: "1.6", color: "var(--ink-soft)" }}>
                      {theme.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 24, fontWeight: 700 }}>
                Who We Designed For
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 48 }}>
                {caseStudy.research.personas.map((persona, index) => (
                  <div key={index} style={{
                    padding: 24,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: 8,
                    border: "1px solid rgba(255, 255, 255, 0.08)"
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                      {persona.name}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 16 }}>
                      {persona.role} (Age {persona.age})
                      <br />
                      {persona.location}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 6, textTransform: "uppercase" }}>
                        Goals
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
                        {persona.goals}
                      </p>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 6, textTransform: "uppercase" }}>
                        Pain Points
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
                        {persona.painPoints}
                      </p>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 6, textTransform: "uppercase" }}>
                        Tech Comfort
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
                        {persona.techComfort}
                      </p>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 6, textTransform: "uppercase" }}>
                        Behavior
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
                        {persona.behavior}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 24, fontWeight: 700 }}>
                How Users Currently Struggle
              </h3>
              {caseStudy.research.journeyMaps.map((journeyMap, mapIndex) => (
                <div key={mapIndex} style={{ marginBottom: mapIndex < caseStudy.research.journeyMaps.length - 1 ? 36 : 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "var(--ink)" }}>
                    {journeyMap.persona}'s Journey: {journeyMap.scenario}
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: 14,
                      lineHeight: 1.6
                    }}>
                      <thead>
                        <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                          <th style={{ padding: 12, textAlign: "left", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px" }}>Stage</th>
                          <th style={{ padding: 12, textAlign: "left", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px" }}>Current State</th>
                          <th style={{ padding: 12, textAlign: "left", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px" }}>Pain</th>
                          <th style={{ padding: 12, textAlign: "left", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px" }}>Opportunity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {journeyMap.stages.map((stage, stageIndex) => (
                          <tr key={stageIndex} style={{
                            backgroundColor: stageIndex % 2 === 0 ? "rgba(255, 255, 255, 0.02)" : "transparent",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
                          }}>
                            <td style={{ padding: 12, color: "var(--ink-soft)" }}><strong>{stage.stage}</strong></td>
                            <td style={{ padding: 12, color: "var(--ink-soft)" }}>{stage.current}</td>
                            <td style={{ padding: 12, color: "var(--ink-soft)" }}>{stage.pain}</td>
                            <td style={{ padding: 12, color: "var(--ink-soft)" }}>{stage.opportunity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 20, fontWeight: 700 }}>
                Application of Research to Design Decisions
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", marginBottom: 20, color: "var(--ink-soft)" }}>
                {caseStudy.research.application.intro}
              </p>
              <div style={{ display: "grid", gap: 24 }}>
                {caseStudy.research.application.solutions.map((solution, index) => (
                  <div key={index}>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: "var(--accent)" }}>
                      {solution.name}
                    </div>
                    <p style={{ fontSize: 15, lineHeight: "1.6", color: "var(--ink-soft)" }}>
                      {solution.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: 24,
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderLeft: "3px solid var(--accent)",
              borderRadius: 8
            }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 16, fontWeight: 700 }}>
                Reflect
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)", margin: 0 }}>
                {caseStudy.research.reflection}
              </p>
            </div>
          </div>
        </Reveal>
      )}

      {caseStudy.tools && (
        <Reveal delay={0.4}>
          <div style={{ marginTop: 96 }}>
            <h2 style={{ fontSize: "2rem", marginBottom: 32, fontWeight: 700, color: "var(--accent)" }}>
              Tools & Technology
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {caseStudy.tools.map((tool, index) => (
                <div key={index} style={{
                  padding: 24,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 8,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all 0.3s ease"
                }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: "var(--accent)" }}>
                    {tool.name}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>
                    {tool.category}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
