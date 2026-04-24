import { supabase } from './supabase'
import { HallId } from './halls'

export interface Aggregate {
  hall: HallId
  avg: number
  count: number
}

export interface Rating {
  id: string
  hall: HallId
  stars: number
  comment: string | null
  created_at: string
}

const SIX_HOURS_MS = 6 * 60 * 60 * 1000

function sixHoursAgo(): string {
  return new Date(Date.now() - SIX_HOURS_MS).toISOString()
}

export async function getAggregates(): Promise<Aggregate[]> {
  const { data, error } = await supabase
    .from('ratings')
    .select('hall, stars')
    .gte('created_at', sixHoursAgo())

  if (error) throw error
  if (!data || data.length === 0) return []

  const map = new Map<string, { sum: number; count: number }>()
  for (const row of data) {
    const entry = map.get(row.hall) ?? { sum: 0, count: 0 }
    entry.sum += row.stars
    entry.count += 1
    map.set(row.hall, entry)
  }

  return Array.from(map.entries()).map(([hall, { sum, count }]) => ({
    hall: hall as HallId,
    avg: sum / count,
    count,
  }))
}

export async function getRecentRatings(hall: HallId): Promise<Rating[]> {
  const { data, error } = await supabase
    .from('ratings')
    .select('id, hall, stars, comment, created_at')
    .eq('hall', hall)
    .gte('created_at', sixHoursAgo())
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) throw error
  return (data ?? []) as Rating[]
}

export async function submitRating(
  hall: HallId,
  stars: number,
  comment: string
): Promise<void> {
  const { error } = await supabase
    .from('ratings')
    .insert({ hall, stars, comment: comment.trim() || null })

  if (error) throw error
}

export function hasRatedToday(hall: HallId): boolean {
  const key = `rated:${hall}:${new Date().toISOString().slice(0, 10)}`
  return localStorage.getItem(key) === '1'
}

export function markRatedToday(hall: HallId): void {
  const key = `rated:${hall}:${new Date().toISOString().slice(0, 10)}`
  localStorage.setItem(key, '1')
}
