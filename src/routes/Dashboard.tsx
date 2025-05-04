import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/auth';
import { tasksAtom } from '../atoms/tasks';
import { fetchTasks } from '../api/tasks';
import { TaskList } from '../components/TaskList';
import { Sidebar } from '../components/ui/sidebar';
import { LogoutButton } from '@/components/UserMenu';
import { AddTaskDialog } from '@/components/AddTaskDialog';
import { TaskFilterTabs } from '../components/TaskFilterTabs';
import { List } from 'lucide-react';
import { TaskChart } from '@/components/TaskChart';
import { Button } from '@/components/ui/button';

export const Dashboard = () => {
  const [user] = useAtom(userAtom);
  const [, setTasks] = useAtom(tasksAtom);
  const [showChart, setShowChart] = useState(true); // ← 表示フラグ追加

  useEffect(() => {
    const loadTasks = async () => {
      const { data, error } = await fetchTasks(user!.id);
      if (!error && data) setTasks(data);
    };
    if (user) loadTasks();
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <List size={20} />
              タスク
            </h1>
            <LogoutButton />
          </div>

          <div className="w-full sm:max-w-lg mx-auto">
            <div className="mb-1">
              <Button onClick={() => setShowChart((prev) => !prev)}>
                {showChart ? 'グラフを隠す' : 'グラフを表示'}
              </Button>
            </div>
            {showChart && <TaskChart />}
          </div>

          <div className="mb-6">
            <AddTaskDialog />
          </div>
          <TaskFilterTabs />
          <TaskList />
        </div>
      </main>
    </div>
  );
};
