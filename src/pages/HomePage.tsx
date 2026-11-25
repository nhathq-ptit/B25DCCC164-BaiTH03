import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">
          Danh sách sản phẩm
        </h1>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none sm:w-72 dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      {status === 'loading' && (
        <p className="py-12 text-center text-slate-500">Đang tải sản phẩm...</p>
      )}

      {status === 'failed' && (
        <p className="py-12 text-center text-red-500">Lỗi: {error}</p>
      )}

      {status === 'succeeded' && (
        <>
          {filteredProducts.length === 0 ? (
            <p className="py-12 text-center text-slate-500">
              Không tìm thấy sản phẩm phù hợp
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}