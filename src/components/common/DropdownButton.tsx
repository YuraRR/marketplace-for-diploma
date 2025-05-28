import { Button } from "@/components/ui/button";
import { faChevronDown, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface DropdownButtonProps extends React.HTMLProps<HTMLDivElement> {
  item: {
    name: string;
    subMenu: { href: string; name: string }[];
  };
  className?: string;
  isFocused: boolean;
  setIsFocused: (value: boolean) => void;
  closeBackdrop: () => void;
}

export const DropdownButton = ({
  item,
  isFocused,
  setIsFocused,
  closeBackdrop,
  ...props
}: DropdownButtonProps) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    if (item.subMenu.length > 0) {
      e.preventDefault();
    }
  };

  return (
    <div {...props} className="relative border border-white rounded-lg">
      <Button
        color="darkGray"
        onClick={handleButtonClick}
        size={"sm"}
        className="flex items-center font-bold uppercase"
      >
        <FontAwesomeIcon icon={faShoppingBasket} />
        <span className="whitespace-nowrap">{item.name}</span>
        {item.subMenu.length > 0 && (
          <span className={`ml-2 transition-transform ${isFocused ? "rotate-180" : ""}`}>
            <FontAwesomeIcon icon={faChevronDown} className="size-3" />
          </span>
        )}
      </Button>

      {item.subMenu.length > 0 && isFocused && (
        <ul className="absolute z-50 mt-1 text-gray-800 bg-white rounded-md shadow-lg -left-1">
          {item.subMenu.map((subItem, subIndex) => (
            <li key={subIndex}>
              <Link
                href={subItem.href}
                className="block px-3 py-1.5 w-36 text-center rounded-md hover:bg-gray-100"
              >
                {subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
