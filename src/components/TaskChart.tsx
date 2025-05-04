// src/components/TaskChart.tsx
import { useAtom } from 'jotai';
import { tasksAtom } from '@/atoms/tasks';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

export const TaskChart = () => {
  const [tasks] = useAtom(tasksAtom);

  const completed = tasks.filter((t) => t.completed).length;
  const incomplete = tasks.length - completed;

  const data = [
    { name: '完了', value: completed },
    { name: '未完了', value: incomplete },
  ];

  const COLORS = ['#4ade80', '#f87171']; // 緑・赤

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">完了率</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={70}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
