import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { userAtom } from '../atoms/auth'
import { tasksAtom } from '../atoms/tasks'
import { fetchTasks } from '../api/tasks'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

const Dashboard = () => {
  const [user] = useAtom(userAtom)
  const [, setTasks] = useAtom(tasksAtom)

  useEffect(() => {
    const loadTasks = async () => {
      const { data, error } = await fetchTasks(user!.id)
      if (!error && data) setTasks(data)
    }
    if (user) loadTasks()
  }, [user])

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default Dashboard
