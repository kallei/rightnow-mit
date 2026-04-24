export const HALLS = [
  { id: 'maseeh',    name: 'Maseeh' },
  { id: 'mccormick', name: 'McCormick' },
  { id: 'next',      name: 'Next' },
  { id: 'baker',     name: 'Baker' },
  { id: 'simmons',   name: 'Simmons' },
  { id: 'vassar',    name: 'Vassar' },
] as const

export type HallId = typeof HALLS[number]['id']
