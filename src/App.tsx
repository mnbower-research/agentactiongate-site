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

const reviewPacketItems = [
  'proposed action',
  'scope',
  'diff / preview',
  'rollback path',
  'risk reason',
  'reviewer question',
  'safer alternative',
]

const policyProfileExamples = [
  {
    title: 'Sales agent',
    items: [
      'allow drafting outreach',
      'require approval before sending email',
      'block private lead exports',
    ],
  },
  {
    title: 'Support agent',
    items: [
      'allow drafting replies',
      'require approval before refunds or account changes',
      'block credential access or private exports',
    ],
  },
  {
    title: 'Coding agent',
    items: [
      'allow reading files and running tests',
      'require approval before modifying source',
      'block secret access or destructive filesystem actions',
    ],
  },
  {
    title: 'CI/CD agent',
    items: [
      'allow test runs',
      'require approval before deploy',
      'block destructive production actions',
    ],
  },
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
              customers, data, code, money, workflows, or public systems - and
              v0.7.0 adds Policy Profiles so different workflows can use
              different action rules.
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
              Open-source TypeScript &middot; 19/19 evals passing &middot; v0.7.0
              Policy Profiles live
            </p>
          </div>

          <div className="hero-panel" aria-label="Agent Action Gate flow">
            <div className="panel-header">
              <span className="status-dot" />
              <span>pre_execution_gate.txt</span>
            </div>
            <pre>{`AI proposes action
-> AAG evaluates workflow context
-> Policy Profile defines action rules
-> allow / require_approval / revise_action / block
-> decision logged as an audit-style receipt`}</pre>
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
              <h3>"Is this output correct?"</h3>
            </article>
            <article className="card comparison-card accent-card">
              <p className="card-kicker">New question</p>
              <h3>"Should this action be allowed before it affects the world?"</h3>
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
-> AI selects action
-> AI executes
-> external system changes
-> human review happens too late`}</pre>
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

        <section className="section review-packets-section">
          <div className="section-heading">
            <p className="eyebrow">V0.6.0 FEATURE</p>
            <h2>Review Packets</h2>
          </div>
          <div className="review-layout">
            <div>
              <p className="lead">
                Approval before write is not enough if the reviewer cannot see
                what is being approved.
              </p>
              <p className="important-line">
                <code>require_approval</code> without context is approval
                theater.
              </p>
              <p className="lead">
                Review Packets make the action boundary visible before
                execution by showing the proposed action, scope, diff or
                preview, rollback path, risk reason, and reviewer question.
              </p>
            </div>
            <div className="code-card review-example">
              <pre>{`Action: Send outreach email
Decision: require_approval

Review Packet:
Proposed action: Send outreach email to founder@example-company.test
Scope: one external contact; email; externalEffect=true
Diff / Preview:
Subject: AI agent oversight for launch workflows
Body: exact email text visible before send
Rollback: Cannot unsend after execution. Approval is required before sending.
Risk: External communication affects reputation and creates business commitment risk.
Reviewer question: Do you approve sending this exact email to this external contact?`}</pre>
            </div>
          </div>
          <div className="comparison-grid review-comparison-grid">
            <article className="card comparison-card">
              <p className="card-kicker">Without context</p>
              <h3>Approval theater</h3>
              <p>
                The system asks a human to approve a vague label like{' '}
                <code>send_email</code> without showing the actual recipient,
                message, scope, risk, or rollback condition.
              </p>
            </article>
            <article className="card comparison-card accent-card">
              <p className="card-kicker">With Review Packets</p>
              <h3>Meaningful review</h3>
              <p>
                The reviewer sees the exact action, the affected system, the
                preview or diff, the rollback path, the risk reason, and the
                question they are being asked to decide.
              </p>
            </article>
          </div>
          <div className="packet-list-wrap">
            <h3>A Review Packet can include:</h3>
            <div className="packet-list">
              {reviewPacketItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section policy-profiles-section">
          <div className="section-heading">
            <p className="eyebrow">V0.7.0 FEATURE</p>
            <h2>Policy Profiles</h2>
          </div>
          <p className="lead policy-lead">
            Same gate. Different workflow rules.
          </p>
          <p className="lead">
            A sales agent, support agent, coding agent, and CI/CD agent should
            not all share the same action policy.
          </p>
          <p className="lead">
            Policy Profiles let Agent Action Gate apply workflow-specific rules
            for <code>allow</code>, <code>require_approval</code>,{' '}
            <code>revise_action</code>, and <code>block</code> decisions.
          </p>
          <p className="important-line">
            Review Packets make approval meaningful. Policy Profiles make the
            gate adaptable.
          </p>
          <div className="policy-grid">
            {policyProfileExamples.map((profile) => (
              <article className="card policy-card" key={profile.title}>
                <h3>{profile.title}</h3>
                <ul className="check-list">
                  {profile.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="policy-flow-layout">
            <div className="code-card policy-flow">
              <pre>{`AI proposes action
-> Policy Profile defines workflow rules
-> AAG applies safety precedence
-> Review Packet shows scope, preview, rollback, and risk
-> allow / require_approval / revise_action / block
-> receipt records the decision`}</pre>
            </div>
            <aside className="policy-note">
              <p className="card-kicker">Safety precedence</p>
              <code>block &gt; require_approval &gt; revise_action &gt; allow</code>
              <p>
                Profiles should not silently weaken safety. If detector logic
                blocks an action, a profile cannot downgrade it to allow.
              </p>
            </aside>
          </div>
        </section>

        <section className="section" id="demo">
          <div className="section-heading">
            <p className="eyebrow">v0.7.0</p>
            <h2>Launch Copilot Demo</h2>
          </div>
          <p className="lead">
            The v0.7.0 terminal demo now runs under the launch-copilot Policy
            Profile.
          </p>
          <p className="important-line">
            Even the copilot used to help launch Agent Action Gate is governed
            by Agent Action Gate before it can send, publish, delete, or export.
          </p>
          <div className="demo-packet-notes">
            <p>The profile:</p>
            <ul className="check-list">
              <li>allows internal preparation</li>
              <li>
                requires approval for external/public communication
              </li>
              <li>
                blocks destructive or sensitive lead-data actions
              </li>
              <li>
                requires Review Packets for approval and block decisions
              </li>
            </ul>
          </div>
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
          <p className="lead">
            Receipts become more useful when they record not only the decision,
            but the policy profile and review packet context that shaped the
            decision: what was proposed, what was visible to the reviewer, what
            decision was made, and why.
          </p>
          <div className="code-card">
            <pre>{`{
  "agent": "launch-copilot",
  "policyProfile": "launch-copilot",
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
            &copy; 2026 Michael Bower. Agent Action Gate is an open-source
            reference implementation. v0.7.0 Policy Profiles live.
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
