import { supabase } from '../supabase/client'
import { Task } from '../types'

export const fetchTasks = async (userId: string) => {
  return await supabase.from('tasks').select('*').eq('user_id', userId).order('created_at', { ascending: false })
}

export const createTask = async (task: Omit<Task, 'id' | 'created_at'>) => {
  return await supabase
    .from('tasks')
    .insert(task)
    .select() // ← これを必ずつける！
}

export const updateTask = async (id: string, updates: Partial<Task>) => {
  return await supabase.from('tasks').update(updates).eq('id', id)
}

export const deleteTask = async (id: string) => {
  return await supabase.from('tasks').delete().eq('id', id)
}
