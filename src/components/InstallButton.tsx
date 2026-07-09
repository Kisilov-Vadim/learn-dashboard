import { useEffect, useState } from 'react'
import { CommandBlock } from './CommandBlock'

export function InstallButton() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-medium px-3 py-1.5 rounded-md border border-border2 text-muted hover:text-white hover:border-accent transition-colors"
      >
        Install
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-surface border border-border rounded-xl p-7 flex flex-col gap-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-white font-bold text-xl tracking-tight">Install Learn</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-dim hover:text-white text-2xl leading-none transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <p className="text-muted text-sm leading-relaxed">
              This site is just a dashboard to monitor your progress. The learning itself happens
              inside <span className="text-white font-medium">Claude Code</span> — install the plugin
              there and study with the <span className="text-accent font-mono">/learn</span> command.
            </p>

            <div className="flex flex-col gap-2">
              <p className="text-dim text-xs">Run this in your terminal:</p>
              <CommandBlock command="claude plugin marketplace add Kisilov-Vadim/learn-claude-plugin && claude plugin install learn@learn-marketplace" />
            </div>

            <p className="text-faint text-xs">
              Then restart Claude Code and type <span className="text-dim font-mono">/learn</span> to start.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
