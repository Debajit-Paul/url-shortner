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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import TempLinkCard from "@/components/TempLinkCard";

interface shortUrlProp {
  id: number;
  message?: string;
  redirectURL: string;
  shortId: string;
}

const Home = () => {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);
  const [longurl, setLongUrl] = useState("");
  const [shortUrlId, setshortUrlId] = useState<shortUrlProp[]>([]);
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
    <div className="h-[calc(100vh-5.1rem)] w-full flex flex-col gap-5 items-center relative overflow-hidden z-10">
      <Dialog>
        <div className="p-6 flex flex-col justify-center items-center gap-[1rem] ">
          <h2 className="mt-5 font-display text-4xl text-center font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
            Short Links With <br />
            <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
              Superpowers
            </span>
          </h2>
          <img src="./logo.png" className="w-[120px]" />
          <h2 className="sm:text-xl text-gray-600 mt-5">
            Short Links With Ease
          </h2>
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
        </div>

        {isLoading ? null : (
          <DialogContent className="w-[90%] sm:w-auto px-[1rem] py-6 md:p-6 rounded-lg">
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
          <Card className="p-6 flex flex-col justify-center items-center gap-[1rem] w-[450px] relative z-10 mt-8">
            {shortUrlId.map((url, index) => (
              <TempLinkCard key={index} url={url} />
            ))}
          </Card>
        ) : null}
        <Toaster position="bottom-right" />
      </Dialog>
    </div>
  );
};

export default Home;
