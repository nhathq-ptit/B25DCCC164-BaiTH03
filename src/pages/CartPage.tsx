import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
  updateQuantity,
  removeFromCart,
} from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white py-16 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-4 text-xl font-bold">Giỏ hàng trống</h1>
        <Link
          to="/"
          className="inline-block rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-14 w-14 rounded bg-white object-contain p-1"
                />
                <div>
                  <Link
                    to={`/products/${product.id}`}
                    className="text-sm font-semibold hover:text-blue-600"
                  >
                    {product.title}
                  </Link>
                  <p className="text-sm font-medium text-blue-600">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded border border-slate-300 dark:border-slate-700">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: product.id,
                          quantity: quantity - 1,
                        })
                      )
                    }
                    className="px-2.5 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: product.id,
                          quantity: quantity + 1,
                        })
                      )
                    }
                    className="px-2.5 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="text-xs font-medium text-red-500 hover:underline"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-base font-bold">Tóm tắt đơn hàng</h2>
          <div className="space-y-2 border-b border-slate-200 pb-4 text-sm dark:border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-500">Tổng số lượng:</span>
              <span className="font-medium">{totalQuantity} sản phẩm</span>
            </div>
            <div className="flex justify-between text-base font-bold">
              <span>Tổng tiền:</span>
              <span className="text-blue-600 dark:text-blue-400">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-5 block w-full rounded-md bg-blue-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            Tiến hành thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
}