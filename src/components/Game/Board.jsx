import { useContext, useState } from "react";
import { Context } from "../../Context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const [selectedCoords, setSelectedCoords] = useState(null);

  const handleCellClick = (col, row) => {
    //console.log(`Coords: ${x}, ${y}`);
    setSelectedCoords({ x: col, y: row });
  };

  document.addEventListener("click", (e) => {
    if (
      e.target.className.includes("cell") ||
      e.target.className.includes("option")
    )
      return;
    setSelectedCoords(null);
  });

  function isValidMove(board, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }

    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }

    return true; // Move is valid
  }

  const handleOptionsClick = (num) => {
    if (!selectedCoords) return;
    if (
      [...state.fixed].some(
        (f) => f.x == selectedCoords.x && f.y == selectedCoords.y
      )
    )
      return toast.error("Can't change default numbers");

    let { x, y } = selectedCoords;
    dispatch({ type: "SET_VALUE", payload: { x, y, num } });

    if (state.gameState[y][x] == num) return;

    if (!isValidMove(state.gameState, y, x, num)) {
      let temp = state.invalid || [];
      temp.push({ x: x, y: y });
      dispatch({ type: "INVALID_MOVE", payload: [...temp] });
    }

    setTimeout(() => {
      if (isPuzzleSolved()) {
        navigate("/complete");
      }
    }, 500);
  };

  const isPuzzleSolved = () => {
    const arr1 = state.gameState;
    const arr2 = state.solution;

    if (arr1.length != arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      const subArr1 = arr1[i];
      const subArr2 = arr2[i];
      console.log(subArr1, subArr2);

      if (subArr1.length != subArr2.length) return false;

      for (let j = 0; j < subArr1.length; j++) {
        if (subArr1[j] != subArr2[j]) return false;
      }
    }

    return true;
  };

  return (
    <>
      <div className="flex flex-col">
        {state.gameState.map((row, i) => (
          <div className="flex" key={i}>
            {row.map((cell, j) => (
              <div
                onClick={() => handleCellClick(j, i)}
                key={j}
                className={`
                    cell 
                    ${j == 0 ? "border-l-4" : "border-l-2"}
                    ${j == 8 ? "border-r-4" : "border-r-0"}
                    ${i == 0 ? "border-t-4" : "border-t-2"}
                    ${i == 8 ? "border-b-4" : "border-b-0"}
                    ${i % 3 == 0 ? "border-t-4" : "border-t-2"}
                    ${j % 3 == 0 ? "border-l-4" : "border-l-2"}
                    border-slate-400 cursor-pointer
                    max-w-[35px] max-h-[35px]
                    min-w-[35px] min-h-[35px] bg-[rgba(255,255,255,0.8)]
                    flex items-center justify-center text-center text-2xl
                    ${
                      selectedCoords &&
                      j == selectedCoords.x &&
                      i == selectedCoords.y &&
                      "bg-blue-200"
                    }
                    ${
                      state.invalid &&
                      state.invalid.some(
                        (item) => item.x === j && item.y === i
                      ) &&
                      "text-red-500"
                    }
                    
                `}
              >
                {cell ? cell : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {Array(9)
          .fill()
          .map((_, i) => i + 1)
          .map((num, i) => (
            <button
              className="option cursor-pointer p-2 text-lg font-semibold bg-slate-200 rounded-md"
              key={i}
              onClick={() => handleOptionsClick(num)}
            >
              {num}
            </button>
          ))}
      </div>
    </>
  );
};
export default Board;
