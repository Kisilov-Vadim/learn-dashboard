import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useDashboard } from './hooks/useDashboard'
import { useTopics, useTouches, useSubjectContext } from './hooks/useSubject'
import { Login } from './components/Login'
import { SubjectCards } from './components/SubjectCards'
import { Header } from './components/Header'
import { TopicsView } from './components/views/TopicsView'
import { SessionsView } from './components/views/SessionsView'
import { MethodsView } from './components/views/MethodsView'
import { TopicPanel } from './components/TopicPanel'

type Tab = 'topics' | 'sessions' | 'methods'

export default function App() {
  const { session, loading: authLoading, login, logout } = useAuth()
  const { subjects, loading: dashLoading } = useDashboard(!!session)
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('topics')
  const [openTopicId, setOpenTopicId] = useState<string | null>(null)

  const activeSubject = subjects.find(s => s.id === activeSubjectId) ?? null

  const { topics, loading: topicsLoading } = useTopics(activeSubjectId)
  const { touches, loading: touchesLoading } = useTouches(activeSubjectId)
  const { context } = useSubjectContext(activeSubjectId)

  if (authLoading) return <div className="min-h-screen bg-bg flex items-center justify-center text-dim">Loading…</div>
  if (!session) return <Login onLogin={login} />
  if (dashLoading) return <div className="min-h-screen bg-bg flex items-center justify-center text-dim">Loading…</div>

  if (!activeSubjectId) {
    return (
      <SubjectCards
        subjects={subjects}
        onSelect={id => { setActiveSubjectId(id); setActiveTab('topics') }}
      />
    )
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: 'topics', label: 'Topics' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'methods', label: 'Methods' },
  ]

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header
        subjects={subjects}
        activeId={activeSubjectId}
        onSubjectChange={id => { setActiveSubjectId(id); setActiveTab('topics') }}
        onHome={() => setActiveSubjectId(null)}
        onLogout={logout}
        streak={context?.streak ?? activeSubject?.streak ?? 0}
      />

      {/* Tabs */}
      <nav className="flex border-b border-border px-12">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-base font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-accent border-accent'
                : 'text-dim border-transparent hover:text-muted'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-12 pt-5 pb-10 min-h-0">
        {topicsLoading || touchesLoading ? (
          <div className="flex items-center justify-center h-32 text-dim">Loading…</div>
        ) : (
          <>
            {activeTab === 'topics' && (
              <TopicsView
                topics={topics}
                onOpenTopic={setOpenTopicId}
              />
            )}
            {activeTab === 'sessions' && (
              <SessionsView
                touches={touches}
                topics={topics}
                streak={context?.streak ?? 0}
                onOpenTopic={id => { setOpenTopicId(id) }}
              />
            )}
            {activeTab === 'methods' && (
              <MethodsView
                context={context}
                subjectName={activeSubject?.name ?? ''}
              />
            )}
          </>
        )}
      </main>

      <TopicPanel topicId={openTopicId} onClose={() => setOpenTopicId(null)} />
    </div>
  )
}
