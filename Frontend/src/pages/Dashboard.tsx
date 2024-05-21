import axios from "axios";
import { useEffect, useState } from "react";
import UrlGenerator from "../components/ui/UrlGenerator";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LinkCard from "../components/ui/LinkCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster, toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UrlType {
  shortId: string;
  redirectURL: string;
}

interface UserType {
  id: number;
  username: string;
  email: string;
  url: UrlType[]; // Assuming `url` is an array of `UrlType`
  // Add other properties if necessary
}

interface DataType {
  user: UserType;
}

const Dashboard = () => {
  const [data, setData] = useState<DataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const response = await axios.get(
      `https://biturl.debajit.workers.dev/user`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setData(response.data);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserInfo().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <div className="h-[calc(100vh-5rem)] flex flex-col items-center justify-around">
        <UrlGenerator getUserInfo={getUserInfo} />

        <ScrollArea className="h-auto max-h-[500px] w-full max-w-[100%] sm:max-w-[500px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-5 m-4 sm:m-6 my-5 sm:my-10">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-5 border  rounded-lg"
                  >
                    <Skeleton className="h-12 w-12 rounded-full bg-slate-400" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] bg-slate-400" />
                      <Skeleton className="h-4 w-[200px] bg-slate-400" />
                    </div>
                  </div>
                ))
              : data?.user?.url?.map((url: any, index: number) => (
                  <LinkCard key={index} url={url} />
                ))}
          </div>
        </ScrollArea>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default Dashboard;
