import { useState } from 'react'

const contactEmail = 'mnbower.researcher@gmail.com'

const links = {
  github: 'https://github.com/mnbower-research/agent-action-gate',
  demo: 'https://youtu.be/YpEOIQ_v15Q',
  demoCode:
    'https://github.com/mnbower-research/agent-action-gate/tree/main/examples/launch-copilot',
  research: 'https://alignmenttheory.org',
  boundaryReview:
    'mailto:mnbower.researcher@gmail.com?subject=AI%20Agent%20Boundary%20Review',
  email: `mailto:${contactEmail}`,
}

const decisions = [
  {
    name: 'allow',
    description: 'Low-risk internal actions can proceed.',
    example: 'Draft a private note or summarize internal context.',
  },
  {
    name: 'require_approval',
    description:
      'Actions that affect people, systems, reputation, money, customer data, code, or public communication are paused for human review.',
    example: 'Send an email, publish a post, issue a refund, deploy code.',
  },
  {
    name: 'revise_action',
    description:
      'Actions that are directionally valid but too broad, risky, unclear, or poorly scoped are returned for revision.',
    example: 'Narrow a data request or rewrite an external message.',
  },
  {
    name: 'block',
    description:
      'Unsafe, destructive, unauthorized, irreversible, or sensitive actions are stopped.',
    example: 'Delete production records, export private data, access credentials.',
  },
]

const designedFor = [
  'custom tool-calling agents',
  'n8n / workflow automation',
  'internal copilots',
  'coding agents',
  'browser or API agents',
  'support and operations agents',
  'AI systems that can send, delete, export, deploy, publish, refund, or update records',
]

const boundaryReviewItems = [
  'what actions the agent can take',
  'what should be allowed',
  'what should require approval',
  'what should be revised',
  'what should be blocked',
  'what receipts should be logged',
]

const demoRows = [
  ['Draft outreach email', 'allow'],
  ['Send outreach email', 'require_approval'],
  ['Update lead notes', 'allow'],
  ['Publish LinkedIn post', 'require_approval'],
  ['Delete lead record', 'block'],
  ['Export private lead list', 'block'],
]

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  const isMailto = href.startsWith('mailto:')

  return (
    <a
      className={className}
      href={href}
      target={isMailto ? undefined : '_blank'}
      rel={isMailto ? undefined : 'noreferrer'}
    >
      {children}
    </a>
  )
}

