import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Profile } from "@/types/database.types";

export function ContactSummary({ profile, onEdit }: { profile: Partial<Profile>; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
      <div className="space-y-1">
        <p className="font-medium">
          {profile.first_name} {profile.last_name}
        </p>
        <p className="text-sm text-gray-600">{profile.phone}</p>
        {profile.email && <p className="text-sm text-gray-600">{profile.email}</p>}
      </div>
      <FontAwesomeIcon icon={faPen} className="mb-auto text-lg cursor-pointer size-4" onClick={onEdit} />
    </div>
  );
}
