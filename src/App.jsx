import { useState, useEffect } from "react";
import Header from "./components/Header";
import MenuItem from "./components/MenuItem";
import CartItem from "./components/CartItem";
import "./index.css";

// نمونه آیتم‌های منو
const menuItems = [
  { id: 1, name: "Чикен Терияки", description: "Куриные полоски с терияки соусом.", price: 420 },
  { id: 2, name: "Итальянский B.M.T.", description: "Салями, пепперони и ветчина.", price: 480 },
  { id: 3, name: "Тунец Классик", description: "Тунец с овощами и соусом.", price: 390 },
];

function App() {
  // 💡 دارک مود
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 🛒 مدیریت سبد خرید
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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-[#fffbe6] dark:bg-gray-900 dark:text-white transition duration-300">

      {/* 🌙 دکمه دارک مود */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 bg-[#008C45] text-white px-4 py-2 rounded shadow hover:bg-green-800 transition"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
      <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 text-center mt-20">
        Subway Menu 🥪
      </h1>
      <div className="bg-white dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 max-w-6xl w-full">
        <Header />
        <main className="grid md:grid-cols-2 gap-10">

          {/* منو غذا */}
          <section>
            <h2 className="text-xl font-bold text-[#008C45] dark:text-yellow-300 mb-4">Меню</h2>
            <div className="grid gap-6">
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} onAdd={addToCart} />
              ))}
            </div>
          </section>

          {/* سبد خرید */}
          <section>
            <h2 className="text-xl font-bold text-[#008C45] dark:text-yellow-300 mb-4">Корзина</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">Корзина пуста 🛒</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} onRemove={removeFromCart} />
                ))}
              </ul>
            )}

            {/* ✅ جمع کل */}
            {cart.length > 0 && (
              <div className="mt-4 text-right space-y-1 text-[#008C45] font-semibold">
                <p>🛒 Всего: {totalCount} товаров</p>
                <p>💸 Итого: {totalPrice}₽</p>
              </div>
            )}

            {/* دکمه ارسال سفارش */}
            <button
              onClick={submitOrder}
              className="mt-8 w-full bg-[#FFC72C] text-[#008C45] font-bold py-3 rounded-full shadow-md hover:shadow-lg hover:bg-[#e6b92c] transition duration-300"
            >
              Оформить заказ
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
