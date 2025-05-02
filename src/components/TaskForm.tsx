import { useState } from 'react'
import { useAtom } from 'jotai'
import { tasksAtom } from '../atoms/tasks'
import { userAtom } from '../atoms/auth'
import { createTask } from '../api/tasks'

const TaskForm = () => {
  const [title, setTitle] = useState("")
  const [tasks, setTasks] = useAtom(tasksAtom)
  const [user] = useAtom(userAtom)

  const handleAdd = async () => {
    if (!title.trim()) return
    const { data, error } = await createTask({
      title,
      completed: false,
      user_id: user!.id
    })
    if (!error && data) {
      setTasks([data[0], ...tasks])
      setTitle("")
    }
  }
  
  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="新しいタスクを入力"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow border p-2 mr-2"
      />
      <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">追加</button>
    </div>
  )
}

export default TaskForm
