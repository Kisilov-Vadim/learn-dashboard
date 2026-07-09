import { useState } from 'react'
import { CommandBlock } from './CommandBlock'

interface Props {
  onLogin: (email: string, password: string) => Promise<void>
}

export function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onLogin(email, password)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg py-12">
      <div className="w-full max-w-md flex flex-col gap-6">
        <form onSubmit={handleSubmit}>
          <div className="text-accent text-2xl font-bold mb-8 text-center tracking-tight">Learn</div>
          <div className="bg-surface rounded-xl p-6 border border-border flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="bg-bg border border-border2 rounded-lg text-[15px] px-4 py-2.5 outline-none text-white placeholder:text-faint focus:border-accent transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="bg-bg border border-border2 rounded-lg text-[15px] px-4 py-2.5 outline-none text-white placeholder:text-faint focus:border-accent transition-colors"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-accent2 hover:bg-purple-600 text-white font-semibold rounded-lg py-2.5 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="bg-surface rounded-xl p-6 border border-border flex flex-col gap-4">
          <div>
            <h2 className="text-white font-semibold text-[15px]">Install the plugin</h2>
            <p className="text-dim text-[13px] mt-1">
              Run these in your terminal to add <span className="text-muted font-mono">/learn</span> to Claude Code.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <CommandBlock
              label="1. Register the marketplace"
              command="claude plugin marketplace add Kisilov-Vadim/learn-claude-plugin"
            />
            <CommandBlock
              label="2. Install the plugin"
              command="claude plugin install learn@learn-marketplace"
            />
          </div>
          <p className="text-faint text-xs">
            Then restart Claude Code and type <span className="text-dim font-mono">/learn</span> to start.
          </p>
        </div>
      </div>
    </div>
  )
}
