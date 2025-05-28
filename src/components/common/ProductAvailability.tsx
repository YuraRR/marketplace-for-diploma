import { faCheckCircle, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProductAvailability = ({ availability }: { availability: string }) => {
  return (
    <span className="flex items-center gap-2 mt-2 ">
      <FontAwesomeIcon
        icon={availability == "В наявності" ? faCheckCircle : faCircleExclamation}
        className={`size-4 w-4 h-4  ${availability == "В наявності" ? "text-green-500" : "text-gray-500"}`}
      />
      <p className="text-sm">{availability}</p>
    </span>
  );
};
