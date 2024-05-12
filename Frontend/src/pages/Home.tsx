import axios from "axios";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const [longurl, setLongUrl] = useState("");
  const [shortUrlId, setshortUrlId] = useState("");
  console.log(longurl);
  const handleShortUrl = async () => {
    try {
      const resonse = await axios.post(
        "https://biturl.debajit.workers.dev/url",
        {
          url: longurl,
        }
      );

      setshortUrlId(resonse.data.id);
      if (resonse.data.message) {
        alert(`${resonse.data.message}`);
      }
    } catch (error) {
      alert(`There some error maybe incorrect Input ${error}`);
    }
  };
  return (
    <div className="h-screen w-full bg-slate-300 flex items-center justify-center">
      <Card className="p-6 flex flex-col justify-center items-center gap-[1rem]">
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
          <Button onClick={handleShortUrl}>Generate</Button>
        </div>

        {shortUrlId && (
          <div className="p-3 border-slate-200 border rounded flex items-center justify-center gap-5 mb-2">
            <a
              href={`https://biturl.debajit.workers.dev/url/${shortUrlId}`}
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
    </div>
  );
};

export default Home;
