import { logout } from "@/actions/auth";
import { CiLogout } from "react-icons/ci";

export default function Logout() {
  return (
    <form action={logout}>
      <div className="tooltip" data-tip="Logout">
        <button>
          <CiLogout size={"1.5rem"} />
        </button>
      </div>
    </form>
  );
}
