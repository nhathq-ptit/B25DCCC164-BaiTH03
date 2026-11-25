import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const from = state?.from?.pathname ?? '/';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Tên đăng nhập không được trống và mật khẩu phải là "123456"');
    }
  };

  return (
    <div className="mx-auto max-w-sm rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="mb-5 text-center text-xl font-bold text-blue-600 dark:text-blue-400">
        Đăng nhập
      </h1>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-2.5 text-xs text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Tên đăng nhập</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên của bạn..."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập 123456"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}