import { Button } from "./button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userLogOut } from "../../redux/feature/userSlice";

const Header = () => {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="mx-auto max-w-[1440px] flex items-center justify-between border-b-2 p-3 sm:p-5 relative z-10">
      <Link to={"/"}>
        <img src="./logo.png" className="w-[80px]" />
      </Link>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="rounded-full h-9 w-9 bg-black flex items-center justify-center text-l text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex items-center justify-center">
            <DropdownMenuItem
              className="gap-1 cursor-pointer"
              onClick={() => {
                dispatch(userLogOut());
                localStorage.setItem("token", "");
              }}
            >
              Log Out <ArrowUpRight className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to={"/auth"}>
          <Button>SignIn</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
