import { useAtom } from 'jotai'
import { tasksAtom } from '../atoms/tasks'
import { deleteTask, updateTask } from '../api/tasks'

const TaskList = () => {
  const [tasks, setTasks] = useAtom(tasksAtom)

  const toggleCompleted = async (id: string, completed: boolean) => {
    const { error } = await updateTask(id, { completed: !completed })
    if (!error) {
      setTasks(prev =>
        prev.map(task => task.id === id ? { ...task, completed: !completed } : task)
      )
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await deleteTask(id)
    if (!error) {
      setTasks(prev => prev.filter(task => task.id !== id))
    }
  }

  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <li key={task.id} className="flex justify-between items-center bg-white p-2 border rounded">
          <span className={task.completed ? "line-through text-gray-500" : ""}>
            {task.title}
          </span>
          <div className="space-x-2">
            <button onClick={() => toggleCompleted(task.id, task.completed)} className="text-blue-500">
              {task.completed ? "戻す" : "完了"}
            </button>
            <button onClick={() => handleDelete(task.id)} className="text-red-500">
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
