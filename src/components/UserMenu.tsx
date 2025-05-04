// src/components/UserMenu.tsx
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { filterAtom } from '@/atoms/filter';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const setFilter = useSetAtom(filterAtom);

  const handleLogout = () => {
    // Supabaseログアウト処理など
    navigate('/login');
  };

  return (
    <Button variant="outline" onClick={handleLogout} className="flex gap-2 items-center">
       <LogOut className="w-4 h-4" />
       ログアウト
     </Button>
  );
};
