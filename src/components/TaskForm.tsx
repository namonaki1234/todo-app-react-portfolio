import { useState } from 'react';
import { useAtom } from 'jotai';
import { tasksAtom } from '../atoms/tasks';
import { userAtom } from '../atoms/auth';
import { createTask } from '../api/tasks';

export const TaskForm = ({ onAddSuccess }: { onAddSuccess?: () => void }) => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [user] = useAtom(userAtom);

  const handleAdd = async () => {
    if (!title.trim()) return;
    const { data, error } = await createTask({
      title,
      completed: false,
      user_id: user!.id,
    });
    if (!error && data) {
      setTasks([data[0], ...tasks]);
      setTitle('');
      onAddSuccess?.()  // ← 成功時にポップアップを閉じる
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAdd();
        }}
        className="flex-1 border p-2 rounded"
        placeholder="タスクを入力"
      />
      <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded whitespace-nowrap min-w-[80px] hover:bg-green-600 transition">
        追加
      </button>
    </div>
  );
};
