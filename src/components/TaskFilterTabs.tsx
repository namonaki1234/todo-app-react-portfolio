import { useAtom } from 'jotai';
import { filterAtom, FilterType } from '@/atoms/filter';
import { Button } from '@/components/ui/button';
import { tasksAtom } from '@/atoms/tasks';

const tabs: { label: string; value: FilterType }[] = [
  { label: '全て', value: 'all' },
  { label: '未完了', value: 'incomplete' },
  { label: '完了', value: 'completed' },
];

export const TaskFilterTabs = () => {
  const [filter, setFilter] = useAtom(filterAtom);
  const [tasks] = useAtom(tasksAtom);

  const countMap = {
    all: tasks.length,
    incomplete: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          variant={filter === tab.value ? 'default' : 'outline'}
          onClick={() => setFilter(tab.value)}
        >
          {tab.label}{' '}
          <span
            className="ml-1 text-xs bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100  px-2 py-0.5 rounded-full"
          >
            {countMap[tab.value]}
          </span>
        </Button>
      ))}
    </div>
  );
};
