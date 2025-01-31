import { UserAvatar } from "./UserAvatar";
import { useUser } from "../../Features/Authentication/useUser";
import Logout from "../Logout";
import { Link } from "react-router";

const Stl = {
  container: "flex flex-row items-center gap-2",
  profile:
    "flex flex-row items-center gap-2 focus:text-green-500 focus:border-green-500 transition-all duration-300 rounded-xl p-2 border-2 border-gray-700",
  logout:
    "flex flex-row items-center gap-2 focus:text-red-500 focus:border-red-500 transition-all duration-300 rounded-xl p-4 border-2 border-gray-700",
};

function ProfileButton() {
  const { user, isLoading } = useUser();
  const { full_name } = user?.user_metadata || {};
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={Stl.container}>
      <Link to="/profile" className={Stl.profile}>
        <UserAvatar />
        <p>{full_name}</p>
      </Link>
      <div className={Stl.logout}>
        <Logout />
      </div>
    </div>
  );
}

export default ProfileButton;
