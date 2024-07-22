import { MdContentCopy } from "react-icons/md";
import { ImStopwatch } from "react-icons/im";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface tempUrl {
  redirectURL: string;
  shortId: string;
}

interface urlProp {
  url: tempUrl;
}

const TempLinkCard = ({ url }: urlProp) => {
  return (
    <div className="p-3 px-8 border-slate-200 border rounded flex items-center justify-between gap-5 mb-2 text-sm w-full relative">
      <Avatar className="h-[35px] sm:h-[50px] w-[35px] sm:w-[50px]">
        <AvatarImage
          src="https://images.wondershare.com/mockitt/tips/gradient-01.jpg"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <a
          target="_blank"
          className="w-[150px] sm:w-[220px] text-[13px] sm:text-[15px] truncate font-[500] hover:underline"
          href={`https://biturl.debajit.workers.dev/url/${url.shortId}`}
        >
          biturl.debajit.workers.dev/url/{url.shortId}
        </a>

        <a
          target="_blank"
          className="w-[160px] sm:w-[180px] text-[11px] sm:text-[12px] truncate hover:underline"
          href={`${url.redirectURL}`}
        >
          {url.redirectURL}
        </a>
      </div>
      <MdContentCopy
        onClick={() =>
          navigator.clipboard.writeText(
            `https://biturl.debajit.workers.dev/url/${url.shortId}`
          )
        }
        className=" cursor-pointer hover:[transform:scale(1.2)] ease-in-out duration-300 text-slate-500"
      />
      <TooltipProvider>
        <Tooltip>
          <Badge
            variant="outline"
            className="absolute right-2 top-[-10px] bg-white cursor-pointer"
          >
            <TooltipTrigger asChild>
              <span className="flex items-center gap-2">
                <ImStopwatch />
                Expires In 1 Day
              </span>
            </TooltipTrigger>
          </Badge>

          <TooltipContent>
            <div className="flex flex-col gap-4 p-4">
              <p className="text-center w-[250px]">
                To prevent abuse, we automatically delete unclaimed links after
                1 day. To claim a link, simply sign up for a free account.
              </p>
              <Link to={"/auth"}>
                <Button className="w-full hover:bg-white hover:border hover:text-black hover:border-black">
                  Create your free account
                </Button>
              </Link>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TempLinkCard;
