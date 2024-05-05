import axios from "axios";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

const App = () => {
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
      <div className=" w-[600px] h-auto bg-white rounded-2xl p-6 flex flex-col justify-center items-center gap-[1rem]">
        <h1 className="text-black font-[500] text-[2.5rem]">Biturl 🔗</h1>
        <p className="text-[1.2rem] font-[400] text-slate-500">
          Short Links With Ease
        </p>
        <div className="flex items-center justify-center gap-2 w-[70%]">
          <input
            type="text"
            placeholder="https://anything.url"
            onChange={(e) => setLongUrl(e.target.value)}
            className="border-slste-200 w-full px-2 py-2 border rounded outline-none"
          />
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={handleShortUrl}
          >
            Generate
          </button>
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
      </div>
    </div>
  );
};

export default App;
