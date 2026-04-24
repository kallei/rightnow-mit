'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StarPicker from './StarPicker'
import { submitRating, hasRatedToday, markRatedToday } from '@/lib/ratings'
import { HallId } from '@/lib/halls'

interface Props {
  hallId: HallId
}

export default function RatingForm({ hallId }: Props) {
  const router = useRouter()
  const [alreadyRated, setAlreadyRated] = useState(false)
  const [stars, setStars] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setAlreadyRated(hasRatedToday(hallId))
  }, [hallId])

  if (alreadyRated) {
    return (
      <p className="rounded-2xl bg-gray-100 px-5 py-4 text-center text-sm text-gray-500">
        You&apos;ve already rated this hall today. Check back tomorrow!
      </p>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (stars === 0) { setError('Pick a star rating first.'); return }
    setSubmitting(true)
    setError('')
    try {
      await submitRating(hallId, stars, comment)
      markRatedToday(hallId)
      router.refresh()
      setAlreadyRated(true)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white px-5 py-5 shadow-sm space-y-4">
      <p className="font-semibold text-gray-800">Rate tonight&apos;s food</p>
      <StarPicker value={stars} onChange={setStars} />
      <textarea
        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        rows={2}
        maxLength={200}
        placeholder="Optional comment (200 chars)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white disabled:opacity-50 active:bg-red-700"
      >
        {submitting ? 'Submitting…' : 'Submit Rating'}
      </button>
    </form>
  )
}
