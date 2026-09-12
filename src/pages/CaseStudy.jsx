import { useParams, Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import skeletonSticker from "../assets/SW Engineer Skeleton Waiting.png";
import sageLogo from "../assets/Sage Logo.png";
import sageSolvesSticker from "../assets/Sage solves this.png";
import projectOverviewImage from "../assets/Project Overview.png";
import problemUserSticker from "../assets/problem-user-cant-find-answers.png";
import problemBusinessSticker from "../assets/problem-hr-burnout.png";
import problemGoalSticker from "../assets/problem-instant-answers.png";
import personaAdityaSticker from "../assets/persona-aditya.png";
import personaPriyaSticker from "../assets/persona-priya.png";
import adityaStage1 from "../assets/persona-aditya-stage1.png";
import adityaStage2 from "../assets/persona-aditya-stage2.png";
import adityaStage3 from "../assets/persona-aditya-stage3.png";
import adityaStage4 from "../assets/persona-aditya-stage4.png";
import priyaStage1 from "../assets/persona-priya-stage1.png";
import priyaStage2 from "../assets/persona-priya-stage2.png";
import priyaStage3 from "../assets/persona-priya-stage3.png";
import priyaStage4 from "../assets/persona-priya-stage4.png";
import wireframeBasicV1 from "../assets/wireframe-basic-v1.jpg";
import wireframeLoFiV1 from "../assets/wireframe-lofi-v1.png";
import designHiFiV2 from "../assets/design-hifi-v2-tabs.png";
// import impactBurnoutSticker from "../assets/impact-hr-burnout.png";

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
      objective: "Understand why employees struggle to access HR policies and how this impacts HR team productivity, with the goal of designing a solution that reduces HR support load by 60% through employee self-service.",
      methods: "Microsoft Form survey to employees + informal conversations with 3-4 HR stakeholders",
      participants: "50+ employees across departments + 3-4 HR staff members",
      synthesize: {
        intro: "Four key findings emerged:",
        themes: [
          { num: 1, title: "Knowledge Fragmentation", desc: "Employees spent significant time searching through 50+ HR policy documents in the internal portal to find answers to a single question. Information was often unclear, incomplete, or scattered across multiple locations." },
          { num: 2, title: "Consistency & Trust Gap", desc: "Employees received conflicting answers from different HR staff members about the same policy question. Without a single source of truth, employees didn't know which answer to trust, leading to confusion and lack of confidence in HR guidance." },
          { num: 3, title: "Multilingual Gap", desc: "HR policy documents existed only in English, creating delays and confusion for Japanese-speaking employees who needed clarification or translation. These employees faced 2-3 day delays for translated responses." },
          { num: 4, title: "Access Frustration", desc: "Admin staff couldn't upload updated documents directly without IT approval, slowing policy updates by 3 days. Employees also saw irrelevant HR policies from other departments, causing confusion about what policies applied to their role." }
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
    ideation: {
      brainstorming: {
        overview: "With research findings and a core insight about trust, the team entered brainstorming to generate solution pathways addressing each research finding.",
        process: "Constraint-driven exploration guided the work with three core principles: Trust Through Verification, Three User Perspectives, and Removal of Friction.",
        principles: ["Trust First: No feature without source attribution.", "Reduce Friction: Every interaction removes a pain point.", "Three Experiences, One System: Sage works for employees, admins, and system admins."]
      },
      conceptDevelopment: {
        intro: "Brainstorming gave us eight solutions. The next question: How do these live together in a coherent system?",
        rejectedDirections: [
          { name: "Concept A: Unified Chat-First", premise: "Everything funnels through the conversational interface.", strength: "Simplicity.", weakness: "Admin features feel bolted-on.", reason: "Rejected" },
          { name: "Concept B: Three Separate Products", premise: "Three completely separate interfaces.", strength: "Each optimized for its user.", weakness: "Lack of coherence. Users feel like three products.", reason: "Rejected" }
        ],
        selectedConcept: {
          name: "Concept C: Progressive Disclosure with Unified Header",
          premise: "Same Sage system with unified header. Different experiences based on role.",
          strength: "Unified system identity.",
          description: "All users share a common header. Employees see chatbot. Admins see management tools. System admins see full dashboard.",
          keyInterfaces: ["Chatbot Canvas with source document sidebar", "Admin Dashboard with navigation and quick actions", "Role-Based Entry Points for different user types"]
        }
      },
      wireframes: {
        status: "Concept C advanced to wireframing with three screen states.",
        description: "Low-fidelity wireframes for Employee, Admin, and System Admin views.",
        image: wireframeBasicV1
      }
    },
    design: {
      lowFidelity: {
        title: "Low-Fidelity Prototype",
        description: "Building on the initial wireframe, the low-fidelity prototype refined the layout with proper typography hierarchy, sidebar navigation, department filtering, and structured file list. Shows emerging visual structure before high-fidelity polish.",
        annotation: "Refined structure with navigation, filters, and proper spacing",
        image: wireframeLoFiV1
      },
      feedback: {
        title: "Client Feedback & Key Changes",
        blocks: [
          { heading: "Initial Design Challenge", content: "The two-column layout worked well for uploading documents. However, during stakeholder review, a critical gap emerged: admins needed visibility into active documents, archived records, and deleted items for compliance and audit purposes." },
          { heading: "Client Request", content: "Support multiple document states without cluttering the interface. Admins needed to switch between viewing active, archived, and deleted documents with separate access controls and audit trails." },
          { heading: "Design Solution", content: "Rather than adding more columns, the solution was a tab-based interface. Four tabs kept the interface clean while providing full lifecycle visibility." },
          { heading: "Additional Refinements", content: "Department selector for role-based uploads. Content Type and Sensitivity filters for organization and access control. Role-based access control restricted to Admins/System Admins." }
        ]
      },
      highFidelity: {
        title: "High-Fidelity Design - Final Version",
        description: "The final design incorporates all feedback and refinements. Tab-based navigation provides complete document lifecycle management. Department selection, content type, and sensitivity classifications enable fine-grained access control while maintaining a clean, focused interface.",
        annotations: ["Tab-based layout for document lifecycle tracking", "Department and sensitivity filtering", "Admin-only upload and user management"],
        image: designHiFiV2
      }
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
    <>
      <style>{`
        @media (max-width: 1024px) {
          .skeleton-sticker {
            display: none !important;
          }
          .sage-solves-sticker {
            display: none !important;
          }
        }
        @media (min-width: 1025px) {
          .sage-solves-sticker {
            display: block !important;
          }
        }
      `}</style>
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "160px 24px 96px" }}>
      <Reveal>
        <Link to="/" style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", display: "inline-block", marginTop: -30 }}>
          ← Back home
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 32, marginBottom: 16 }}>
          <img src={sageLogo} alt="Sage Logo" style={{ height: 60, width: "auto" }} />
          <h1 style={{ fontSize: "var(--fs-h1)", margin: 0 }}>
            {caseStudy.title.replace(" - ", ": ")}
          </h1>
        </div>
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
              <div style={{ textAlign: "center", marginBottom: 20, position: "relative" }}>
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
                <img
                  src={skeletonSticker}
                  alt="SW Engineer Skeleton Waiting"
                  className="skeleton-sticker"
                  style={{
                    position: "absolute",
                    right: -220,
                    top: "50%",
                    transform: "translateY(-40%)",
                    width: 200,
                    height: "auto",
                    pointerEvents: "none"
                  }}
                />
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
                textAlign: "center",
                position: "relative"
              }}>
                <img
                  src={sageSolvesSticker}
                  alt="Sage solves this"
                  style={{
                    position: "absolute",
                    left: -200,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 180,
                    height: "auto",
                    pointerEvents: "none"
                  }}
                  className="sage-solves-sticker"
                />
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
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              marginBottom: 48,
            }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 1000, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>
                  Project Name
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, color: "var(--ink)" }}>
                  {caseStudy.overview.projectName}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 1000, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>
                  Date
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, color: "var(--ink)" }}>
                  {caseStudy.overview.date}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 1000, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>
                  Your Role
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, color: "var(--ink)" }}>
                  {caseStudy.overview.role}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 1000, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>
                  Team Members
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, color: "var(--ink)" }}>
                  {caseStudy.overview.team}
                </div>
              </div>
              {caseStudy.overview.toolsUsed && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: 11, fontWeight: 1000, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>
                    Tools Used
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 8, lineHeight: "1.8" }}>
                    {caseStudy.overview.toolsUsed.map((tool) => (
                      <div key={tool} style={{ fontSize: 17, fontWeight: 400, color: "var(--ink)" }}>
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 11, fontWeight: 1000, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>
                  Objective
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, color: "var(--ink)", lineHeight: "1.6" }}>
                  {caseStudy.overview.objective}
                </div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 11, fontWeight: 1000, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 12 }}>
                  Target Audience
                </div>
                <ul style={{ fontSize: 17, fontWeight: 400, color: "var(--ink)", lineHeight: "1.8", paddingLeft: 20 }}>
                  {caseStudy.overview.targetAudience.map((audience) => (
                    <li key={audience}>{audience}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* PROJECT OVERVIEW IMAGE */}
          <div style={{ marginTop: 64, marginBottom: 96 }}>
            <img
              src={projectOverviewImage}
              alt="Project Overview"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
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
              {/* PROBLEM STICKERS GRID WITH PAIRED HEADERS: USER PROBLEM → BUSINESS IMPACT → GOAL */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 24
              }}>
                {/* Column 1: User Problem Header + Sticker */}
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    textAlign: "center",
                    marginBottom: 16
                  }}>
                    User Problem
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "24px",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }}>
                    <img
                      src={problemUserSticker}
                      alt="Employees Can't Find HR Answers illustration"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginBottom: "16px"
                      }}
                    />
                    <h3 style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 8
                    }}>
                      Employees Can't Find HR Answers
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      Employees search through 50+ HR policy documents in the internal portal but struggle to find relevant answers. Even when they find something, they're uncertain if it's current or accurate, forcing them to email HR for clarification.
                    </p>
                  </div>
                </div>

                {/* Column 2: Business Impact Header + Sticker */}
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    textAlign: "center",
                    marginBottom: 16
                  }}>
                    Business Impact
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "24px",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }}>
                    <img
                      src={problemBusinessSticker}
                      alt="HR Team Burnout illustration"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginBottom: "16px"
                      }}
                    />
                    <h3 style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 8
                    }}>
                      HR Team Burnout
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      HR staff receive questions employees couldn't find answers to, fielding 12-15 clarification requests per day. This wastes 60% of HR time on repetitive questions that should be self-service, creating burnout and preventing strategic work.
                    </p>
                  </div>
                </div>

                {/* Column 3: Goal Header + Sticker */}
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    textAlign: "center",
                    marginBottom: 16
                  }}>
                    Goal
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "24px",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }}>
                    <img
                      src={problemGoalSticker}
                      alt="Instant, Verified HR Answers illustration"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginBottom: "16px"
                      }}
                    />
                    <h3 style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 8
                    }}>
                      Instant, Verified HR Answers
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      Employees get instant answers with source verification so they know the information is accurate. HR can focus on strategic initiatives while employees self-serve their HR questions confidently.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact section coming soon - waiting for sticker images */}
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
                Objective
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)" }} dangerouslySetInnerHTML={{ __html: caseStudy.research.objective }} />
            </div>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 16, fontWeight: 700 }}>
                Research Methods
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)" }}>
                {caseStudy.research.methods}
              </p>
            </div>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 16, fontWeight: 700 }}>
                Participants
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)" }}>
                {caseStudy.research.participants}
              </p>
            </div>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 20, fontWeight: 700 }}>
                Key Findings
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
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 20, fontWeight: 700 }}>
                Personas
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", marginBottom: 36, color: "var(--ink-soft)" }}>
                Two perspectives on the same problem
              </p>

              {/* PERSONAS GRID */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: 40
              }}>
                {/* PERSONA 1: ADITYA */}
                <div style={{
                  padding: 24,
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  borderRadius: 12,
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}>
                  <img
                    src={personaAdityaSticker}
                    alt="Persona: Aditya - Operations Supervisor"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 8,
                      marginBottom: 24
                    }}
                  />
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 4
                    }}>
                      Aditya
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      margin: 0
                    }}>
                      Operations Supervisor, 28 | Bangalore
                    </p>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <p style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 4
                    }}>
                      Goal
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Quickly find answers to HR questions without emailing HR
                    </p>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <p style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 4
                    }}>
                      Pain Point
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Forgets which documents to check. Gets conflicting info from colleagues. Worried about outdated/incorrect information.
                    </p>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <p style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 4
                    }}>
                      Tech Comfort
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      margin: 0
                    }}>
                      High
                    </p>
                  </div>

                  <p style={{
                    fontSize: 16,
                    fontStyle: "italic",
                    color: "var(--accent)",
                    margin: 0,
                    lineHeight: 1.5
                  }}>
                    "I ask HR at 7 PM and expect answers by next day"
                  </p>
                </div>

                {/* PERSONA 2: PRIYA */}
                <div style={{
                  padding: 24,
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  borderRadius: 12,
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}>
                  <img
                    src={personaPriyaSticker}
                    alt="Persona: Priya - HR Manager"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 8,
                      marginBottom: 24
                    }}
                  />
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 4
                    }}>
                      Priya
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      margin: 0
                    }}>
                      HR Manager, 34 | Hyderabad
                    </p>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <p style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 4
                    }}>
                      Goal
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Reduce HR team's time on repetitive questions so they can focus on strategic initiatives (hiring, culture, retention)
                    </p>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <p style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 4
                    }}>
                      Pain Point
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Answers 12-15 identical questions daily (leave policy, salary structure, benefits). Frustrated she can't scale answers without hiring more HR staff. Worried employees get different answers from different team members.
                    </p>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <p style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: 4
                    }}>
                      Tech Comfort
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                      margin: 0
                    }}>
                      Medium
                    </p>
                  </div>

                  <p style={{
                    fontSize: 16,
                    fontStyle: "italic",
                    color: "var(--accent)",
                    margin: 0,
                    lineHeight: 1.5
                  }}>
                    "If employees could just find answers themselves, I could actually do strategic work"
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 20, fontWeight: 700 }}>
                Journey Maps
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", marginBottom: 36, color: "var(--ink-soft)" }}>
                How the chatbot transforms two different experiences
              </p>

              {/* JOURNEY MAPS CONTAINER - STACKED VERTICALLY */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 60
              }}>
                {/* ADITYA'S JOURNEY */}
                <article style={{
                  borderLeft: "4px solid #0078d4",
                  backgroundColor: "#fafafa",
                  padding: 20,
                  borderRadius: 6,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}>
                  <h3 style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0078d4",
                    textTransform: "uppercase",
                    marginBottom: 40
                  }}>
                    Aditya's Journey: Searching for Answers
                  </h3>

                  {/* Horizontal Stages Grid - 4 columns desktop, 2 columns mobile */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: 20
                  }}>
                    {/* Stage 1 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 12 }}>01 Need Arises</p>
                      <img src={adityaStage1} alt="Stage 1 - Aditya: Need arises" style={{ width: 160, height: 160, objectFit: "contain", marginBottom: 12 }} />
                      <p style={{ fontSize: 12, color: "#333", lineHeight: 1.4, margin: 0, textAlign: "center" }}>Doesn't know which HR policy document to check</p>
                    </div>

                    {/* Stage 2 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 12 }}>02 Search & Frustration</p>
                      <img src={adityaStage2} alt="Stage 2 - Aditya: Search and frustration" style={{ width: 160, height: 160, objectFit: "contain", marginBottom: 12 }} />
                      <p style={{ fontSize: 12, color: "#333", lineHeight: 1.4, margin: 0, textAlign: "center" }}>Jumps between 50+ documents, loses 20 minutes</p>
                    </div>

                    {/* Stage 3 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 12 }}>03 Give Up & Email</p>
                      <img src={adityaStage3} alt="Stage 3 - Aditya: Give up and email" style={{ width: 160, height: 160, objectFit: "contain", marginBottom: 12 }} />
                      <p style={{ fontSize: 12, color: "#333", lineHeight: 1.4, margin: 0, textAlign: "center" }}>Sends email, waits overnight for reply</p>
                    </div>

                    {/* Stage 4 - SOLUTION */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                      <div style={{ position: "absolute", top: 0, right: 0, fontSize: 20, color: "#0078d4" }}>✓</div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 12 }}>04 Gets Answer</p>
                      <img src={adityaStage4} alt="Stage 4 - Aditya: Gets instant answer" style={{ width: 160, height: 160, objectFit: "contain", marginBottom: 12 }} />
                      <p style={{ fontSize: 12, color: "#333", lineHeight: 1.4, margin: 0, textAlign: "center" }}>Instant verified answer in 30 seconds</p>
                    </div>
                  </div>
                </article>

                {/* PRIYA'S JOURNEY */}
                <article style={{
                  borderLeft: "4px solid #10b981",
                  backgroundColor: "#fafafa",
                  padding: 20,
                  borderRadius: 6,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}>
                  <h3 style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#10b981",
                    textTransform: "uppercase",
                    marginBottom: 20
                  }}>
                    Priya's Journey: Context Switching
                  </h3>

                  {/* Horizontal Stages Grid */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: 20
                  }}>
                    {/* Stage 1 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 12 }}>01 Email Arrives</p>
                      <img src={priyaStage1} alt="Stage 1 - Priya: Email arrives" style={{ width: 160, height: 160, objectFit: "contain", marginBottom: 12 }} />
                      <p style={{ fontSize: 12, color: "#333", lineHeight: 1.4, margin: 0, textAlign: "center" }}>Receives 15th identical question of the day</p>
                    </div>

                    {/* Stage 2 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 12 }}>02 Context Switch</p>
                      <img src={priyaStage2} alt="Stage 2 - Priya: Context switch" style={{ width: 160, height: 160, objectFit: "contain", marginBottom: 12 }} />
                      <p style={{ fontSize: 12, color: "#333", lineHeight: 1.4, margin: 0, textAlign: "center" }}>Stops strategic work to answer repetitive question</p>
                    </div>

                    {/* Stage 3 */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 12 }}>03 Finds Answer (Unsure)</p>
                      <img src={priyaStage3} alt="Stage 3 - Priya: Finds answer" style={{ width: 160, height: 160, objectFit: "contain", marginBottom: 12 }} />
                      <p style={{ fontSize: 12, color: "#333", lineHeight: 1.4, margin: 0, textAlign: "center" }}>Worried answer is outdated or inconsistent</p>
                    </div>

                    {/* Stage 4 - SOLUTION */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                      <div style={{ position: "absolute", top: 0, right: 0, fontSize: 20, color: "#10b981" }}>✓</div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 12 }}>04 Focus on Strategy</p>
                      <img src={priyaStage4} alt="Stage 4 - Priya: Focus on strategy" style={{ width: 160, height: 160, objectFit: "contain", marginBottom: 12 }} />
                      <p style={{ fontSize: 12, color: "#333", lineHeight: 1.4, margin: 0, textAlign: "center" }}>Chatbot handles 80% of questions; focuses on strategy</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>

          </div>
        </Reveal>
      )}

      {caseStudy.ideation && (
        <Reveal delay={0.35}>
          <div style={{ marginTop: 96 }}>
            <h2 style={{ fontSize: "2rem", marginBottom: 32, fontWeight: 700, color: "var(--accent)" }}>
              Ideation
            </h2>

            {/* BRAINSTORMING SECTION */}
            <div style={{ marginBottom: 64 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 16, fontWeight: 700 }}>
                Brainstorming
              </h3>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)", marginBottom: 16 }}>
                  {caseStudy.ideation.brainstorming.overview}
                </p>
                <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)", marginBottom: 20 }}>
                  {caseStudy.ideation.brainstorming.process}
                </p>
              </div>

              <div style={{ marginBottom: 32, padding: "24px", backgroundColor: "rgba(76, 175, 80, 0.08)", borderRadius: "8px", borderLeft: "3px solid var(--accent)" }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "var(--ink)" }}>
                  Design Principles Extracted
                </h4>
                <ul style={{ margin: 0, paddingLeft: 24, color: "var(--ink-soft)", fontSize: 15, lineHeight: "1.8" }}>
                  {caseStudy.ideation.brainstorming.principles.map((principle, idx) => (
                    <li key={idx}>{principle}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CONCEPT DEVELOPMENT SECTION */}
            <div style={{ marginBottom: 64 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 16, fontWeight: 700 }}>
                Concept Development
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)", marginBottom: 32 }}>
                {caseStudy.ideation.conceptDevelopment.intro}
              </p>

              {/* REJECTED CONCEPTS */}
              <div style={{ marginBottom: 48 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: "var(--ink)" }}>
                  Exploration: Three Competing Directions
                </h4>
                <div style={{ display: "grid", gap: 24 }}>
                  {caseStudy.ideation.conceptDevelopment.rejectedDirections.map((concept, idx) => (
                    <div key={idx} style={{
                      padding: 24,
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.08)"
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                        <h5 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 0 0", color: "var(--ink)" }}>
                          {concept.name}
                        </h5>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", padding: "4px 8px", backgroundColor: "rgba(255, 0, 0, 0.1)", borderRadius: "4px" }}>
                          {concept.reason}
                        </span>
                      </div>
                      <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 12, fontStyle: "italic" }}>
                        Premise: {concept.premise}
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 14 }}>
                        <div>
                          <p style={{ fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Strength</p>
                          <p style={{ color: "var(--ink-soft)", margin: 0 }}>{concept.strength}</p>
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Weakness</p>
                          <p style={{ color: "var(--ink-soft)", margin: 0 }}>{concept.weakness}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SELECTED CONCEPT */}
              <div style={{ marginTop: 32, padding: 32, backgroundColor: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.04) 100%)", borderRadius: "12px", border: "1px solid rgba(76, 175, 80, 0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 24 }}>✓</span>
                  <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "var(--accent)" }}>
                    SELECTED: {caseStudy.ideation.conceptDevelopment.selectedConcept.name}
                  </h4>
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 12, fontStyle: "italic" }}>
                  Premise: {caseStudy.ideation.conceptDevelopment.selectedConcept.premise}
                </p>
                <p style={{ fontSize: 15, lineHeight: "1.7", color: "var(--ink-soft)", marginBottom: 20 }}>
                  {caseStudy.ideation.conceptDevelopment.selectedConcept.description}
                </p>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>Key Interface Concepts</p>
                  <ul style={{ margin: 0, paddingLeft: 24, fontSize: 14, color: "var(--ink-soft)", lineHeight: "1.8" }}>
                    {caseStudy.ideation.conceptDevelopment.selectedConcept.keyInterfaces.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* WIREFRAMES SECTION */}
            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 16, fontWeight: 700 }}>
                Wireframes (v1)
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)", marginBottom: 16 }}>
                {caseStudy.ideation.wireframes.status}
              </p>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)", marginBottom: 32 }}>
                {caseStudy.ideation.wireframes.description}
              </p>

              {caseStudy.ideation.wireframes.image && (
                <div style={{ marginTop: 24 }}>
                  <img
                    src={caseStudy.ideation.wireframes.image}
                    alt="Sage Wireframes - Three Concepts"
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                </div>
              )}

              {!caseStudy.ideation.wireframes.image && (
                <div style={{ padding: 32, backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px dashed rgba(255, 255, 255, 0.1)", textAlign: "center" }}>
                  <p style={{ fontSize: 15, color: "var(--ink-soft)", margin: 0 }}>
                    📋 Wireframe mockups coming soon. Hand-sketched annotations on Figma-generated wireframes showing the three concept explorations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {caseStudy.design && (
        <Reveal delay={0.4}>
          <div style={{ marginTop: 96 }}>
            <h2 style={{ fontSize: "2rem", marginBottom: 32, fontWeight: 700, color: "var(--accent)" }}>
              Design
            </h2>

            {/* LOW-FIDELITY SECTION */}
            <div style={{ marginBottom: 80 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 16, fontWeight: 700 }}>
                {caseStudy.design.lowFidelity.title}
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)", marginBottom: 32 }}>
                {caseStudy.design.lowFidelity.description}
              </p>
              <p style={{ fontSize: 14, fontStyle: "italic", color: "var(--ink-soft)", marginBottom: 24 }}>
                {caseStudy.design.lowFidelity.annotation}
              </p>

              {caseStudy.design.lowFidelity.image && (
                <div style={{ marginTop: 24 }}>
                  <img
                    src={caseStudy.design.lowFidelity.image}
                    alt="Sage HR Chatbot Low-Fidelity Design"
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                </div>
              )}

              {!caseStudy.design.lowFidelity.image && (
                <div style={{ padding: 32, backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px dashed rgba(255, 255, 255, 0.1)", textAlign: "center" }}>
                  <p style={{ fontSize: 15, color: "var(--ink-soft)", margin: 0 }}>
                    🎨 Low-fidelity wireframe coming soon.
                  </p>
                </div>
              )}
            </div>

            {/* FEEDBACK & ITERATIONS SECTION */}
            <div style={{ marginBottom: 80 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 32, fontWeight: 700 }}>
                {caseStudy.design.feedback.title}
              </h3>

              <div style={{ maxWidth: 900, margin: "0 auto" }}>
                {caseStudy.design.feedback.blocks.map((block, idx) => (
                  <div key={idx} style={{ marginBottom: 28 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>
                      {block.heading}
                    </h4>
                    <p style={{ fontSize: 15, lineHeight: "1.7", color: "var(--ink-soft)", margin: 0 }}>
                      {block.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* HIGH-FIDELITY SECTION */}
            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: 16, fontWeight: 700 }}>
                {caseStudy.design.highFidelity.title}
              </h3>
              <p style={{ fontSize: 16, lineHeight: "1.7", color: "var(--ink-soft)", marginBottom: 32 }}>
                {caseStudy.design.highFidelity.description}
              </p>

              {caseStudy.design.highFidelity.annotations && caseStudy.design.highFidelity.annotations.length > 0 && (
                <div style={{ marginBottom: 24, padding: 20, backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>
                    Key Design Annotations
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 24, fontSize: 14, color: "var(--ink-soft)", lineHeight: "1.8" }}>
                    {caseStudy.design.highFidelity.annotations.map((annotation, idx) => (
                      <li key={idx}>{annotation}</li>
                    ))}
                  </ul>
                </div>
              )}

              {caseStudy.design.highFidelity.image && (
                <div style={{ marginTop: 24 }}>
                  <img
                    src={caseStudy.design.highFidelity.image}
                    alt="Sage HR Chatbot High-Fidelity Design"
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                </div>
              )}

              {!caseStudy.design.highFidelity.image && (
                <div style={{ padding: 32, backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px dashed rgba(255, 255, 255, 0.1)", textAlign: "center" }}>
                  <p style={{ fontSize: 15, color: "var(--ink-soft)", margin: 0 }}>
                    ✨ High-fidelity design coming soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      )}

    </section>
    </>
  );
}
