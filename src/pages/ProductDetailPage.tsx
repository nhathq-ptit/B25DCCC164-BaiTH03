import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../types';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const productFromStore = useAppSelector((state) =>
    state.products.items.find((item) => item.id === Number(id))
  );

  const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(!productFromStore);

  useEffect(() => {
    if (productFromStore || !id) {
      return;
    }

    let isMounted = true;

    const fetchSingleProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (res.ok && isMounted) {
          const data: Product = await res.json();
          setFetchedProduct(data);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSingleProduct();

    return () => {
      isMounted = false;
    };
  }, [id, productFromStore]);

  const product = productFromStore ?? fetchedProduct;

  if (loading && !product) {
    return <p className="py-12 text-center text-slate-500">Đang tải chi tiết sản phẩm...</p>;
  }

  if (!product) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-base">Không tìm thấy sản phẩm</p>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="mb-5 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Quay lại danh sách
      </Link>

      <div className="grid grid-cols-1 gap-8 rounded-lg border border-slate-200 bg-white p-6 md:grid-cols-2 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-center rounded bg-white p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-72 object-contain"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="rounded bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              {product.category}
            </span>
            <h1 className="mt-3 text-xl font-bold">{product.title}</h1>
            <p className="mt-3 text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {product.description}
            </p>
          </div>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-6 w-full rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto sm:px-6"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}