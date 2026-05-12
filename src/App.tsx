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

const whyActions = [
  'sending emails',
  'updating records',
  'calling APIs',
  'triggering workflows',
  'accessing files',
  'touching customer data',
  'deploying code',
]

const workCards = [
  {
    title: 'Propose',
    body: 'An agent submits a structured action request before execution.',
  },
  {
    title: 'Evaluate',
    body: 'AAG checks authority, scope, reversibility, approval needs, risk, and proof.',
  },
  {
    title: 'Decide',
    body: 'AAG returns allow, require_approval, revise_action, or block.',
  },
  {
    title: 'Record',
    body: 'AAG writes receipts so the decision path can be reviewed later.',
  },
]

const runtimeBehaviors = [
  'missing permit -> denied',
  'expired permit -> denied',
  'wrong action hash -> denied',
  'non-allow decision -> no permit issued',
  'valid permit -> simulated execution allowed',
]

const questions = [
  'Is this action authorized?',
  'Is it within scope?',
  'Is it reversible?',
  'Who is accountable?',
  'Does it require human judgment?',
  'What proof remains?',
]

const capabilities = [
  'pre-execution action evaluation',
  'four decision outcomes',
  'policy profiles',
  'approval authority map',
  'approval quality layer',
  'review packets',
  'workflow scope ledger',
  'receipt hash chain',
  'signed receipts MVP',
  'MetaGate',
  'Runtime Binding MVP',
  'n8n demo workflows',
  'quickstart and integration docs',
]

const securityStack = [
  'IAM',
  'sandboxing',
  'least-privilege credentials',
  'runtime separation',
  'protected key management',
  'external append-only storage',
  'legal compliance review',
  'production security architecture',
]

const releaseProgression = [
  {
    version: 'v1.0.0',
    title: 'Core gate',
    body: 'Evaluate proposed actions before execution.',
  },
  {
    version: 'v1.8.0',
    title: 'Approval Quality Layer',
    body: 'Improve meaningful human review.',
  },
  {
    version: 'v1.9.0',
    title: 'Signed Receipts MVP',
    body: 'Local Ed25519 receipt signing and verification.',
  },
  {
    version: 'v1.9.1',
    title: 'Adoption polish',
    body: 'Quickstart, Integration Guide, and Production Hardening docs.',
  },
  {
    version: 'v2.0.0',
    title: 'Runtime Binding MVP',
    body: 'Execution permits and protected executor simulation.',
  },
]

const architectureSteps = [
  'Agent',
  'Action Proposal',
  'Agent Action Gate',
  'Decision: allow / approval / revise / block',
  'Receipt',
  'Execution Permit',
  'Protected Executor',
  'Tool Action',
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
  const isHash = href.startsWith('#')

  return (
    <a
      className={className}
      href={href}
      target={isMailto || isHash ? undefined : '_blank'}
      rel={isMailto || isHash ? undefined : 'noreferrer'}
    >
      {children}
    </a>
  )
}

