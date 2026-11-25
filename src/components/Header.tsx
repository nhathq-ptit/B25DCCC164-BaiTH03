import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useAppSelector } from '../app/hooks';
import { selectTotalQuantity } from '../features/cart/cartSlice';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const totalQuantity = useAppSelector(selectTotalQuantity);

  return (
    <header className="sticky top-0 z-10 border-b border-blue-100 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          ShopMini
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Giỏ hàng
            <span className="ml-1.5 rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
              {totalQuantity}
            </span>
          </Link>

          <button
            onClick={toggleTheme}
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {theme === 'light' ? ' Tối' : ' Sáng'}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {user.username}
              </span>
              <button
                onClick={logout}
                className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-blue-600 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}