import { notFound } from 'next/navigation'
import Link from 'next/link'
import { HALLS, HallId } from '@/lib/halls'
import { getAggregates, getRecentRatings } from '@/lib/ratings'
import StarDisplay from '@/components/StarDisplay'
import RatingForm from '@/components/RatingForm'

export const revalidate = 30

interface Props {
  params: { hall: string }
}

export default async function HallPage({ params }: Props) {
  const hallDef = HALLS.find((h) => h.id === params.hall)
  if (!hallDef) notFound()

  const hallId = params.hall as HallId
  const [aggregates, ratings] = await Promise.all([
    getAggregates(),
    getRecentRatings(hallId),
  ])
  const agg = aggregates.find((a) => a.hall === hallId)

  return (
    <main className="mx-auto max-w-md px-4 pb-12 pt-8">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500">
        ← All halls
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{hallDef.name}</h1>
        {agg ? (
          <div className="mt-2 flex items-center gap-3">
            <StarDisplay avg={agg.avg} size="lg" />
            <span className="text-lg font-semibold text-gray-700">{agg.avg.toFixed(1)}</span>
            <span className="text-sm text-gray-400">({agg.count} rating{agg.count !== 1 ? 's' : ''} tonight)</span>
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-400">No ratings yet tonight — be the first!</p>
        )}
      </div>

      <div className="mb-8">
        <RatingForm hallId={hallId} />
      </div>

      {ratings.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Recent comments
          </h2>
          <div className="space-y-2">
            {ratings.map((r) => (
              <div key={r.id} className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {r.comment && (
                  <p className="mt-1 text-sm text-gray-700">{r.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
