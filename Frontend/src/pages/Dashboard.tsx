import axios from "axios";
import { useEffect, useState } from "react";
import UrlGenerator from "../components/ui/UrlGenerator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignalMedium } from "lucide-react";
import { MdContentCopy } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const response = await axios.get(`http://localhost:8787/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col items-center justify-around">
      <UrlGenerator getUserInfo={getUserInfo} />
      <div className="grid grid-col-1 md:grid-cols-2 gap-5 mt-10">
        {data?.user?.url?.map((url) => (
          <Card className="p-6 flex items-center justify-between w-[450px]">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://images.wondershare.com/mockitt/tips/gradient-01.jpg"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <a
                    className="w-[220px] text-[15px] truncate font-[500] hover:underline"
                    href={`https://biturl.debajit.workers.dev/url/${url.shortId}`}
                  >
                    https://biturl.debajit.workers.dev/url/${url.shortId}
                  </a>

                  <MdContentCopy
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://biturl.debajit.workers.dev/url/${url.shortId}`
                      )
                    }
                    className=" cursor-pointer hover:[transform:scale(1.2)] ease-in-out duration-300 text-slate-500"
                  />
                </div>
                <a
                  className="w-[180px] text-[12px] truncate hover:underline"
                  href={`${url.redirectURL}`}
                >
                  {url.redirectURL}
                </a>
              </div>
            </div>
            <Badge
              variant="outline"
              className="flex text-slate-500 py-1 cursor-pointer"
            >
              {<SignalMedium className="mt-[-5px]" />} {url.clickHistory.length}{" "}
              clicks
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
