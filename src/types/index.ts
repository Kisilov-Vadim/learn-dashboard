export type Level = 'beginner' | 'junior' | 'middle' | 'senior' | 'principal'
export type Status = 'not-started' | 'learning' | 'mastered'
export type Method = 'socratic' | 'reading+socratic' | 'feynman' | 'active-recall' | 'deep-dive' | 'diagnostic'
export type Effectiveness = 'high' | 'medium' | 'low'

export interface Subject {
  id: string
  name: string
  goal: string
  currentLevel: Level
  targetLevel: Level
  streak: number
  lastUpdated: string | null
  totalTopics: number
  masteredTopics: number
  learningTopics: number
  dueToday: number
}

export interface Topic {
  id: string
  subjectId: string
  name: string
  level: Level
  score: number
  status: Status
  nextReview: string | null
  lastReviewed: string | null
  bestMethod: Method | null
  reviewCount: number
  prerequisites: string[]
  resources: Resource[]
}

export interface Resource {
  type: string
  title: string
  url?: string
  section?: string
}

export interface Touch {
  id: string
  sessionId: string
  topicId: string
  topicName?: string
  subjectId: string
  method: Method
  scoreBefore: number
  scoreAfter: number
  effectiveness: Effectiveness
  agentComment: string
  createdAt: string
}

export interface Session {
  id: string
  subjectId: string
  startedAt: string
  endedAt: string | null
}

export interface MethodStat {
  avgScoreDelta: number
  touches: number
  retired: boolean
}

export interface SubjectContext {
  streak: number
  dueTopics: Topic[]
  practiceCandidate: Topic | null
  nextUnstarted: Topic | null
  deepDiveCandidate: Topic | null
  methodEffectiveness: Record<string, MethodStat>
}
