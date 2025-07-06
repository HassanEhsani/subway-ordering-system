import React from "react";

function MenuItem({ item, onAdd }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <img
                src={`/src/assets/${item.image}`}
                alt={item.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-[#008C45]">{item.name}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold text-[#008C45]">{item.name}</h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <p className="mt-2 text-lg font-bold text-[#333]">{item.price}₽</p>
                    <button
                        onClick={() => onAdd(item)}
                        className="mt-4 bg-[#FFC72C] text-[#008C45] font-bold px-6 py-3 rounded-full hover:bg-[#e6b92c] transition"
                    >
                        Добавить
                    </button>
                </div>

            </div>
        </div>
    );
}

export default MenuItem;
