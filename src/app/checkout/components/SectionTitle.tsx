import { faCheck, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Section = {
  id: string;
  title: string;
  fields: string[];
  icon: IconDefinition;
};

export const SectionTitle = ({ section, form }: { section: Section; form: any }) => {
  const formValues = form.watch();
  const isSectionComplete = (fields: string[]) =>
    fields.every((field) => {
      const value = formValues[field];
      return value && value.trim().length > 0;
    });
  return (
    <h2 className="flex items-center gap-2 font-bold ">
      <FontAwesomeIcon
        icon={isSectionComplete(section.fields) ? faCheck : section.icon}
        className="w-3 !h-3 p-1 text-xs text-white rounded-full bg-light-green"
      />
      {section.title}
    </h2>
  );
};
