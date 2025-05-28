// Компонент для фильтров с чекбоксами (brands, sellers, colors, memory)
export const FilterItem = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex items-center mb-1">
    <input type="checkbox" id={id} checked={checked} onChange={onChange} className="hidden" />
    <label
      htmlFor={id}
      className={`cursor-pointer px-3 py-1 rounded-lg text-sm transition-colors ${
        checked ? "bg-light-green text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </label>
  </div>
);