function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="section-intro">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children}
    </div>
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
          <span>Agent Action Gate</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#runtime-binding">Runtime Binding</a>
          <a href="#quickstart">Quickstart</a>
          <a href="#hardening">Hardening</a>
          <ExternalLink href={links.github}>GitHub</ExternalLink>
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">v2.0.0 Runtime Binding MVP</p>
            <h1>Pre-execution governance for AI agents.</h1>
            <p className="subheadline">
              Agent Action Gate evaluates proposed agent actions before they
              touch tools, data, customers, systems, or workflows.
            </p>
            <p className="hero-support">Action must not outrun discernment.</p>
            <div className="cta-row" aria-label="Primary calls to action">
              <ExternalLink className="button button-primary" href={links.github}>
                GitHub
              </ExternalLink>
              <a className="button button-secondary" href="#quickstart">
                Quickstart
              </a>
              <a className="button button-secondary" href="#runtime-binding">
                Runtime Binding
              </a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Agent Action Gate flow">
            <div className="panel-header">
              <span className="status-dot" aria-hidden="true" />
              <span>aag-runtime-binding.flow</span>
            </div>
            <pre>{`Agent proposes action
-> AAG evaluates
-> allow / require_approval / revise_action / block
-> receipt is written
-> execution permit can be issued
-> protected executor verifies permit`}</pre>
          </div>
        </section>

        <section className="section why-section">
          <SectionIntro eyebrow="Why this exists" title="Agentic AI changes the governance question.">
            <p>
              Most AI governance is still built around outputs. But agentic AI
              is moving from answers to actions.
            </p>
          </SectionIntro>
          <div className="split-layout">
            <div className="action-list" aria-label="Agent action examples">
              {whyActions.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="question-panel">
              <div>
                <p className="label">For chatbots</p>
                <h3>"Is this output correct?"</h3>
              </div>
              <div>
                <p className="label">For agents</p>
                <h3>"Should this action be allowed before it affects the world?"</h3>
              </div>
              <p>
                That is the gap AAG is built around: the decision point between
                agent intent and external consequence.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <SectionIntro eyebrow="How AAG works" title="A small gate before action." />
          <div className="card-grid four">
            {workCards.map((card) => (
              <article className="card step-card" key={card.title}>
                <span className="step-number" aria-hidden="true">
                  {String(workCards.indexOf(card) + 1).padStart(2, '0')}
                </span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section runtime-section" id="runtime-binding">
          <SectionIntro eyebrow="Current release" title="v2.0.0 Runtime Binding MVP">
            <p className="invariant">
              No tool execution without a valid AAG execution permit.
            </p>
            <p>
              Runtime Binding connects the gate decision to the execution path.
              Instead of only recording that the gate evaluated an action, the
              protected executor checks for a valid permit before simulated
              execution.
            </p>
          </SectionIntro>
          <div className="runtime-layout">
            <div className="code-card">
              <pre>{`Agent proposes action
-> AAG evaluates action
-> receipt is written
-> execution permit can be issued for allow decisions
-> protected executor verifies permit
-> no valid permit, no simulated execution`}</pre>
            </div>
            <div className="card behavior-card">
              <h3>Demo behavior</h3>
              <ul className="check-list">
                {runtimeBehaviors.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="boundary-note">
            This is an MVP reference implementation, not production-complete
            enforcement.
          </p>
        </section>

        <section className="section">
          <SectionIntro title="The six questions AAG asks before action." />
          <ol className="question-grid">
            {questions.map((question) => (
              <li className="question-card" key={question}>
                <span>{String(questions.indexOf(question) + 1).padStart(2, '0')}</span>
                {question}
              </li>
            ))}
          </ol>
        </section>

        <section className="section">
          <SectionIntro eyebrow="Current capabilities" title="What AAG includes today" />
          <div className="check-grid">
            {capabilities.map((item) => (
              <div className="check-item" key={item}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="section architecture-section">
          <SectionIntro eyebrow="Architecture" title="Where the gate sits">
            <p>
              AAG sits between an AI agent and the tool action it wants to run.
              It evaluates proposed actions before execution and leaves evidence
              of the decision path.
            </p>
          </SectionIntro>
          <div className="architecture-diagram" aria-label="Agent Action Gate architecture flow">
            {architectureSteps.map((step) => (
              <div className="diagram-step" key={step}>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section hardening-section" id="hardening">
          <SectionIntro title="AAG is a gate, not the whole security stack.">
            <p>AAG does not replace:</p>
          </SectionIntro>
          <div className="security-list">
            {securityStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="closing-line">
            AAG adds the missing pre-execution decision and proof layer between
            agent intent and real-world consequence.
          </p>
        </section>

        <section className="section quickstart-section" id="quickstart">
          <SectionIntro eyebrow="Developer quickstart" title="Run the gate locally">
            <p>
              Start from the open-source package and demo commands, then review
              the Runtime Binding MVP and production hardening boundaries before
              connecting real tools.
            </p>
          </SectionIntro>
          <div className="quickstart-layout">
            <div className="code-card">
              <pre>{`npm install agent-action-gate

npm run eval:action-gate
npm run demo:runtime-binding
npm run test:runtime-binding`}</pre>
            </div>
            <div className="doc-links" aria-label="Documentation links">
              <ExternalLink href={links.github}>GitHub repo</ExternalLink>
              <a href="#quickstart">Quickstart docs</a>
              <a href="#runtime-binding">Runtime Binding docs</a>
              <a href="#hardening">Production Hardening docs</a>
            </div>
          </div>
        </section>

        <section className="section">
          <SectionIntro eyebrow="Release progression" title="From evaluation to runtime binding" />
          <div className="timeline">
            {releaseProgression.map((release) => (
              <article className="timeline-item" key={release.version}>
                <span>{release.version}</span>
                <h3>{release.title}</h3>
                <p>{release.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section evaluator-section">
          <SectionIntro eyebrow="Early evaluation" title="Map one workflow before it acts.">
            <p>
              For technical builders, governance teams, and early enterprise
              evaluators, the useful first step is a bounded workflow review:
              what the agent may do, what requires approval, what must be
              revised, what must be blocked, and what proof should remain.
            </p>
          </SectionIntro>
          <div className="cta-panel">
            <div>
              <h3>AI Agent Boundary Review</h3>
              <p>
                Define the allow, approval, revision, block, and receipt rules
                around a real agentic workflow.
              </p>
            </div>
            <div className="cta-actions">
              <ExternalLink className="button button-primary" href={links.boundaryReview}>
                Request Boundary Review
              </ExternalLink>
              <ExternalLink className="button button-secondary" href={links.github}>
                View GitHub
              </ExternalLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Agent Action Gate</strong>
          <p>Open-source pre-execution governance layer for AI agents.</p>
          <p className="footer-provenance">
            Copyright 2026 Michael Bower. Agent Action Gate is an open-source
            MVP reference implementation.
          </p>
          <p className="footer-motto">Action must not outrun discernment.</p>
        </div>
        <nav aria-label="Footer navigation">
          <ExternalLink href={links.github}>GitHub</ExternalLink>
          <a href="#quickstart">Quickstart</a>
          <a href="#runtime-binding">Runtime Binding</a>
          <a href="#hardening">Production Hardening</a>
          <ExternalLink href={links.demo}>Demo archive</ExternalLink>
          <ExternalLink href={links.research}>Research</ExternalLink>
          <ExternalLink href={links.email}>{contactEmail}</ExternalLink>
        </nav>
        <button className="copy-email-button" type="button" onClick={handleCopyEmail}>
          {copyEmailLabel}
        </button>
      </footer>
    </div>
  )
}

export default App
