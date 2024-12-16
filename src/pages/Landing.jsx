import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../Context";

export const Landing = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const handlePlay = () => {
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

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen w-screen">
      <h1 className="text-3xl font-bold">
        Zum
        <span className="text-blue-500">Sudoku</span>
      </h1>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handlePlay()}
          className="px-4 py-2 bg-blue-400 rounded-lg text-white min-w-[100px] uppercase tracking-wider"
        >
          {loading ? "Loading... " : "Play"}
        </button>
      </div>
    </div>
  );
};
