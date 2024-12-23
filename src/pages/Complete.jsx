import { useContext, useState } from "react";
import { Context } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../utils/string";

export const Complete = () => {
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePlayAgain = () => {
    if (loading) return;
    setLoading(true);

    axios.get("https://sudoku-api.vercel.app/api/dosuku").then((res) => {
      let fixed = [];

      for (let i = 0; i < res.data.newboard.grids[0].value.length; i++) {
        for (let j = 0; j < res.data.newboard.grids[0].value[i].length; j++) {
          if (res.data.newboard.grids[0].value[i][j] != 0) {
            fixed.push({ x: j, y: i });
          }
        }
      }

      dispatch({
        type: "NEW_BOARD",
        payload: {
          values: res.data.newboard.grids[0].value,
          solution: res.data.newboard.grids[0].solution,
          fixed: [...fixed],
        },
      });
      setLoading(false);
      navigate("/game");
    });
  };

  const handleMainMenu = () => {
    navigate("/");
  };

  return (
    <main className="w-screen h-screen text-center flex flex-col items-center justify-center gap-5">
      <section>
        <h1 className="text-xl font-semibold">Puzzle Solved!</h1>
        <p>
          Time Taken: <br />
          <span className="text-lg">{formatDuration(state.time) || "0s"}</span>
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <button
          onClick={handlePlayAgain}
          className="px-4 py-2 bg-blue-400 rounded-lg text-white min-w-[100px] uppercase tracking-wider"
        >
          {loading ? "Loading..." : "Play Again"}
        </button>
        <button
          onClick={handleMainMenu}
          className="px-4 py-2 bg-slate-400 rounded-lg text-white min-w-[100px] uppercase tracking-wider"
        >
          Main Menu
        </button>
      </section>
    </main>
  );
};
