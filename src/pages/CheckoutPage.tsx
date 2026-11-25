import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearCart,
  selectCartItems,
  selectTotalPrice,
} from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const { user } = useAuth();

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearCart());
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-blue-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-2 text-xl font-bold text-blue-600 dark:text-blue-400">
          Đặt hàng thành công!
        </h1>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Cảm ơn <strong>{user?.username}</strong> đã mua sắm tại ShopMini
        </p>
        <Link
          to="/"
          className="inline-block rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="mb-5 text-xl font-bold">Thanh toán đơn hàng</h1>

      <div className="mb-5 rounded-md border border-blue-100 bg-blue-50/50 p-4 text-sm dark:border-slate-800 dark:bg-slate-950">
        <p>
          Người nhận: <strong>{user?.username}</strong>
        </p>
        <p className="mt-1">
          Số lượng mặt hàng: <strong>{items.length}</strong>
        </p>
        <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
          Tổng thanh toán: ${totalPrice.toFixed(2)}
        </p>
      </div>

      <form onSubmit={handleOrder} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Số điện thoại</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0912345678"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Địa chỉ giao hàng
          </label>
          <textarea
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ nhận hàng..."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950"
          />
        </div>

        <button
          type="submit"
          disabled={items.length === 0}
          className="w-full rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Đặt hàng
        </button>
      </form>
    </div>
  );
}