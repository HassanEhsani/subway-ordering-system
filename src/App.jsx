import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

import Header from "./components/Header";
import MenuItem from "./components/MenuItem";
import CartItem from "./components/CartItem";
import "./index.css";

const menuItems = [
  {
    id: 1,
    name: "Чикен Терияки",
    description: "Куриные полоски с терияки соусом.",
    price: 420,
    image: "chiken.jpg",
  },
  {
    id: 2,
    name: "Итальянский B.M.T.",
    description: "Салями, пепперони и ветчина.",
    price: 480,
    image: "bmt.jpg",
  },
  {
    id: 3,
    name: "Тунец Классик",
    description: "Тунец с овощами и соусом.",
    price: 390,
    image: "tuna.jpg",
  },
];



function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("subway-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("subway-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    exists
      ? setCart(cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)))
      : setCart([...cart, { ...item, quantity: 1 }]);

    toast.success(`${item.name} добавлен в корзину!`);
  };


  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));

  const submitOrder = () => {
    if (cart.length === 0) return alert("Корзина пуста!");
    alert("Заказ принят! 🥳");
    setCart([]);
    localStorage.removeItem("subway-cart");
  };
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  return (
    <>
      <Toaster position="top-center" />
      {<div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-6 py-16">
        <div className="bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl p-12 max-w-7xl w-full">

          <Header />
          <main className="grid md:grid-cols-2 gap-10">
            {/*   */}
            <section>
              <h2 className="text-2xl font-bold text-[#008C45] mb-6">Меню</h2>
              <div className="grid gap-6">
                {menuItems.map((item) => (
                  <MenuItem key={item.id} item={item} onAdd={addToCart} />
                ))}
              </div>
            </section>

            {/* بخش سبد خرید */}
            <section>
              <h2 className="text-2xl font-bold text-[#008C45] mb-6">Корзина</h2>
              {cart.length === 0 ? (
                <p className="text-gray-600">Корзина пуста 🛒</p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} onRemove={removeFromCart} />
                  ))}
                </ul>
              )}
              {cart.length > 0 && (
                <div className="mt-4 text-right space-y-1 text-[#008C45] font-semibold">
                  <p>🛒 Всего: {totalCount} товаров</p>
                  <p>💸 Итого: {totalPrice}₽</p>
                </div>
              )}

              <button
                onClick={submitOrder}
                className="mt-8 w-full bg-[#FFC72C] text-[#008C45] font-bold py-3 rounded-full shadow-md hover:shadow-lg hover:bg-[#e6b92c] transition duration-300"
              >
                Оформить заказ
              </button>
            </section>
          </main>
        </div>
      </div>}
    </>

  );
}

export default App;
