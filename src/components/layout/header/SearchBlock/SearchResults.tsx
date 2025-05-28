import Link from "next/link";

interface SearchResultsProps {
  results: { id: number; name: string }[];
  onResultClick: () => void;
}

export const SearchResults = ({ results, onResultClick }: SearchResultsProps) => {
  return (
    results.length > 0 && (
      <ul className="absolute left-0 z-40 w-full mt-1 overflow-y-auto bg-white rounded-lg shadow-lg top-full max-h-60">
        {results.map((item) => (
          <li key={item.id} className="p-2 cursor-pointer hover:bg-gray-100">
            <Link
              href={`/product/${item.name}/${item.id}`}
              onClick={onResultClick}
              className="block w-full h-full"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    )
  );
};
