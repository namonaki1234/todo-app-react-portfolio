// src/components/AddTaskDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {TaskForm} from './TaskForm';
import { useState } from 'react';

export const AddTaskDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">＋ タスクを追加</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新しいタスクを追加</DialogTitle>
        </DialogHeader>
        <TaskForm onAddSuccess={() => setOpen(false)} />
        <DialogFooter>
          {/* ここに閉じるボタンなどを追加することも可 */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
