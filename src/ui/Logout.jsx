import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "../hooks/useLogout";
import ButtonIcon from "../ui/ButtonIcon";
import Spinner from "../ui/Spinner";

function Logout() {
  const { logout, isLoggingout } = useLogout();
  return (
    <ButtonIcon disabled={isLoggingout} onClick={logout}>
      {!isLoggingout ? <HiArrowRightOnRectangle /> : <Spinner />}
    </ButtonIcon>
  );
}

export default Logout;
