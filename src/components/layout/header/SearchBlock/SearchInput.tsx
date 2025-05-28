import { Button } from "@/components/ui/button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import nProgress from "nprogress";
import { useEffect } from "react";

interface SearchInputProps {
  query: string;
  setQuery: (value: string) => void;
  handleSearch: (value: string) => void;
  handleSubmit: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  isLoading: boolean;
  isFocused: boolean;
  setIsFocused: (value: boolean) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({
  query,
  setQuery,
  handleSearch,
  handleSubmit,
  isLoading,
  handleFocus,
}: SearchInputProps) => {
  useEffect(() => {
    isLoading ? nProgress.start() : nProgress.done();
  }, [isLoading]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <div className="relative flex items-center w-full pl-3 bg-light-gray-bg shadow-md rounded-lg max-h-[40px] max-w-[540px]">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute text-gray-400 -translate-y-1/2 size-4 left-3 top-1/2"
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          onFocus={handleFocus}
          placeholder="Я шукаю..."
          className="ml-6 w-full bg-light-gray-bg max-w-[360px] border-none focus:outline-none focus:ring-0"
        />
      </form>

      <Button color="green" size={"sm"} onClick={handleSubmit} className="text-white text-md">
        Знайти
      </Button>
    </div>
  );
};
