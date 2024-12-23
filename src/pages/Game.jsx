import { useContext, useEffect } from "react";
import { Context } from "../Context";
import Board from "../components/Game/Board";
import { formatDuration } from "../utils/string";

export const Game = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "INCREMENT_TIME" });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="border border-black w-screen h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="text-xl font-semibold">
        <span className="text-blue-500">Time:&nbsp;</span>
        {formatDuration(state.time) || "0s"}
      </h1>
      <Board />
    </main>
  );
};
