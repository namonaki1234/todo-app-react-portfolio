import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { supabase } from '../supabase/client';
import { userAtom } from '../atoms/auth';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
      navigate('/dashboard');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <input
        type="email"
        placeholder="メールアドレス"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleLogin}
      >
        ログイン
      </button>

      <p className="mt-4 text-sm">
        アカウントをお持ちでない方は{' '}
        <Link to="/register" className="text-blue-500 underline">
          新規登録はこちら
        </Link>
      </p>
    </div>
  );
};


