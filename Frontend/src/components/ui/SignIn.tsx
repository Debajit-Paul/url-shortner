import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogIn } from "../../redux/feature/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { BASE_URL } from "@/config";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  type signInSubmitType = {
    email: string;
    password: string;
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<signInSubmitType>();
  const SignInSubmitHandler: SubmitHandler<signInSubmitType> = async ({
    email,
    password,
  }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/user/me/signin`, {
        email,
        password,
      });
      setIsLoading(false);
      localStorage.setItem("token", response.data.token);
      dispatch(userLogIn(response.data.payload));
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <TabsContent value="signin">
      <Card>
        <CardHeader>
          <CardTitle>SignIn</CardTitle>
          <CardDescription>SignIn to Your Account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(SignInSubmitHandler)}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="someone@gmail.com"
                {...register("email", {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
              {errors.email ? (
                <p className="text-red-600">
                  {" "}
                  {errors.email.type === "pattern"
                    ? "Email is not valid"
                    : "Email is required"}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password ? (
                <p className="text-red-600">
                  {errors.password.type === "minLength"
                    ? "Password should be more than 7"
                    : "Password is required"}
                </p>
              ) : (
                ""
              )}
            </div>
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 animate-spin" />
                Loading
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                SignIn
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default SignIn;
