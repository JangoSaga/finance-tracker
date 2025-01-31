import { useState } from "react";
import { useUser } from "../Features/Authentication/useUser";
import { ProfileUpdate } from "../components/User/ProfileUpdate";
import Loading from "../components/Loading";

function Profile() {
  const { user, isLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <Loading />;

  const { full_name, account_created, profile_picture } = user.user_metadata;
  console.log(user);
  console.log(account_created);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex md:flex-row flex-col space-x-4 md:space-y-4 mb-2 items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full  flex items-center justify-center overflow-hidden">
            {profile_picture ? (
              <img
                src={profile_picture}
                alt={full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl text-gray-600">
                {full_name?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{full_name}</h2>
            <p className="text-gray-600">
              Member since {new Date(account_created).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex flex-col justify-between">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
          {isEditing && (
            <>
              <ProfileUpdate cancel={() => setIsEditing(false)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
