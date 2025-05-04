import { useAtom } from 'jotai';
import { tasksAtom } from '../atoms/tasks';
import { filterAtom } from '@/atoms/filter';
import { deleteTask, updateTask } from '../api/tasks';
import { Button } from '@/components/ui/button';
import { Check, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchAtom } from '@/atoms/search';

export const TaskList = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [filter] = useAtom(filterAtom);
  const [search] = useAtom(searchAtom);

  const toggleCompleted = async (id: string, completed: boolean) => {
    const { error } = await updateTask(id, { completed: !completed });
    if (!error) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
        )
      );
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteTask(id);
    if (!error) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <ul className="space-y-3">
      {filteredTasks.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          一致するタスクは見つかりませんでした。
        </p>
      )}
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className={`flex justify-between items-center p-4 rounded-lg shadow-sm transition-all border ${
              task.completed
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'bg-white dark:bg-gray-900'
            }`}
          >
            <span
              className={`text-lg transition-all ${
                task.completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {task.title}
            </span>
            <div className="flex gap-2">
              <Button
                variant={task.completed ? 'secondary' : 'default'}
                size="icon"
                onClick={() => toggleCompleted(task.id, task.completed)}
                className="hover:scale-105 transition"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(task.id)}
                className="hover:scale-105 transition"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};
