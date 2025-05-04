// src/components/ui/sidebar.tsx
import { Home, Search } from 'lucide-react';
import { useAtom } from 'jotai';
import { searchAtom } from '@/atoms/search';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '@/atoms/auth';

export const Sidebar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useAtom(searchAtom);
  const [user] = useAtom(userAtom);

  return (
    <>
      <aside className="hidden md:flex w-60 h-screen p-6 bg-white dark:bg-gray-900 border-r shadow-sm flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">ToDo App</h1>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 truncate">
          {user?.email}
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded px-4 py-2 transition"
        >
          <Home size={20} />
          ダッシュボード
        </button>

        <div className="flex items-center gap-2 px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800">
          <Search className="text-gray-500 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="タスクを検索"
            className="bg-transparent w-full text-sm focus:outline-none text-gray-800 dark:text-gray-100"
          />
        </div>
     
      </aside>
    </>
  );
};
