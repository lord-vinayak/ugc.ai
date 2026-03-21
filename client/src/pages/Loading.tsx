import { useEffect } from "react";
import { Spinner } from "../components/ui/spinner";

const Loading = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-center flex-1">
        <Spinner className="size-7 text-indigo-400" />
      </div>
    </div>
  );
};

export default Loading;
