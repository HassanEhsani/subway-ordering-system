export default function CartItem({ item, onRemove }) {
  return (
    <li className="bg-white p-4 rounded-2xl shadow-md flex justify-between items-center border border-[#FFC72C]">
      <div>
        <span className="font-semibold text-[#008C45]">{item.name}</span> x{" "}
        <span>{item.quantity}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[#FFC72C] font-bold">
          {(item.price * item.quantity).toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          className="text-[#FF4B4B] hover:text-[#D12D2D] text-lg"
          aria-label="Remove item"
        >
          ❌
        </button>
      </div>
    </li>
  );
}
