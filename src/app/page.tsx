import { getAggregates } from '@/lib/ratings'
import { HALLS } from '@/lib/halls'
import HallCard from '@/components/HallCard'

export const revalidate = 60

export default async function Home() {
  const aggregates = await getAggregates()
  const aggMap = Object.fromEntries(aggregates.map((a) => [a.hall, a]))

  return (
    <main className="mx-auto max-w-md px-4 pb-12 pt-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">RightNow@MIT</h1>
        <p className="mt-1 text-sm text-gray-500">Tonight's dining hall ratings — last 6 hours</p>
      </div>
      <div className="space-y-3">
        {HALLS.map((hall) => (
          <HallCard key={hall.id} hallId={hall.id} aggregate={aggMap[hall.id]} />
        ))}
      </div>
    </main>
  )
}
