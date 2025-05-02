import { atom } from 'jotai'
import { Task } from '../types'

export const tasksAtom = atom<Task[]>([])
