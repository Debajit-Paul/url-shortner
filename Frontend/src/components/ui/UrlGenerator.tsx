import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Settings } from "lucide-react";
import axios from "axios";

const UrlGenerator = ({ getUserInfo }: any) => {
  const [longurl, setLongUrl] = useState("");
  const [customId, setCustomId] = useState("");
  const [customeUrl, setCustomeUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShortUrl = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        "http://localhost:8787/user",
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
      setIsLoading(false);
      getUserInfo();
    } catch (error) {
      //   toast(`There some error maybe incorrect Input ${error}`);
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 flex flex-col justify-center items-center gap-[1rem] w-[450px]">
      <Input
        type="text"
        placeholder="https://anything.url"
        onChange={(e: any) => setLongUrl(e.target.value)}
      />
      <div
        className=" group flex items-center gap-3 h-10 w-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-500 cursor-pointer"
        onClick={() => setCustomeUrl(!customeUrl)}
      >
        <Settings className="rotate-0 group-hover:rotate-180 duration-700 ease-in-out" />
        Custome
      </div>
      {customeUrl && (
        <div className="flex items-center gap-3 h-8 duration-700 ease-in-out">
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-500 select-none">
            https://biturl.debajit.workers.dev/url
          </div>
          <p className="text-[20px]">/</p>
          <Input
            type="text"
            placeholder="resume"
            onChange={(e: any) => setCustomId(e.target.value)}
            className="w-[30%]"
          />
        </div>
      )}
      {isLoading ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-full animate-spin" />
          Loading
        </Button>
      ) : (
        <Button onClick={handleShortUrl} className="w-full">
          Generate
        </Button>
      )}
    </Card>
  );
};

export default UrlGenerator;
