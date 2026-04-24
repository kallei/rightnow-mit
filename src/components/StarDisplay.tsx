interface Props {
  avg: number
  size?: 'sm' | 'lg'
}

export default function StarDisplay({ avg, size = 'sm' }: Props) {
  const starSize = size === 'lg' ? 'text-3xl' : 'text-xl'

  return (
    <span className={`${starSize} leading-none`} aria-label={`${avg.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.min(1, Math.max(0, avg - (n - 1)))
        if (fill >= 0.75) return <span key={n}>★</span>
        if (fill >= 0.25) return <span key={n} className="opacity-50">★</span>
        return <span key={n} className="opacity-20">★</span>
      })}
    </span>
  )
}
