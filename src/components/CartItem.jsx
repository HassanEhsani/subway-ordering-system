export default function CartItem({ item, onRemove }) {
  return (
    <li className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-[#008C45]">{item.name}</h3>
        <p className="text-gray-600">Кол-во: {item.quantity}</p>
        <p className="text-gray-800 font-bold">{item.price * item.quantity}₽</p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 font-bold text-xl"
      >
        ✕
      </button>
    </li>

  );
}
