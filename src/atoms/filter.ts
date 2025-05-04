import { atom } from 'jotai'

export type FilterType = 'all' | 'completed' | 'incomplete'
export const filterAtom = atom<FilterType>('all')
