import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900">
      <Link to={`/products/${product.id}`} className="block">
        <div className="mb-4 flex h-44 items-center justify-center rounded bg-white p-3">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <span className="text-xs font-medium uppercase text-blue-600 dark:text-blue-400">
          {product.category}
        </span>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          {product.title}
        </h3>
      </Link>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
        <span className="text-base font-bold text-blue-600 dark:text-blue-400">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
        >
          + Thêm giỏ
        </button>
      </div>
    </div>
  );
}