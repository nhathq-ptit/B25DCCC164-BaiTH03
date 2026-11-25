import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-5xl font-bold text-blue-600">404</h1>
      <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
        Trang không tồn tại
      </p>
      <Link
        to="/"
        className="mt-5 inline-block rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Về trang chủ
      </Link>
    </div>
  );
}