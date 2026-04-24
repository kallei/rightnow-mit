'use client'

import { useState } from 'react'

interface Props {
  value: number
  onChange: (stars: number) => void
}

export default function StarPicker({ value, onChange }: Props) {
  const [hovered, setHovered] = useState(0)
  const active = hovered || value

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={`text-4xl leading-none transition-opacity ${
            n <= active ? 'opacity-100' : 'opacity-20'
          }`}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  )
}
