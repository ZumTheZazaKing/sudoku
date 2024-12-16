import { useContext, useState } from "react";
import { Context } from "../../Context";

const Board = () => {
  const { state, dispatch } = useContext(Context);

  const [selectedCoords, setSelectedCoords] = useState(null);

  const handleCellClick = (x, y) => {
    console.log(`Coords: ${x}, ${y}`);
    setSelectedCoords({ x: x, y: y });
    // dispatch({ type: "SET_VALUE", payload: { x, y, num: 1 } });
  };

  document.addEventListener("click", (e) => {
    if (
      e.target.className.includes("cell") ||
      e.target.className.includes("option")
    )
      return;
    setSelectedCoords(null);
  });

  const handleOptionsClick = (num) => {
    if (!selectedCoords) return;
    let { x, y } = selectedCoords;
    dispatch({ type: "SET_VALUE", payload: { x, y, num } });
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
