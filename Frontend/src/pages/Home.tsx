import axios from "axios";
import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BASE_URL } from "@/config";
import LinkCard from "@/components/ui/LinkCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);
  const [longurl, setLongUrl] = useState("");
  const [shortUrlId, setshortUrlId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleShortUrl = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/url`, {
        url: longurl,
      });

      setshortUrlId((preShortUrlId) => [...preShortUrlId, response.data]);
      setIsLoading(false);
      if (response.data.message) {
        toast(`${response.data.message.toUpperCase()}`);
      }
    } catch (error) {
      toast(`There some error maybe incorrect Input ${error}`);
      setIsLoading(false);
    }
  };

  console.log(shortUrlId);

  return (
    <div className="h-[calc(100vh-5.1rem)] w-full flex flex-col gap-5 items-center justify-center relative overflow-hidden z-10">
      <Dialog>
        <Card className="opacity-100 p-6 flex flex-col justify-center items-center gap-[1rem] w-[450px] relative z-10">
          <img src="./logo.jpg" className="w-[120px]" />
          <p className="text-[1rem] font-[400] text-slate-500">
            Short Links With Ease
          </p>
          <div className="flex w-full max-w-sm items-center justify-center space-x-2">
            {shortUrlId.length === 3 ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-3 py-2 border-slate-200 border rounded flex gap-5 text-sm text-slate-400 w-full cursor-pointer">
                      Shorten your link
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col gap-4 p-4">
                      <p className="text-center w-[250px]">
                        Maximum number of links reached. Create a free account
                        to create more links.
                      </p>
                      <Link to={"/auth"}>
                        <Button className="w-full hover:bg-white hover:border hover:text-black hover:border-black">
                          Start for free
                        </Button>
                      </Link>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Input
                type="text"
                placeholder="https://anything.url"
                onChange={(e: any) => setLongUrl(e.target.value)}
              />
            )}
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </Button>
            ) : (
              <DialogTrigger>
                <Button onClick={handleShortUrl}>Generate</Button>
              </DialogTrigger>
            )}
          </div>
        </Card>

        {isLoading ? null : (
          <DialogContent className="w-[90%] sm:w-auto px-[1rem] py-6 md:p-6 rounded-lg relative z-10">
            <DialogHeader className="flex flex-col gap-5">
              {shortUrlId && <DialogTitle>Your Short URL</DialogTitle>}
              <DialogDescription>
                <div className="px-[0.25rem] py-3 sm:p-3 border-slate-200 border rounded flex items-center justify-center gap-3 sm:gap-5 mb-2">
                  <a
                    target="_blank"
                    href={`https://biturl.debajit.workers.dev/url/${
                      shortUrlId[shortUrlId.length - 1]?.shortId
                    }`}
                    className="hover:underline"
                  >{`https://biturl.debajit.workers.dev/url/${
                    shortUrlId[shortUrlId.length - 1]?.shortId
                  }`}</a>

                  <MdContentCopy
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://biturl.debajit.workers.dev/url/${
                          shortUrlId[shortUrlId.length - 1]?.shortId
                        }`
                      )
                    }
                    className=" cursor-pointer hover:[transform:scale(1.2)] ease-in-out duration-300 text-slate-500"
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}

        {shortUrlId.length > 0 ? (
          <Card className="p-6 flex flex-col justify-center items-center gap-[1rem] w-[450px] relative z-10">
            {shortUrlId.map((url, index) => (
              <div
                className="p-3 px-8 border-slate-200 border rounded flex items-center justify-between gap-5 mb-2 text-sm w-full"
                key={index}
              >
                <a
                  target="_blank"
                  href={`https://biturl.debajit.workers.dev/url/${url.shortId}`}
                >{`https://biturl.debajit.workers.dev/url/${url.shortId}`}</a>

                <MdContentCopy
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://biturl.debajit.workers.dev/url/${url.shortId}`
                    )
                  }
                  className=" cursor-pointer hover:[transform:scale(1.2)] ease-in-out duration-300 text-slate-500"
                />
              </div>
            ))}
          </Card>
        ) : null}
        <Toaster position="bottom-right" className="relative z-10" />
      </Dialog>
    </div>
  );
};

export default Home;
