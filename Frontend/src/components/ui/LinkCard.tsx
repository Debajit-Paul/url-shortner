import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignalMedium } from "lucide-react";
import { MdContentCopy } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LinkCard = ({ url }: any) => {
  return (
    <a
      target="_blank"
      href={`https://biturl.debajit.workers.dev/url/${url.shortId}`}
      className="flex items-center justify-center"
    >
      <Card className="p-5 sm:p-6 flex items-center justify-between w-[100%] sm:w-[450px] hover:shadow-lg hover:drop-shadow-lg hover:shadow-[#ffd700cc] hover:border-[#f5b24e] ease-in-out duration-500 gap-[10px]">
        <div className="flex items-center gap-2">
          <Avatar className="h-[35px] sm:h-[50px] w-[35px] sm:w-[50px]">
            <AvatarImage
              src="https://images.wondershare.com/mockitt/tips/gradient-01.jpg"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <a
                target="_blank"
                className="w-[150px] sm:w-[220px] text-[13px] sm:text-[15px] truncate font-[500] hover:underline"
                href={`https://biturl.debajit.workers.dev/url/${url.shortId}`}
              >
                biturl.debajit.workers.dev/url/{url.shortId}
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
              target="_blank"
              className="w-[160px] sm:w-[180px] text-[11px] sm:text-[12px] truncate hover:underline"
              href={`${url.redirectURL}`}
            >
              {url.redirectURL}
            </a>
          </div>
        </div>

        <Badge
          variant="outline"
          className="flex items-center text-[11px] text-slate-500 py-2 cursor-pointer w-[75px] sm:w-auto h-[25px] sm:h-auto"
        >
          {<SignalMedium className="mt-[-6px] w-[16px] sm:w-[20px]" />}{" "}
          {url.clickHistory.length} clicks
        </Badge>
      </Card>
    </a>
  );
};

export default LinkCard;
