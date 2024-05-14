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
      const resonse = await axios.post(
        "https://biturl.debajit.workers.dev/url",
        {
          url: longurl,
        }
      );

      setshortUrlId(resonse.data.id);
      setIsLoading(false);
      if (resonse.data.message) {
        toast(`${resonse.data.message.toUpperCase()}`);
      }
    } catch (error) {
      toast(`There some error maybe incorrect Input ${error}`);
      setIsLoading(false);
    }
  };
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full bg-slate-300 flex items-center justify-center">
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
            <Button onClick={handleShortUrl}>Generate</Button>
          )}
        </div>

        {shortUrlId && (
          <div className="p-3 border-slate-200 border rounded flex items-center justify-center gap-5 mb-2">
            <a
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
        )}
      </Card>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Home;
