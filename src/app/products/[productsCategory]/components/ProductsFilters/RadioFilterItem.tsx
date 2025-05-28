// Компонент для радиокнопок (category)
export const RadioFilterItem = ({
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
    <input type="radio" id={id} name="category" checked={checked} onChange={onChange} className="hidden" />
    <label
      htmlFor={id}
      className={`cursor-pointer px-3 py-1 rounded-lg text-sm transition-colors ${
        checked ? "bg-light-green text-white" : " text-black hover:bg-gray-300"
      }`}
    >
      {label}
    </label>
  </div>
);
