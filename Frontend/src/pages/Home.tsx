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

const Home = () => {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);
  const [longurl, setLongUrl] = useState("");
  const [shortUrlId, setshortUrlId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShortUrl = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://biturl.debajit.workers.dev/url",
        {
          url: longurl,
        }
      );

      setshortUrlId(response.data.url);
      setIsLoading(false);
      if (response.data.message) {
        toast(`${response.data.message.toUpperCase()}`);
      }
    } catch (error) {
      toast(`There some error maybe incorrect Input ${error}`);
      setIsLoading(false);
    }
  };
  return (
    <div className="h-[calc(100vh-5.1rem)] w-full bg-slate-300 flex items-center justify-center">
      <Dialog>
        <Card className="p-6 flex flex-col justify-center items-center gap-[1rem] w-[450px]">
          <img src="./logo.jpg" className="w-[120px]" />
          <p className="text-[1rem] font-[400] text-slate-500">
            Short Links With Ease
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="https://anything.url"
              onChange={(e: any) => setLongUrl(e.target.value)}
            />
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
          <DialogContent className="w-[90%] sm:w-auto px-[1rem] py-6 md:p-6 rounded-lg">
            <DialogHeader className="flex flex-col gap-5">
              {shortUrlId && <DialogTitle>Your Short URL</DialogTitle>}
              <DialogDescription>
                <div className="px-[0.25rem] py-3 sm:p-3 border-slate-200 border rounded flex items-center justify-center gap-3 sm:gap-5 mb-2">
                  <a
                    target="_blank"
                    href={`https://biturl.debajit.workers.dev/url/${shortUrlId}`}
                    className="hover:underline"
                  >{`https://biturl.debajit.workers.dev/url/${shortUrlId}`}</a>

                  <MdContentCopy
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://biturl.debajit.workers.dev/url/${shortUrlId}`
                      )
                    }
                    className=" cursor-pointer hover:[transform:scale(1.2)] ease-in-out duration-300 text-slate-500"
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
        <Toaster position="bottom-right" />
      </Dialog>
    </div>
  );
};

export default Home;
