import type { Subject } from '../types'
import { CommandBlock } from './CommandBlock'

interface Props {
  subjects: Subject[]
  onSelect: (id: string) => void
}

export function SubjectCards({ subjects, onSelect }: Props) {
  return (
    <div className="min-h-screen bg-bg px-12 pt-10 pb-12">
      <div className="text-accent text-2xl font-bold mb-8 tracking-tight">Learn</div>
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {subjects.map(s => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className="bg-surface border border-border rounded-xl p-5 text-left hover:border-border2 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-white font-semibold text-lg leading-tight capitalize">
                {s.name.replace(/-/g, ' ')}
              </span>
              {s.streak > 0 && (
                <span className="text-orange-400 font-bold text-sm ml-2 shrink-0">{s.streak}🔥</span>
              )}
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-3xl font-bold text-white">{s.completion ?? 0}%</span>
              <span className="text-dim text-sm">complete</span>
            </div>
            <div className="h-1 bg-border rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full"
                style={{ width: `${s.completion ?? 0}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
              />
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-muted">{s.mastered}/{s.totalTopics} mastered</span>
              {s.dueToday > 0 && (
                <span className="text-orange-400 font-semibold">{s.dueToday} due ⚡</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 max-w-2xl bg-surface rounded-xl p-6 border border-border flex flex-col gap-4">
        <div>
          <h2 className="text-white font-semibold text-[15px]">Install the plugin</h2>
          <p className="text-dim text-[13px] mt-1">
            Run this in your terminal to add <span className="text-muted font-mono">/learn</span> to Claude Code on another device.
          </p>
        </div>
        <CommandBlock command="claude plugin marketplace add Kisilov-Vadim/learn-claude-plugin && claude plugin install learn@learn-marketplace" />
        <p className="text-faint text-xs">
          Then restart Claude Code and type <span className="text-dim font-mono">/learn</span> to start.
        </p>
      </div>
    </div>
  )
}
