import { useUser } from "../../Features/Authentication/useUser";

export function UserAvatar() {
  const { user, isLoading } = useUser();
  const { full_name, profile_picture } = user?.user_metadata || {};
  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }
  if (!profile_picture) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">{full_name?.[0]?.toUpperCase()}</p>
      </div>
    );
  }
  return (
    <img
      src={profile_picture}
      alt="User Avatar"
      className="w-10 h-10 rounded-full"
    />
  );
}
