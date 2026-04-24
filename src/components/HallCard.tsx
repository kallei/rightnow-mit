import Link from 'next/link'
import StarDisplay from './StarDisplay'
import { Aggregate } from '@/lib/ratings'
import { HallId, HALLS } from '@/lib/halls'

interface Props {
  hallId: HallId
  aggregate: Aggregate | undefined
}

export default function HallCard({ hallId, aggregate }: Props) {
  const hall = HALLS.find((h) => h.id === hallId)!

  return (
    <Link
      href={`/${hallId}`}
      className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm active:bg-gray-50"
    >
      <div>
        <p className="text-lg font-semibold text-gray-900">{hall.name}</p>
        {aggregate ? (
          <p className="mt-0.5 text-sm text-gray-500">
            {aggregate.count} rating{aggregate.count !== 1 ? 's' : ''} tonight
          </p>
        ) : (
          <p className="mt-0.5 text-sm text-gray-400">No ratings yet tonight</p>
        )}
      </div>
      <div className="text-right">
        {aggregate ? (
          <>
            <StarDisplay avg={aggregate.avg} />
            <p className="mt-0.5 text-sm font-medium text-gray-600">
              {aggregate.avg.toFixed(1)}
            </p>
          </>
        ) : (
          <span className="text-xl opacity-20">★★★★★</span>
        )}
      </div>
    </Link>
  )
}
