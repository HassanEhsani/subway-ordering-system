export default function MenuItem({ item, onAdd }) {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300">
      <h3 className="text-lg font-extrabold text-[#008C45]">{item.name}</h3>
      <p className="text-gray-700 mt-1">{item.description}</p>
      <div className="flex items-center justify-between mt-5">
        <span className="text-[#FFC72C] font-extrabold text-lg">
          {item.price.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </span>
        <button
          className="bg-[#008C45] text-[#FFF7C2] px-5 py-2 rounded-full hover:bg-[#006833] transition"
          onClick={() => onAdd(item)}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
