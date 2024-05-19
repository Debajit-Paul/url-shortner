import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignalMedium } from "lucide-react";
import { MdContentCopy } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LinkCard = ({ url }: any) => {
  return (
    <Card className="p-6 flex items-center justify-between w-[450px] hover:shadow-lg hover:drop-shadow-lg hover:shadow-[#ffd700cc] hover:border-[#f5b24e] ease-in-out duration-500">
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
              biturl.debajit.workers.dev/url/${url.shortId}
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
  );
};

export default LinkCard;