function App() {
  const [copyEmailLabel, setCopyEmailLabel] = useState('Copy email')

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail)
      setCopyEmailLabel('Copied email')
      window.setTimeout(() => setCopyEmailLabel('Copy email'), 1800)
    } catch {
      setCopyEmailLabel('Copy email')
    }
  }

  return (
    <div className="site-shell">
      <header className="top-nav">
        <a className="brand" href="#top" aria-label="Agent Action Gate home">
          <span className="brand-mark" aria-hidden="true" />
          Agent Action Gate
        </a>
        <nav aria-label="Primary navigation">
          <a href="#demo">Demo</a>
          <ExternalLink href={links.github}>GitHub</ExternalLink>
          <ExternalLink href={links.boundaryReview}>Boundary Review</ExternalLink>
          <ExternalLink href={links.research}>Research</ExternalLink>
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">Open-source action governance layer</p>
            <h1>Agent Action Gate</h1>
            <p className="subheadline">
              Pre-execution action governance for AI agents.
            </p>
            <p className="hero-support">
              AI agents are moving from answering questions to taking actions.
              Agent Action Gate checks proposed actions before they affect
              customers, data, code, money, workflows, or public systems.
            </p>
            <div className="cta-row">
              <ExternalLink className="button button-primary" href={links.demo}>
                Watch Demo
              </ExternalLink>
              <ExternalLink
                className="button button-secondary"
                href={links.github}
              >
                View GitHub
              </ExternalLink>
            </div>
            <p className="proof-line">
              Open-source TypeScript · 19/19 evals passing · Demo live
            </p>
          </div>

          <div className="hero-panel" aria-label="Agent Action Gate flow">
            <div className="panel-header">
              <span className="status-dot" />
              <span>pre_execution_gate.txt</span>
            </div>
            <pre>{`AI proposes action
→ AAG evaluates
→ allow / require_approval / revise_action / block
→ decision logged as an audit-style receipt`}</pre>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Operational AI</p>
            <h2>Why now</h2>
          </div>
          <div className="copy-block">
            <p>
              AI systems are becoming operational actors. They no longer only
              generate text; they can trigger tools, workflows, APIs, emails,
              code changes, database updates, file operations, and public
              communications.
            </p>
            <p>That changes the safety question.</p>
          </div>
          <div className="comparison-grid">
            <article className="card comparison-card">
              <p className="card-kicker">Old question</p>
              <h3>“Is this output correct?”</h3>
            </article>
            <article className="card comparison-card accent-card">
              <p className="card-kicker">New question</p>
              <h3>“Should this action be allowed before it affects the world?”</h3>
            </article>
          </div>
          <p className="closing-line">
            Agent Action Gate focuses on the action boundary: the moment AI
            cognition becomes external consequence.
          </p>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Failure mode</p>
            <h2>Integration Bypass</h2>
          </div>
          <p className="lead">
            Integration Bypass occurs when an AI agent closes an action loop
            before a human has meaningfully understood, reviewed, approved,
            revised, or owned the outcome.
          </p>
          <div className="code-card">
            <pre>{`AI reasons
→ AI selects action
→ AI executes
→ external system changes
→ human review happens too late`}</pre>
          </div>
          <p className="closing-line">
            AAG is built to move oversight before the action, not after the
            incident.
          </p>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Decision surface</p>
            <h2>What Agent Action Gate does</h2>
          </div>
          <div className="decision-grid">
            {decisions.map((decision) => (
              <article className="card decision-card" key={decision.name}>
                <h3>{decision.name}</h3>
                <p>{decision.description}</p>
                <div className="example">
                  <span>Example</span>
                  {decision.example}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="demo">
          <div className="section-heading">
            <p className="eyebrow">v0.5.0</p>
            <h2>Launch Copilot Demo</h2>
          </div>
          <p className="lead">
            The v0.5.0 demo shows a simulated business-development agent
            governed by Agent Action Gate.
          </p>
          <p className="important-line">
            Even the copilot used to help launch Agent Action Gate is governed
            by Agent Action Gate before it can send, publish, delete, or export.
          </p>
          <div className="video-frame">
            <iframe
              src="https://www.youtube.com/embed/YpEOIQ_v15Q"
              title="Agent Action Gate Launch Copilot demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Proposed action</th>
                  <th>Gate decision</th>
                </tr>
              </thead>
              <tbody>
                {demoRows.map(([action, decision]) => (
                  <tr key={action}>
                    <td>{action}</td>
                    <td>
                      <code>{decision}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ExternalLink className="button button-secondary" href={links.demoCode}>
            View demo code on GitHub
          </ExternalLink>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Architecture boundary</p>
            <h2>Where AAG fits</h2>
          </div>
          <p className="lead">
            Agent Action Gate is designed to sit at the boundary between an AI
            agent and the tools it wants to use.
          </p>
          <div className="fit-grid">
            {designedFor.map((item) => (
              <div className="fit-item" key={item}>
                {item}
              </div>
            ))}
          </div>
          <p className="constraint-note">
            AAG is not a replacement for IAM, sandboxing, secrets management,
            legal review, or organizational governance. It is a pre-execution
            action gate that can sit alongside those controls.
          </p>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Reviewable evidence</p>
            <h2>Receipts before consequences</h2>
          </div>
          <p className="lead">
            AAG creates audit-style evidence around proposed actions.
          </p>
          <div className="code-card">
            <pre>{`{
  "agent": "launch-copilot",
  "proposedAction": "send_outreach_email",
  "decision": "require_approval",
  "reason": "External communication requires human review.",
  "humanDecision": "approved",
  "timestamp": "2026-05-04T00:00:00.000Z"
}`}</pre>
          </div>
          <p className="closing-line">
            The goal is not just to stop unsafe actions. The goal is to make the
            action boundary visible, reviewable, and accountable.
          </p>
        </section>

        <section className="section boundary-section">
          <div className="section-heading">
            <p className="eyebrow">Early offering</p>
            <h2>AI Agent Boundary Review</h2>
          </div>
          <div className="boundary-layout">
            <div>
              <p className="lead">
                For teams experimenting with AI agents or automation, the first
                step is not a full platform rollout. It is a boundary review.
              </p>
              <p>An AI Agent Boundary Review maps one workflow and identifies:</p>
              <ul className="check-list">
                {boundaryReviewItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="cta-panel">
              <h3>Map one workflow before it acts.</h3>
              <p>
                Define the allow, approval, revision, block, and receipt rules
                around a real agentic workflow.
              </p>
              <div className="stacked-actions">
                <ExternalLink
                  className="button button-primary"
                  href={links.boundaryReview}
                >
                  Request Boundary Review
                </ExternalLink>
                <ExternalLink
                  className="button button-secondary"
                  href={links.github}
                >
                  View open-source repo
                </ExternalLink>
              </div>
              <div className="contact-row">
                <p>
                  <span>Email:</span> {contactEmail}
                </p>
                <button
                  className="copy-email-button"
                  type="button"
                  onClick={handleCopyEmail}
                >
                  {copyEmailLabel}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Research foundation</p>
            <h2>Research foundation</h2>
          </div>
          <p className="lead">
            Agent Action Gate is part of a broader research program called
            Alignment Theory, focused on human agency, participatory capacity,
            internal vs. external regulation, and the conditions under which
            systems preserve or erode meaningful human judgment.
          </p>
          <div className="research-list" aria-label="Research themes">
            <span>Integration Bypass</span>
            <span>PCPI: Participatory Capacity Preservation Index</span>
            <span>Pre-execution human oversight</span>
            <span>Runtime action governance</span>
          </div>
          <ExternalLink className="button button-secondary" href={links.research}>
            Explore Alignment Theory
          </ExternalLink>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Agent Action Gate</strong>
          <p>
            © 2026 Michael Bower. Agent Action Gate is an open-source reference
            implementation.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ExternalLink href={links.github}>GitHub</ExternalLink>
          <ExternalLink href={links.demo}>Demo</ExternalLink>
          <ExternalLink href={links.research}>Alignment Theory</ExternalLink>
          <ExternalLink href={links.email}>{contactEmail}</ExternalLink>
        </nav>
      </footer>
    </div>
  )
}

export default App
