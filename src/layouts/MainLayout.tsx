import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}