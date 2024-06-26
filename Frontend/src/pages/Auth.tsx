import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "../components/ui/SignIn";
import SignUp from "../components/ui/SignUp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="h-[calc(100vh-5.1rem)] w-full  flex items-center justify-center relative z-10">
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">SignIn</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <SignIn />
        <SignUp />
      </Tabs>
    </div>
  );
};

export default Auth;
