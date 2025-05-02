import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage("登録完了！メールを確認してください")
      setTimeout(() => navigate("/login"), 2000)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">新規登録</h1>
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
      {message && <p className="text-green-600">{message}</p>}
      <button className="bg-green-500 text-white px-4 py-2" onClick={handleRegister}>
        登録
      </button>
    </div>
  )
}

export default Register
