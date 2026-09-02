import { useParams, Link } from "react-router-dom";
import Reveal from "../components/Reveal";

export default function CaseStudy() {
  const { slug } = useParams();
  return (
    <section style={{ maxWidth: 800, margin: "0 auto", padding: "160px 24px 96px" }}>
      <Reveal>
        <Link to="/" style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
          ← Back home
        </Link>
        <h1 style={{ fontSize: "var(--fs-h1)", marginTop: 16 }}>
          Case study: {slug}
        </h1>
        <p style={{ marginTop: 12, color: "var(--ink-soft)" }}>
          This is a placeholder route. The real case-study content (problem,
          personas, process, decisions, embedded live prototype) goes here next.
        </p>
      </Reveal>
    </section>
  );
}
