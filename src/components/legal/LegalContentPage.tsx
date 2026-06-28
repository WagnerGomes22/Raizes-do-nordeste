import { Link } from 'react-router-dom'

import type { LegalSection } from '@/data/legalContent'

type LegalContentPageProps = {
  breadcrumbLabel: string
  title: string
  description: string
  lastUpdated: string
  sections: LegalSection[]
}

export default function LegalContentPage({
  breadcrumbLabel,
  title,
  description,
  lastUpdated,
  sections,
}: LegalContentPageProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs text-slate-500">
          <Link to="/" className="text-amber-700 hover:underline">
            Home
          </Link>{' '}
          <span className="text-slate-400">/</span> {breadcrumbLabel}
        </div>
        <div className="mt-4 space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="max-w-3xl text-sm text-slate-600 sm:text-base">{description}</p>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Última atualização: {lastUpdated}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600 sm:text-base">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.bullets?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 sm:text-base">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>
    </div>
  )
}
