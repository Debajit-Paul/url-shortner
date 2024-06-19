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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  type signUpSubmitType = {
    username: string;
    email: string;
    password: string;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<signUpSubmitType>();

  const SignUpSubmitHandler: SubmitHandler<signUpSubmitType> = async ({
    username,
    email,
    password,
  }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/user/me/signup`, {
        username,
        email,
        password,
      });
      setIsLoading(false);
      console.log(response.data);
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <TabsContent value="signup">
      <Card>
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>Let's create a new account for you</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(SignUpSubmitHandler)}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="type"
                placeholder="some_one"
                {...register("username", {
                  required: true,
                })}
              />
            </div>
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
                SignUp
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default SignUp;
