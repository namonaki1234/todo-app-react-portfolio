import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Dashboard } from './routes/Dashboard';
import { useAtom } from 'jotai';
import { userAtom } from './atoms/auth';
import { useEffect, useState } from 'react';
import { supabase } from './supabase/client';

const App = () => {
  const [user, setUser] = useAtom(userAtom);

  const [isLoading, setIsLoading] = useState(true);

  // // アプリ起動時にセッションを復元
  useEffect(() => {
    const restoreSession = async () => {
      // console.log('🌀 セッション確認開始...');

      const { data, error } = await supabase.auth.getUser();
      // console.log('✅ getUser 結果:', { data, error });

      if (data?.user) {
        // console.log('👤 ユーザー検出:', data.user);
        setUser(data.user);
      } else {
        // console.log('⚠️ ユーザーなし');
      }

      setIsLoading(false); // ここが実行されないとLoadingのままになる
    };

    restoreSession();
  }, []);

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? '/dashboard' : '/login'} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
