import { useState } from "react";
import { menuItems } from "./menuData";
import { translations } from "./translations";

function App() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        // اگر آیتم هست، تعداد رو افزایش بده
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // آیتم جدید اضافه کن با تعداد 1
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  function handleRemoveFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }
  function handleSubmitOrder() {
    if (cart.length === 0) {
      alert("Корзина пуста!");
      return;
    }

    let summary = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ${(item.quantity * item.price).toLocaleString(
            "ru-RU",
            { style: "currency", currency: "RUB" }
          )}`
      )
      .join("\n");

    alert("Ваш заказ:\n\n" + summary + "\n\nСпасибо за покупку!");
    setCart([]); // خالی کردن سبد بعد از سفارش
  }


  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <h1 className="text-4xl font-bold text-green-700 text-center mb-6">
        {translations.heading}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md p-4 rounded-xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="font-bold text-green-700">
                {item.price.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                })}
              </p>

              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => handleAddToCart(item)}
              >
                {translations.addToCart}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {translations.yourCart}
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">{translations.emptyCart}</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white p-3 rounded mb-2 shadow"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} ×{" "}
                    {item.price.toLocaleString("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                    })}
                  </p>
                </div>
                <button
                  className="text-red-600 font-bold"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

        )}
      </div>
      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={handleSubmitOrder}>
        Оформить заказ
      </button>
    </div>
  );
}

export default App;
