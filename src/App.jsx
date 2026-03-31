import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { profile, projects } from './data';

// ── Inline SVG brand icons (lucide-react v0.400+ removed these) ──
function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function LinkedinIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Status pill ──────────────────────────────────────────────
const statusMap = {
  live:      { label: 'Live',      cls: 'pill-live' },
  completed: { label: 'Completed', cls: 'pill-completed' },
  archived:  { label: 'Archived',  cls: 'pill-archived' },
};

function StatusPill({ status }) {
  const s = statusMap[status] ?? statusMap.completed;
  return (
    <span className={`pill ${s.cls}`}>
      <span className="dot" />
      {s.label}
    </span>
  );
}

// ── Project Card ─────────────────────────────────────────────
function Card({ project, index }) {
  return (
    <article className="card" style={{ animationDelay: `${index * 70}ms` }}>
      {/* Banner */}
      <div className="banner" style={{ background: project.gradient }}>
        {project.emoji}
        <div className="banner-fade" />
        <div className="pills">
          <StatusPill status={project.status} />
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <h2 className="card-title">{project.title}</h2>
        <p className="card-desc">{project.description}</p>

        <div className="tags">
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <div className="actions">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-main">
              <ExternalLink size={13} />
              Live Demo
            </a>
          ) : (
            <span style={{ flex: 1, fontSize: '.78rem', color: 'var(--subtle)', alignSelf: 'center' }}>
              Private / NDA
            </span>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <GithubIcon size={14} />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ── App ──────────────────────────────────────────────────────
const ALL = 'All';
const categories = [ALL, ...Array.from(new Set(projects.map((p) => p.category)))].filter(Boolean);

export default function App() {
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="page">
      {/* Background blobs */}
      <div className="bg-layer" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ── Header ── */}
      <header>
        <div className="container">
          <div className="header-eyebrow">
            <span className="pulse" />
            Project Showcase
          </div>

          <h1 className="header-name">
            <span className="grad-text">{profile.name}</span>
          </h1>

          <p className="header-title">{profile.title}</p>

          <div className="header-links">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hlink">
                <GithubIcon size={15} />
                GitHub
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hlink">
                <LinkedinIcon size={15} />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main>
        <div className="container">
          <div className="divider" />

          {/* Filter — only shown if projects have categories */}
          {categories.length > 1 && (
            <div className="filter-bar" role="group" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`fbtn${active === cat ? ' active' : ''}`}
                  onClick={() => setActive(cat)}
                  aria-pressed={active === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <p className="count-line">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </p>

          <div className="grid">
            {filtered.map((project, i) => (
              <Card key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer>
        <p>
          © {new Date().getFullYear()} <span>{profile.name}</span> · Built with React & Vite
        </p>
      </footer>
    </div>
  );
}
