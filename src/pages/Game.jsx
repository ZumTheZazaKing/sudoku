import { useContext } from "react";
import { Context } from "../App";

export const Game = () => {
  const { state } = useContext(Context);

  return (
    <main>
      <h1>Game {state.time}</h1>
    </main>
  );
};
