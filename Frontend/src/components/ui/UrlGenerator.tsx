import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Settings } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdContentCopy } from "react-icons/md";

const UrlGenerator = ({ getUserInfo }: any) => {
  const [longurl, setLongUrl] = useState("");
  const [shortUrlId, setshortUrlId] = useState("");
  const [customId, setCustomId] = useState("");
  const [customeUrl, setCustomeUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShortUrl = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://biturl.debajit.workers.dev/user",
        {
          url: longurl,
          customId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setshortUrlId(response.data.url);
      setIsLoading(false);
      if (response.data.message) {
        toast(`${response.data.message.toUpperCase()}`);
      }
      getUserInfo();
    } catch (error) {
      toast(`${error}`);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <Card className="p-4 md:p-6 flex flex-col justify-center items-center gap-[1rem] w-[90%] sm:w-[450px] h-auto my-[20px]">
          <Input
            type="text"
            placeholder="https://anything.url"
            onChange={(e: any) => setLongUrl(e.target.value)}
          />
          <Button
            variant="outline"
            className=" group flex items-center gap-3 w-[120px]"
            onClick={() => setCustomeUrl(!customeUrl)}
          >
            <Settings className="rotate-0 group-hover:rotate-180 duration-700 ease-in-out" />
            Custome
          </Button>
          {customeUrl && (
            <div className="flex items-center gap-3 h-8 duration-700 ease-in-out">
              <div className="flex h-10 w-[70%] md:w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-500 select-none">
                biturl.debajit.workers.dev/url
              </div>
              <p className="text-[20px]">/</p>
              <Input
                type="text"
                placeholder="resume"
                onChange={(e: any) => setCustomId(e.target.value)}
                className="w-[35%] md:w-[30%]"
              />
            </div>
          )}
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-full animate-spin" />
              Loading
            </Button>
          ) : (
            <DialogTrigger className="w-full">
              <Button onClick={handleShortUrl}>Generate</Button>
            </DialogTrigger>
          )}
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
      </Dialog>
    </>
  );
};

export default UrlGenerator;
