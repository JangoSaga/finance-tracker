import { useLogout } from "../Features/Authentication/useLogout";
import Loading from "./Loading";

function Logout() {
  const { logout, isLoading } = useLogout();

  if (isLoading) return <Loading />;
  return (
    <button onClick={logout} disabled={isLoading}>
      <p>Logout</p>
    </button>
  );
}

export default Logout;
