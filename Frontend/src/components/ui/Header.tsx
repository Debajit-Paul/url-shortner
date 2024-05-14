import { Button } from "./button";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
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
    <div className="w-full mx-auto px-[2rem] flex h-[3.5rem] max-w-screen-2xl items-center justify-between">
      <Link to={"/"}>
        <img src="./logo.jpg" className="w-[80px]" />
      </Link>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="rounded-full h-9 w-9 bg-black flex items-center justify-center text-l text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="gap-1 cursor-pointer"
              onClick={() => {
                dispatch(userLogOut());
                localStorage.setItem("token", "");
              }}
            >
              Log Out <ArrowUpRight className="mr-2 h-4 w-4" />
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
