import { useEffect, useState } from 'react'
import { rpc } from '../lib/supabase'
import type { Subject } from '../types'

export function useDashboard(enabled: boolean) {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try {
      setLoading(true)
      const data = await rpc<{ subjects: Subject[] }>('get_dashboard')
      setSubjects(data?.subjects ?? [])
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!enabled) return
    load()
  }, [enabled])

  return { subjects, loading, error, reload: load }
}
